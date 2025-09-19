import { NextRequest, NextResponse } from 'next/server';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Mock Google Photos data for now - you can replace with actual Google Photos API later
const mockGooglePhotos = [
  {
    id: 'google-1',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    name: 'YPE Summit Opening Ceremony',
    uploadedAt: new Date('2025-09-15').toISOString(),
    category: 'summit' as const
  },
  {
    id: 'google-2',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    name: 'Networking Session',
    uploadedAt: new Date('2025-09-15').toISOString(),
    category: 'networking' as const
  },
  {
    id: 'google-3',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?w=800&h=600&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?w=400&h=300&fit=crop',
    name: 'Workshop Activities',
    uploadedAt: new Date('2025-09-15').toISOString(),
    category: 'other' as const
  }
];

export async function GET() {
  try {
    const publicDir = join(process.cwd(), 'public');
    const galleryDir = join(publicDir, 'images', 'gallery');
    const categories = ['summit', 'networking', 'other'];
    
    const localPhotos = [];
    
    // Read photos from each category directory
    for (const category of categories) {
      const categoryDir = join(galleryDir, category);
      
      if (existsSync(categoryDir)) {
        try {
          const files = await readdir(categoryDir);
          
          for (const file of files) {
            // Only process image files
            if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              const filePath = join(categoryDir, file);
              const stats = await readFile(filePath);
              
              // Extract timestamp and random ID from filename
              const match = file.match(/^(\d+)-([a-z0-9]+)\./i);
              const timestamp = match ? parseInt(match[1]) : Date.now();
              const randomId = match ? match[2] : Math.random().toString(36).substring(2, 15);
              
              localPhotos.push({
                id: `local-${randomId}`,
                url: `/images/gallery/${category}/${file}`,
                thumbnailUrl: `/images/gallery/${category}/${file}`, // Same URL for now
                name: file.replace(/\.[^/.]+$/, ''), // Remove extension
                uploadedAt: new Date(timestamp).toISOString(),
                category: category as 'summit' | 'networking' | 'other',
                source: 'local' as const
              });
            }
          }
        } catch (error) {
          console.warn(`Error reading directory ${categoryDir}:`, error);
        }
      }
    }
    
    // Combine Google Photos and local photos
    const allPhotos = [
      ...mockGooglePhotos.map(photo => ({
        ...photo,
        source: 'google' as const
      })),
      ...localPhotos
    ];

    return NextResponse.json({
      success: true,
      photos: allPhotos
    });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}
