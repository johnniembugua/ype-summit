'use server';

import { db } from '@/db';
import { questions, registrations, partnerships, exhibitors, eventAnalytics } from '@/db/schema';
import { eq, sql, desc, count } from 'drizzle-orm';
import { Question, Partnership, Exhibitor } from '@/types';

// Add upvote field to questions table schema (we'll need to update the schema later)
// For now, we'll store upvotes as a JSON field or add a separate upvotes table

export async function getAllRegistrationsForAdmin() {
  try {
    const allRegistrations = await db
      .select()
      .from(registrations)
      .orderBy(desc(registrations.createdAt));

    return {
      success: true,
      data: allRegistrations,
    };
  } catch (error) {
    console.error('Get all registrations for admin error:', error);
    return {
      success: false,
      error: 'Failed to retrieve registrations.',
    };
  }
}

export async function getAllQuestionsForAdmin() {
  try {
    const allQuestions = await db
      .select()
      .from(questions)
      .orderBy(desc(questions.createdAt));

    return {
      success: true,
      data: allQuestions as Question[],
    };
  } catch (error) {
    console.error('Get all questions for admin error:', error);
    return {
      success: false,
      error: 'Failed to retrieve questions.',
    };
  }
}

export async function getAllPartnershipsForAdmin() {
  try {
    const allPartnerships = await db
      .select()
      .from(partnerships)
      .orderBy(desc(partnerships.createdAt));

    return {
      success: true,
      data: allPartnerships as Partnership[],
    };
  } catch (error) {
    console.error('Get all partnerships for admin error:', error);
    return {
      success: false,
      error: 'Failed to retrieve partnerships.',
    };
  }
}

export async function getAllExhibitorsForAdmin() {
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
    console.error('Get all exhibitors for admin error:', error);
    return {
      success: false,
      error: 'Failed to retrieve exhibitors.',
    };
  }
}

export async function getAnalyticsData() {
  try {
    const analytics = await db
      .select()
      .from(eventAnalytics)
      .orderBy(desc(eventAnalytics.timestamp));

    return {
      success: true,
      data: analytics,
    };
  } catch (error) {
    console.error('Get analytics data error:', error);
    return {
      success: false,
      error: 'Failed to retrieve analytics data.',
    };
  }
}

export async function getDashboardStats() {
  try {
    // Get registration stats
    const totalRegistrations = await db
      .select({ count: count() })
      .from(registrations);

    const paidRegistrations = await db
      .select({ count: count() })
      .from(registrations)
      .where(eq(registrations.paymentStatus, 'paid'));

    const pendingRegistrations = await db
      .select({ count: count() })
      .from(registrations)
      .where(eq(registrations.paymentStatus, 'pending'));

    // Get question stats
    const totalQuestions = await db
      .select({ count: count() })
      .from(questions);

    const pendingQuestions = await db
      .select({ count: count() })
      .from(questions)
      .where(eq(questions.status, 'pending'));

    const answeredQuestions = await db
      .select({ count: count() })
      .from(questions)
      .where(eq(questions.isAnswered, true));

    // Get partnership stats
    const totalPartnerships = await db
      .select({ count: count() })
      .from(partnerships);

    const confirmedPartnerships = await db
      .select({ count: count() })
      .from(partnerships)
      .where(eq(partnerships.status, 'confirmed'));

    const pendingPartnerships = await db
      .select({ count: count() })
      .from(partnerships)
      .where(eq(partnerships.status, 'pending'));

    // Get analytics stats
    const totalEvents = await db
      .select({ count: count() })
      .from(eventAnalytics);

    const registrationEvents = await db
      .select({ count: count() })
      .from(eventAnalytics)
      .where(eq(eventAnalytics.eventType, 'registration'));

    const questionEvents = await db
      .select({ count: count() })
      .from(eventAnalytics)
      .where(eq(eventAnalytics.eventType, 'question_submission'));

    const partnershipEvents = await db
      .select({ count: count() })
      .from(eventAnalytics)
      .where(eq(eventAnalytics.eventType, 'partnership_inquiry'));

    const exhibitorEvents = await db
      .select({ count: count() })
      .from(eventAnalytics)
      .where(eq(eventAnalytics.eventType, 'exhibitor_submission'));

    // Get exhibitor stats
    const totalExhibitors = await db
      .select({ count: count() })
      .from(exhibitors);

    const pendingExhibitors = await db
      .select({ count: count() })
      .from(exhibitors)
      .where(eq(exhibitors.status, 'pending'));

    const approvedExhibitors = await db
      .select({ count: count() })
      .from(exhibitors)
      .where(eq(exhibitors.status, 'approved'));

    const reviewedExhibitors = await db
      .select({ count: count() })
      .from(exhibitors)
      .where(eq(exhibitors.status, 'reviewed'));

    const rejectedExhibitors = await db
      .select({ count: count() })
      .from(exhibitors)
      .where(eq(exhibitors.status, 'rejected'));

    const stats = {
      registrations: {
        total: totalRegistrations[0]?.count || 0,
        paid: paidRegistrations[0]?.count || 0,
        pending: pendingRegistrations[0]?.count || 0,
      },
      questions: {
        total: totalQuestions[0]?.count || 0,
        pending: pendingQuestions[0]?.count || 0,
        answered: answeredQuestions[0]?.count || 0,
      },
      partnerships: {
        total: totalPartnerships[0]?.count || 0,
        confirmed: confirmedPartnerships[0]?.count || 0,
        pending: pendingPartnerships[0]?.count || 0,
      },
      exhibitors: {
        total: totalExhibitors[0]?.count || 0,
        pending: pendingExhibitors[0]?.count || 0,
        reviewed: reviewedExhibitors[0]?.count || 0,
        approved: approvedExhibitors[0]?.count || 0,
        rejected: rejectedExhibitors[0]?.count || 0,
      },
      analytics: {
        total: totalEvents[0]?.count || 0,
        registrations: registrationEvents[0]?.count || 0,
        questions: questionEvents[0]?.count || 0,
        partnerships: partnershipEvents[0]?.count || 0,
        exhibitors: exhibitorEvents[0]?.count || 0,
      },
    };

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return {
      success: false,
      error: 'Failed to retrieve dashboard statistics.',
    };
  }
}

