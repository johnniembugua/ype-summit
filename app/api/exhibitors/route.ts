import { NextRequest, NextResponse } from 'next/server';
import { createExhibitor } from '@/actions/exhibitors';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.fullName || !body.email || !body.phone || !body.ideaTitle || !body.category || !body.fieldOfFocus) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Required fields are missing. Please fill in all required fields.' 
        },
        { status: 400 }
      );
    }

    // Create the exhibitor using the existing action
    const result = await createExhibitor(body);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Failed to submit exhibitor application.' 
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
      error: 'Method not allowed. Use POST to submit exhibitor applications.' 
    },
    { status: 405 }
  );
}
