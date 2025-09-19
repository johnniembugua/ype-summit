import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    const category = formData.get('category') as string || 'other';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['summit', 'networking', 'other'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: summit, networking, other' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${timestamp}-${randomId}.${fileExtension}`;

    // Create category-based directory structure
    const publicDir = join(process.cwd(), 'public');
    const galleryDir = join(publicDir, 'images', 'gallery', category);
    
    // Create directory if it doesn't exist
    if (!existsSync(galleryDir)) {
      await mkdir(galleryDir, { recursive: true });
    }

    // Save file to category-specific directory
    const filePath = join(galleryDir, fileName);
    await writeFile(filePath, buffer);

    // Return success response with file info
    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully',
      file: {
        name: fileName,
        size: file.size,
        type: file.type,
        category: category,
        url: `/images/gallery/${category}/${fileName}`,
        uploadedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
