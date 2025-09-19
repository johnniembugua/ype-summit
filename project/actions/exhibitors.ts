'use server';

import { db } from '@/db';
import { exhibitors } from '@/db/schema';
import { eq, desc, count } from 'drizzle-orm';
import { ExhibitorFormData, ApiResponse, Exhibitor } from '@/types';

// Create a new exhibitor submission
export async function createExhibitor(data: ExhibitorFormData): Promise<ApiResponse<Exhibitor>> {
  try {
    // Convert sdgAlignment array to JSON string
    const sdgAlignmentJson = JSON.stringify(data.sdgAlignment);

    const [newExhibitor] = await db
      .insert(exhibitors)
      .values({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName || null,
        yearsOfOperation: data.yearsOfOperation || null,
        website: data.website || null,
        ideaTitle: data.ideaTitle,
        category: data.category,
        fieldOfFocus: data.fieldOfFocus,
        areasOfInterest: data.areasOfInterest || null,
        uniqueness: data.uniqueness,
        summary: data.summary,
        businessModel: data.businessModel,
        targetMarket: data.targetMarket,
        wantToTeamUp: data.wantToTeamUp,
        lookingFor: data.lookingFor || null,
        sdgAlignment: sdgAlignmentJson,
        otherSdg: data.otherSdg || null,
      })
      .returning();

    return {
      success: true,
      data: newExhibitor as Exhibitor,
      message: 'Your idea has been submitted successfully! We will review it and get back to you soon.',
    };
  } catch (error) {
    console.error('Error creating exhibitor:', error);
    return {
      success: false,
      error: 'Failed to submit your idea. Please try again.',
    };
  }
}

// Get all exhibitors for admin dashboard
export async function getAllExhibitorsForAdmin(): Promise<ApiResponse<Exhibitor[]>> {
  try {
    const allExhibitors = await db
      .select()
      .from(exhibitors)
      .orderBy(desc(exhibitors.createdAt));

    return {
      success: true,
      data: allExhibitors as Exhibitor[],
    };
  } catch (error) {
    console.error('Error fetching exhibitors:', error);
    return {
      success: false,
      error: 'Failed to fetch exhibitors',
    };
  }
}

// Get exhibitor by ID
export async function getExhibitorById(id: string): Promise<ApiResponse<Exhibitor>> {
  try {
    const [exhibitor] = await db
      .select()
      .from(exhibitors)
      .where(eq(exhibitors.id, id))
      .limit(1);

    if (!exhibitor) {
      return {
        success: false,
        error: 'Exhibitor not found',
      };
    }

    return {
      success: true,
      data: exhibitor as Exhibitor,
    };
  } catch (error) {
    console.error('Error fetching exhibitor:', error);
    return {
      success: false,
      error: 'Failed to fetch exhibitor',
    };
  }
}

// Update exhibitor status
export async function updateExhibitorStatus(
  id: string,
  status: 'pending' | 'reviewed' | 'approved' | 'rejected',
  reviewedBy?: string
): Promise<ApiResponse<Exhibitor>> {
  try {
    const [updatedExhibitor] = await db
      .update(exhibitors)
      .set({
        status,
        reviewedAt: new Date(),
        reviewedBy: reviewedBy || null,
        updatedAt: new Date(),
      })
      .where(eq(exhibitors.id, id))
      .returning();

    if (!updatedExhibitor) {
      return {
        success: false,
        error: 'Exhibitor not found',
      };
    }

    return {
      success: true,
      data: updatedExhibitor as Exhibitor,
      message: 'Exhibitor status updated successfully',
    };
  } catch (error) {
    console.error('Error updating exhibitor status:', error);
    return {
      success: false,
      error: 'Failed to update exhibitor status',
    };
  }
}

// Get exhibitor statistics
export async function getExhibitorStats(): Promise<ApiResponse<{
  total: number;
  pending: number;
  reviewed: number;
  approved: number;
  rejected: number;
}>> {
  try {
    const [totalResult] = await db
      .select({ count: count() })
      .from(exhibitors);

    const [pendingResult] = await db
      .select({ count: count() })
      .from(exhibitors)
      .where(eq(exhibitors.status, 'pending'));

    const [reviewedResult] = await db
      .select({ count: count() })
      .from(exhibitors)
      .where(eq(exhibitors.status, 'reviewed'));

    const [approvedResult] = await db
      .select({ count: count() })
      .from(exhibitors)
      .where(eq(exhibitors.status, 'approved'));

    const [rejectedResult] = await db
      .select({ count: count() })
      .from(exhibitors)
      .where(eq(exhibitors.status, 'rejected'));

    return {
      success: true,
      data: {
        total: totalResult.count,
        pending: pendingResult.count,
        reviewed: reviewedResult.count,
        approved: approvedResult.count,
        rejected: rejectedResult.count,
      },
    };
  } catch (error) {
    console.error('Error fetching exhibitor stats:', error);
    return {
      success: false,
      error: 'Failed to fetch exhibitor statistics',
    };
  }
}

// Delete exhibitor (admin only)
export async function deleteExhibitor(id: string): Promise<ApiResponse> {
  try {
    await db
      .delete(exhibitors)
      .where(eq(exhibitors.id, id));

    return {
      success: true,
      message: 'Exhibitor deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting exhibitor:', error);
    return {
      success: false,
      error: 'Failed to delete exhibitor',
    };
  }
}
