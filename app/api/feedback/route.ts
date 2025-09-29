import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { feedback, eventAnalytics } from '@/db/schema';
import { FeedbackFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackFormData = await request.json();
    
    // Validate required fields
    if (!body.fullName || !body.email || !body.dayAttended || !body.mostValuable || !body.improvements || !body.futureTopics) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate ratings (convert string to number)
    const ratings = {
      overallRating: parseInt(body.overallRating) || 0,
      contentQuality: parseInt(body.contentQuality) || 0,
      speakerQuality: parseInt(body.speakerQuality) || 0,
      organizationRating: parseInt(body.organizationRating) || 0,
      venueRating: parseInt(body.venueRating) || 0,
      networkingRating: parseInt(body.networkingRating) || 0,
    };

    // Validate that all ratings are between 1-5
    const ratingValues = Object.values(ratings);
    if (ratingValues.some(rating => rating < 1 || rating > 5)) {
      return NextResponse.json(
        { success: false, error: 'All ratings must be between 1 and 5 stars' },
        { status: 400 }
      );
    }

    // Insert feedback into database
    const [newFeedback] = await db
      .insert(feedback)
      .values({
        fullName: body.fullName,
        email: body.email,
        phone: body.phone || null,
        dayAttended: body.dayAttended as 'yes' | 'partial',
        overallRating: ratings.overallRating,
        contentQuality: ratings.contentQuality,
        speakerQuality: ratings.speakerQuality,
        organizationRating: ratings.organizationRating,
        venueRating: ratings.venueRating,
        networkingRating: ratings.networkingRating,
        mostValuable: body.mostValuable,
        improvements: body.improvements,
        futureTopics: body.futureTopics,
        recommendLikelihood: body.recommendLikelihood || null,
        additionalComments: body.additionalComments || null,
        workshopFeedback: body.workshopFeedback || null,
        favoriteWorkshop: body.favoriteWorkshop || null,
        favoriteWorkshopOther: body.favoriteWorkshopOther || null,
        speakerSuggestions: body.speakerSuggestions || null,
        speakerSpecialization: body.speakerSpecialization || null,
        shareContact: body.shareContact || null,
        speakerContact: body.speakerContact || null,
      })
      .returning();

    // Track analytics
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || null;

    await db.insert(eventAnalytics).values({
      eventType: 'feedback_submission',
      ipAddress: clientIP,
      userAgent,
      referrer,
    });

    return NextResponse.json({
      success: true,
      data: newFeedback,
      message: 'Feedback submitted successfully!',
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback. Please try again.' },
      { status: 500 }
    );
  }
}
