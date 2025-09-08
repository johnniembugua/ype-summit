'use server';

import { db } from '@/db';
import { eventAnalytics } from '@/db/schema';
import { eq, desc, sql } from 'drizzle-orm';

export async function getEventAnalytics() {
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
    console.error('Get analytics error:', error);
    return {
      success: false,
      error: 'Failed to retrieve analytics.',
    };
  }
}

export async function getAnalyticsByEventType(eventType: string) {
  try {
    const analytics = await db
      .select()
      .from(eventAnalytics)
      .where(eq(eventAnalytics.eventType, eventType))
      .orderBy(desc(eventAnalytics.timestamp));

    return {
      success: true,
      data: analytics,
    };
  } catch (error) {
    console.error('Get analytics by event type error:', error);
    return {
      success: false,
      error: 'Failed to retrieve analytics.',
    };
  }
}

export async function getAnalyticsStats() {
  try {
    const stats = await db
      .select({
        eventType: eventAnalytics.eventType,
        count: sql<number>`count(*)`.as('count'),
      })
      .from(eventAnalytics)
      .groupBy(eventAnalytics.eventType);

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error('Get analytics stats error:', error);
    return {
      success: false,
      error: 'Failed to retrieve analytics statistics.',
    };
  }
}

export async function getDailyAnalytics(days: number = 30) {
  try {
    const analytics = await db
      .select({
        date: sql<string>`DATE(${eventAnalytics.timestamp})`.as('date'),
        eventType: eventAnalytics.eventType,
        count: sql<number>`count(*)`.as('count'),
      })
      .from(eventAnalytics)
      .where(
        sql`${eventAnalytics.timestamp} >= NOW() - INTERVAL '${days} days'`
      )
      .groupBy(
        sql`DATE(${eventAnalytics.timestamp})`,
        eventAnalytics.eventType
      )
      .orderBy(sql`DATE(${eventAnalytics.timestamp}) DESC`);

    return {
      success: true,
      data: analytics,
    };
  } catch (error) {
    console.error('Get daily analytics error:', error);
    return {
      success: false,
      error: 'Failed to retrieve daily analytics.',
    };
  }
}