export async function updateQuestionStatus(
  questionId: string,
  status: 'pending' | 'reviewed' | 'answered' | 'archived',
  answeredBy?: string
) {
  try {
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };

    if (status === 'answered') {
      updateData.isAnswered = true;
      updateData.answeredAt = new Date();
      if (answeredBy) updateData.answeredBy = answeredBy;
    }

    const [updatedQuestion] = await db
      .update(questions)
      .set(updateData)
      .where(eq(questions.id, questionId))
      .returning();

    return {
      success: true,
      data: updatedQuestion,
      message: 'Question status updated successfully!',
    };
  } catch (error) {
    console.error('Update question status error:', error);
    return {
      success: false,
      error: 'Failed to update question status.',
    };
  }
}

export async function upvoteQuestion(questionId: string) {
  try {
    // Increment the upvotes count for the question
    const [updatedQuestion] = await db
      .update(questions)
      .set({
        upvotes: sql`${questions.upvotes} + 1`,
        status: 'reviewed', // Also mark as reviewed when upvoted
        updatedAt: new Date(),
      })
      .where(eq(questions.id, questionId))
      .returning();

    return {
      success: true,
      data: updatedQuestion,
      message: 'Question upvoted successfully!',
    };
  } catch (error) {
    console.error('Upvote question error:', error);
    return {
      success: false,
      error: 'Failed to upvote question.',
    };
  }
}

export async function updateRegistrationStatus(
  registrationId: string,
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
) {
  try {
    const [updatedRegistration] = await db
      .update(registrations)
      .set({
        paymentStatus,
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, registrationId))
      .returning();

    return {
      success: true,
      data: updatedRegistration,
      message: 'Registration status updated successfully!',
    };
  } catch (error) {
    console.error('Update registration status error:', error);
    return {
      success: false,
      error: 'Failed to update registration status.',
    };
  }
}

export async function deleteRegistration(registrationId: string) {
  try {
    await db
      .delete(registrations)
      .where(eq(registrations.id, registrationId));

    return {
      success: true,
      message: 'Registration deleted successfully!',
    };
  } catch (error) {
    console.error('Delete registration error:', error);
    return {
      success: false,
      error: 'Failed to delete registration.',
    };
  }
}

export async function deleteQuestion(questionId: string) {
  try {
    await db
      .delete(questions)
      .where(eq(questions.id, questionId));

    return {
      success: true,
      message: 'Question deleted successfully!',
    };
  } catch (error) {
    console.error('Delete question error:', error);
    return {
      success: false,
      error: 'Failed to delete question.',
    };
  }
}

export async function deletePartnership(partnershipId: string) {
  try {
    await db
      .delete(partnerships)
      .where(eq(partnerships.id, partnershipId));

    return {
      success: true,
      message: 'Partnership deleted successfully!',
    };
  } catch (error) {
    console.error('Delete partnership error:', error);
    return {
      success: false,
      error: 'Failed to delete partnership.',
    };
  }
}

export async function updatePartnershipStatus(
  partnershipId: string,
  status: 'pending' | 'contacted' | 'confirmed' | 'declined',
  partnershipTier?: 'platinum' | 'gold' | 'silver' | 'bronze',
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
      message: 'Partnership status updated successfully!',
    };
  } catch (error) {
    console.error('Update partnership status error:', error);
    return {
      success: false,
      error: 'Failed to update partnership status.',
    };
  }
}
