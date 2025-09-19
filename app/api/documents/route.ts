import { NextRequest, NextResponse } from 'next/server';
import { readdir, readFile, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Document categories
type DocumentCategory = 'panelist-materials' | 'summit-docs' | 'resources' | 'presentations';

interface DocumentFile {
  id: string;
  name: string;
  originalName: string;
  url: string;
  size: number;
  type: string;
  category: DocumentCategory;
  uploadedAt: string;
  description?: string;
  uploadedBy?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as DocumentCategory;
    
    const publicDir = join(process.cwd(), 'public');
    const documentsDir = join(publicDir, 'documents');
    const categories: DocumentCategory[] = ['panelist-materials', 'summit-docs', 'resources', 'presentations'];
    
    const uploadedDocuments: DocumentFile[] = [];
    
    // Read documents from each category directory
    for (const cat of categories) {
      // Skip if category filter is specified and doesn't match
      if (category && cat !== category) {
        continue;
      }
      
      const categoryDir = join(documentsDir, cat);
      
      if (existsSync(categoryDir)) {
        try {
          const files = await readdir(categoryDir);
          
          for (const file of files) {
            // Only process document files
            if (file.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt|csv|jpg|jpeg|png|gif|webp)$/i)) {
              const filePath = join(categoryDir, file);
              
              // Extract timestamp and ID from filename
              const match = file.match(/^(\d+)-([a-z0-9]+)-(.+)$/i);
              const timestamp = match ? parseInt(match[1]) : Date.now();
              const randomId = match ? match[2] : Math.random().toString(36).substring(2, 15);
              const originalName = match ? match[3].replace(/_/g, ' ') : file;
              
              // Determine file type
              const extension = file.split('.').pop()?.toLowerCase() || '';
              let mimeType = 'application/octet-stream';
              
              switch (extension) {
                case 'pdf': mimeType = 'application/pdf'; break;
                case 'doc': mimeType = 'application/msword'; break;
                case 'docx': mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; break;
                case 'ppt': mimeType = 'application/vnd.ms-powerpoint'; break;
                case 'pptx': mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'; break;
                case 'xls': mimeType = 'application/vnd.ms-excel'; break;
                case 'xlsx': mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; break;
                case 'txt': mimeType = 'text/plain'; break;
                case 'csv': mimeType = 'text/csv'; break;
                case 'jpg':
                case 'jpeg': mimeType = 'image/jpeg'; break;
                case 'png': mimeType = 'image/png'; break;
                case 'gif': mimeType = 'image/gif'; break;
                case 'webp': mimeType = 'image/webp'; break;
              }
              
              uploadedDocuments.push({
                id: `doc-${randomId}`,
                name: file,
                originalName: originalName,
                url: `/documents/${cat}/${file}`,
                size: 0, // We'll get actual size when needed
                type: mimeType,
                category: cat,
                uploadedAt: new Date(timestamp).toISOString()
              });
            }
          }
        } catch (error) {
          console.warn(`Error reading directory ${categoryDir}:`, error);
        }
      }
    }
    
    // Sort by upload date (newest first)
    uploadedDocuments.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    
    return NextResponse.json({
      success: true,
      documents: uploadedDocuments,
      total: uploadedDocuments.length
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category') as DocumentCategory;
    
    if (!id || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing id or category' },
        { status: 400 }
      );
    }
    
    const publicDir = join(process.cwd(), 'public');
    const documentsDir = join(publicDir, 'documents');
    const categoryDir = join(documentsDir, category);
    
    if (!existsSync(categoryDir)) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    try {
      const files = await readdir(categoryDir);
      
      for (const file of files) {
        // Only process document files
        if (file.match(/\.(pdf|doc|docx|ppt|pptx|xls|xlsx|txt|csv|jpg|jpeg|png|gif|webp)$/i)) {
          const filePath = join(categoryDir, file);
          
          // Extract timestamp and ID from filename
          const match = file.match(/^(\d+)-([a-z0-9]+)-(.+)$/i);
          const randomId = match ? match[2] : Math.random().toString(36).substring(2, 15);
          
          if (`doc-${randomId}` === id) {
            await unlink(filePath);
            return NextResponse.json({ success: true });
          }
        }
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete document' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Document not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}
