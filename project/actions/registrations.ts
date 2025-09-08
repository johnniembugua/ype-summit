'use server';

import { db } from '@/db';
import { registrations, eventAnalytics } from '@/db/schema';
import { eq, count } from 'drizzle-orm';
import { headers } from 'next/headers';

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  church?: string;
  workshopPreference: string;
}

export async function createRegistration(data: RegistrationData) {
  try {
    // Get request headers for analytics
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const forwardedFor = headersList.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : headersList.get('x-real-ip') || '';

    // Check if email already exists
    const existingRegistration = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, data.email))
      .limit(1);

    if (existingRegistration.length > 0) {
      return {
        success: false,
        error: 'This email is already registered for the event.',
      };
    }

    // Create new registration
    const [newRegistration] = await db
      .insert(registrations)
      .values({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        profession: data.profession,
        church: data.church || null,
        workshopPreference: data.workshopPreference,
        paymentStatus: 'pending',
      })
      .returning();

    // Track analytics
    await db.insert(eventAnalytics).values({
      eventType: 'registration',
      ipAddress,
      userAgent,
    });

    return {
      success: true,
      data: newRegistration,
      message: 'Registration submitted successfully! You will receive a confirmation email with payment details.',
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Failed to submit registration. Please try again.',
    };
  }
}

export async function updatePaymentStatus(
  registrationId: string,
  paymentStatus: string,
  paymentMethod?: string,
  paymentReference?: string
) {
  try {
    const [updatedRegistration] = await db
      .update(registrations)
      .set({
        paymentStatus,
        paymentMethod,
        paymentReference,
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, registrationId))
      .returning();

    return {
      success: true,
      data: updatedRegistration,
    };
  } catch (error) {
    console.error('Payment update error:', error);
    return {
      success: false,
      error: 'Failed to update payment status.',
    };
  }
}

export async function getRegistrationByEmail(email: string) {
  try {
    const registration = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, email))
      .limit(1);

    return {
      success: true,
      data: registration[0] || null,
    };
  } catch (error) {
    console.error('Get registration error:', error);
    return {
      success: false,
      error: 'Failed to retrieve registration.',
    };
  }
}

export async function getAllRegistrations() {
  try {
    const allRegistrations = await db
      .select()
      .from(registrations)
      .orderBy(registrations.createdAt);

    return {
      success: true,
      data: allRegistrations,
    };
  } catch (error) {
    console.error('Get all registrations error:', error);
    return {
      success: false,
      error: 'Failed to retrieve registrations.',
    };
  }
}

export async function getRegistrationStats() {
  try {
    const totalResult = await db
      .select({ count: count() })
      .from(registrations);

    const paidResult = await db
      .select({ count: count() })
      .from(registrations)
      .where(eq(registrations.paymentStatus, 'paid'));

    const pendingResult = await db
      .select({ count: count() })
      .from(registrations)
      .where(eq(registrations.paymentStatus, 'pending'));

    const stats = {
      total: totalResult[0]?.count || 0,
      paid: paidResult[0]?.count || 0,
      pending: pendingResult[0]?.count || 0,
    };

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error('Get registration stats error:', error);
    return {
      success: false,
      error: 'Failed to retrieve registration statistics.',
    };
  }
}
