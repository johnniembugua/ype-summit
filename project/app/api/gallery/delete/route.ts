import { NextRequest, NextResponse } from 'next/server';
import { unlink, readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const photoId = searchParams.get('id');
    
    if (!photoId) {
      return NextResponse.json(
        { success: false, error: 'Photo ID is required' },
        { status: 400 }
      );
    }

    // Check if it's a local photo (starts with 'local-')
    if (photoId.startsWith('local-')) {
      const publicDir = join(process.cwd(), 'public');
      const galleryDir = join(publicDir, 'images', 'gallery');
      const categories = ['summit', 'networking', 'other'];
      
      // Try to find and delete the photo from each category directory
      let photoDeleted = false;
      
      for (const category of categories) {
        const categoryDir = join(galleryDir, category);
        
        if (existsSync(categoryDir)) {
          try {
            const files = await readdir(categoryDir);
            
            for (const file of files) {
              // Extract the random ID from filename to match with photoId
              const match = file.match(/^(\d+)-([a-z0-9]+)\./i);
              if (match && `local-${match[2]}` === photoId) {
                const filePath = join(categoryDir, file);
                
                try {
                  await unlink(filePath);
                  photoDeleted = true;
                  console.log(`Deleted photo: ${filePath}`);
                  break;
                } catch (deleteError) {
                  console.error(`Error deleting file ${filePath}:`, deleteError);
                }
              }
            }
            
            if (photoDeleted) break;
          } catch (error) {
            console.warn(`Error reading directory ${categoryDir}:`, error);
          }
        }
      }
      
      if (photoDeleted) {
        return NextResponse.json({
          success: true,
          message: 'Photo deleted successfully'
        });
      } else {
        return NextResponse.json(
          { success: false, error: 'Photo not found' },
          { status: 404 }
        );
      }
    } else {
      // For Google Photos or other sources, we can't delete them
      // Just return a message that deletion is not supported
      return NextResponse.json(
        { success: false, error: 'Cannot delete Google Photos. Please remove them from the Google Photos album directly.' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error deleting photo:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
