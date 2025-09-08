'use server';

import { db } from '@/db';
import { partnerships, eventAnalytics } from '@/db/schema';
import { eq, desc, count } from 'drizzle-orm';
import { headers } from 'next/headers';

export interface PartnershipData {
  organizationName: string;
  contactPerson: string;
  email: string;
  phone: string;
  supportType: string;
  message?: string;
}

export async function createPartnership(data: PartnershipData) {
  try {
    // Get request headers for analytics
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const forwardedFor = headersList.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : headersList.get('x-real-ip') || '';

    // Check if organization already has a partnership inquiry
    const existingPartnership = await db
      .select()
      .from(partnerships)
      .where(eq(partnerships.email, data.email))
      .limit(1);

    if (existingPartnership.length > 0) {
      return {
        success: false,
        error: 'A partnership inquiry from this email already exists. We will contact you soon.',
      };
    }

    // Create new partnership inquiry
    const [newPartnership] = await db
      .insert(partnerships)
      .values({
        organizationName: data.organizationName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        supportType: data.supportType,
        message: data.message || null,
        status: 'pending',
      })
      .returning();

    // Track analytics
    await db.insert(eventAnalytics).values({
      eventType: 'partnership_inquiry',
      ipAddress,
      userAgent,
    });

    return {
      success: true,
      data: newPartnership,
      message: 'Partnership inquiry submitted successfully! We will contact you soon.',
    };
  } catch (error) {
    console.error('Partnership submission error:', error);
    return {
      success: false,
      error: 'Failed to submit partnership inquiry. Please try again.',
    };
  }
}

export async function getAllPartnerships() {
  try {
    const allPartnerships = await db
      .select()
      .from(partnerships)
      .orderBy(desc(partnerships.createdAt));

    return {
      success: true,
      data: allPartnerships,
    };
  } catch (error) {
    console.error('Get all partnerships error:', error);
    return {
      success: false,
      error: 'Failed to retrieve partnerships.',
    };
  }
}

export async function getPartnershipsByStatus(status: string) {
  try {
    const filteredPartnerships = await db
      .select()
      .from(partnerships)
      .where(eq(partnerships.status, status))
      .orderBy(desc(partnerships.createdAt));

    return {
      success: true,
      data: filteredPartnerships,
    };
  } catch (error) {
    console.error('Get partnerships by status error:', error);
    return {
      success: false,
      error: 'Failed to retrieve partnerships.',
    };
  }
}

export async function updatePartnershipStatus(
  partnershipId: string,
  status: string,
  partnershipTier?: string,
  partnershipValue?: number,
  followUpDate?: Date
) {
  try {
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (partnershipTier) updateData.partnershipTier = partnershipTier;
    if (partnershipValue) updateData.partnershipValue = partnershipValue;
    if (followUpDate) updateData.followUpDate = followUpDate;

    const [updatedPartnership] = await db
      .update(partnerships)
      .set(updateData)
      .where(eq(partnerships.id, partnershipId))
      .returning();

    return {
      success: true,
      data: updatedPartnership,
    };
  } catch (error) {
    console.error('Update partnership status error:', error);
    return {
      success: false,
      error: 'Failed to update partnership status.',
    };
  }
}

export async function getPartnershipStats() {
  try {
    const totalResult = await db
      .select({ count: count() })
      .from(partnerships);

    const pendingResult = await db
      .select({ count: count() })
      .from(partnerships)
      .where(eq(partnerships.status, 'pending'));

    const contactedResult = await db
      .select({ count: count() })
      .from(partnerships)
      .where(eq(partnerships.status, 'contacted'));

    const confirmedResult = await db
      .select({ count: count() })
      .from(partnerships)
      .where(eq(partnerships.status, 'confirmed'));

    const declinedResult = await db
      .select({ count: count() })
      .from(partnerships)
      .where(eq(partnerships.status, 'declined'));

    const stats = {
      total: totalResult[0]?.count || 0,
      pending: pendingResult[0]?.count || 0,
      contacted: contactedResult[0]?.count || 0,
      confirmed: confirmedResult[0]?.count || 0,
      declined: declinedResult[0]?.count || 0,
    };

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error('Get partnership stats error:', error);
    return {
      success: false,
      error: 'Failed to retrieve partnership statistics.',
    };
  }
}

export async function getPartnershipsByType(supportType: string) {
  try {
    const filteredPartnerships = await db
      .select()
      .from(partnerships)
      .where(eq(partnerships.supportType, supportType))
      .orderBy(desc(partnerships.createdAt));

    return {
      success: true,
      data: filteredPartnerships,
    };
  } catch (error) {
    console.error('Get partnerships by type error:', error);
    return {
      success: false,
      error: 'Failed to retrieve partnerships.',
    };
  }
}
