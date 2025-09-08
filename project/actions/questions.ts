'use server';

import { db } from '@/db';
import { questions, eventAnalytics } from '@/db/schema';
import { eq, desc, count } from 'drizzle-orm';
import { headers } from 'next/headers';

export interface QuestionData {
  name: string;
  question: string;
  category?: string;
}

export async function createQuestion(data: QuestionData) {
  try {
    // Get request headers for analytics
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const forwardedFor = headersList.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : headersList.get('x-real-ip') || '';

    // Create new question
    const [newQuestion] = await db
      .insert(questions)
      .values({
        name: data.name,
        question: data.question,
        category: data.category || 'general',
        status: 'pending',
      })
      .returning();

    // Track analytics
    await db.insert(eventAnalytics).values({
      eventType: 'question_submission',
      ipAddress,
      userAgent,
    });

    return {
      success: true,
      data: newQuestion,
      message: 'Question submitted successfully! We\'ll address it during the summit.',
    };
  } catch (error) {
    console.error('Question submission error:', error);
    return {
      success: false,
      error: 'Failed to submit question. Please try again.',
    };
  }
}

export async function getAllQuestions() {
  try {
    const allQuestions = await db
      .select()
      .from(questions)
      .orderBy(desc(questions.createdAt));

    return {
      success: true,
      data: allQuestions,
    };
  } catch (error) {
    console.error('Get all questions error:', error);
    return {
      success: false,
      error: 'Failed to retrieve questions.',
    };
  }
}

export async function getQuestionsByStatus(status: string) {
  try {
    const filteredQuestions = await db
      .select()
      .from(questions)
      .where(eq(questions.status, status))
      .orderBy(desc(questions.createdAt));

    return {
      success: true,
      data: filteredQuestions,
    };
  } catch (error) {
    console.error('Get questions by status error:', error);
    return {
      success: false,
      error: 'Failed to retrieve questions.',
    };
  }
}

export async function updateQuestionStatus(
  questionId: string,
  status: string,
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
      updateData.answeredBy = answeredBy;
    }

    const [updatedQuestion] = await db
      .update(questions)
      .set(updateData)
      .where(eq(questions.id, questionId))
      .returning();

    return {
      success: true,
      data: updatedQuestion,
    };
  } catch (error) {
    console.error('Update question status error:', error);
    return {
      success: false,
      error: 'Failed to update question status.',
    };
  }
}

export async function getQuestionStats() {
  try {
    const totalResult = await db
      .select({ count: count() })
      .from(questions);

    const pendingResult = await db
      .select({ count: count() })
      .from(questions)
      .where(eq(questions.status, 'pending'));

    const reviewedResult = await db
      .select({ count: count() })
      .from(questions)
      .where(eq(questions.status, 'reviewed'));

    const answeredResult = await db
      .select({ count: count() })
      .from(questions)
      .where(eq(questions.isAnswered, true));

    const stats = {
      total: totalResult[0]?.count || 0,
      pending: pendingResult[0]?.count || 0,
      reviewed: reviewedResult[0]?.count || 0,
      answered: answeredResult[0]?.count || 0,
    };

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error('Get question stats error:', error);
    return {
      success: false,
      error: 'Failed to retrieve question statistics.',
    };
  }
}
