import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Allowed document types for security
const ALLOWED_MIME_TYPES = [
  // Documents
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // Presentations
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  // Spreadsheets
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  // Text files
  'text/plain',
  'text/csv',
  // Images (for materials)
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp'
];

// File extensions mapping for additional validation
const ALLOWED_EXTENSIONS = [
  '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', 
  '.txt', '.csv', '.jpg', '.jpeg', '.png', '.gif', '.webp'
];

// Maximum file size: 25MB
const MAX_FILE_SIZE = 25 * 1024 * 1024;

// Document categories
type DocumentCategory = 'panelist-materials' | 'summit-docs' | 'resources' | 'presentations';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('file') as File;
    const category = formData.get('category') as DocumentCategory || 'resources';
    const description = formData.get('description') as string || '';
    const uploadedBy = formData.get('uploadedBy') as string || 'Anonymous';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, CSV, and image files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file extension
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
      return NextResponse.json(
        { error: 'Invalid file extension. Only safe document types are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 25MB.' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories: DocumentCategory[] = ['panelist-materials', 'summit-docs', 'resources', 'presentations'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be one of: panelist-materials, summit-docs, resources, presentations' },
        { status: 400 }
      );
    }

    // Sanitize filename to prevent directory traversal and other attacks
    const sanitizedName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
      .replace(/\.+/g, '.') // Replace multiple dots with single dot
      .replace(/^\.+/, '') // Remove leading dots
      .toLowerCase();

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileName = `${timestamp}-${randomId}-${sanitizedName}`;

    // Create category-based directory structure
    const publicDir = join(process.cwd(), 'public');
    const documentsDir = join(publicDir, 'documents', category);
    
    // Create directory if it doesn't exist
    if (!existsSync(documentsDir)) {
      await mkdir(documentsDir, { recursive: true });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file to category-specific directory
    const filePath = join(documentsDir, fileName);
    await writeFile(filePath, buffer);

    // Return success response with file info
    return NextResponse.json({
      success: true,
      message: 'Document uploaded successfully',
      document: {
        id: `doc-${randomId}`,
        name: sanitizedName,
        originalName: file.name,
        size: file.size,
        type: file.type,
        category: category,
        description: description,
        uploadedBy: uploadedBy,
        url: `/documents/${category}/${fileName}`,
        uploadedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}
