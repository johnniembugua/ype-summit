import { NextRequest, NextResponse } from 'next/server';
import { createRegistration } from '@/actions/registrations';
import { createQuestion } from '@/actions/questions';
import { createPartnership } from '@/actions/partnerships';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (data.type === 'registration') {
      // Handle registration
      const result = await createRegistration({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        profession: data.profession,
        church: data.church,
        workshopPreference: data.workshopPreference,
      });

      if (!result.success) {
        return NextResponse.json(
          { success: false, message: result.error },
          { status: 400 }
        );
      }

      // TODO: Send confirmation email with payment details
      await sendConfirmationEmail(data.email, 'registration', result.data);
      
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        data: result.data 
      });
      
    } else if (data.type === 'partnership') {
      // Handle partnership inquiry
      const result = await createPartnership({
        organizationName: data.organizationName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        supportType: data.supportType,
        message: data.message,
      });

      if (!result.success) {
        return NextResponse.json(
          { success: false, message: result.error },
          { status: 400 }
        );
      }

      // TODO: Send partnership inquiry confirmation email
      await sendConfirmationEmail(data.email, 'partnership', result.data);
      
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        data: result.data 
      });
      
    } else if (data.type === 'question') {
      // Handle question submission
      const result = await createQuestion({
        name: data.name,
        question: data.question,
        category: 'general', // Can be enhanced to detect category
      });

      if (!result.success) {
        return NextResponse.json(
          { success: false, message: result.error },
          { status: 400 }
        );
      }
      
      return NextResponse.json({ 
        success: true, 
        message: result.message,
        data: result.data 
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid form type' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Error processing form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process form' },
      { status: 500 }
    );
  }
}

// TODO: Implement actual email sending service
async function sendConfirmationEmail(email: string, type: string, data: any) {
  // In a real app, integrate with services like:
  // - SendGrid
  // - AWS SES
  // - Mailchimp
  // - ConvertKit
  
  console.log(`Sending ${type} confirmation email to ${email}`, data);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return true;
}