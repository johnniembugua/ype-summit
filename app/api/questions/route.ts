import { NextRequest, NextResponse } from 'next/server';
import { createQuestion } from '@/actions/questions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.question) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Question is a required field.' 
        },
        { status: 400 }
      );
    }

    // Handle anonymous submissions
    const displayName = body.isAnonymous ? 'Anonymous' : body.name?.trim();
    
    if (!displayName && !body.isAnonymous) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Name is required unless submitting anonymously.' 
        },
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedData = {
      name: displayName || 'Anonymous',
      question: body.question.trim(),
      category: body.category?.trim() || 'general'
    };

    // Create the question using the existing action
    const result = await createQuestion(sanitizedData);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Failed to submit question.' 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to submit questions.' 
    },
    { status: 405 }
  );
}
