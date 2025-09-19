'use client';

import { useState, useEffect } from 'react';
import { Download, Heart, Share2, Filter, Grid, List, Camera, Sparkles, Tag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface GalleryImage {
  id: string;
  url: string;
  fullUrl?: string;
  title: string;
  uploadedAt: string;
  likes: number;
  category: 'summit' | 'networking' | 'other';
  source?: 'local' | 'google';
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'summit' | 'networking' | 'other'>('all');

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      
      try {
        const response = await fetch('/api/gallery/photos');
        const data = await response.json();
        
        if (data.success) {
          // Transform Google Photos data to match our GalleryImage interface
          const galleryImages: GalleryImage[] = data.photos.map((photo: any) => ({
            id: photo.id,
            url: photo.thumbnailUrl, // Use thumbnail for gallery view
            fullUrl: photo.url,
            title: photo.name,
            uploadedAt: new Date(photo.uploadedAt).toLocaleDateString(),
            likes: Math.floor(Math.random() * 100), // Random likes for now
            category: photo.category,
            source: photo.source || 'google'
          }));
          setImages(galleryImages);
        } else {
          console.error('Failed to fetch photos:', data.error);
          // Fallback to empty array on error
          setImages([]);
        }
      } catch (error) {
        console.error('Error loading images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  const handleDownload = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleLike = (imageId: string) => {
    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, likes: img.likes + 1 }
        : img
    ));
  };

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Check out this photo from YPE Summit!`,
          url: image.fullUrl || image.url
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(image.fullUrl || image.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      const response = await fetch(`/api/gallery/delete?id=${imageId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setImages(prev => prev.filter(img => img.id !== imageId));
      } else {
        console.error('Failed to delete photo:', data.error);
        alert(data.error || 'Failed to delete photo');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image');
    }
  };

  const filteredImages = images.filter(image => {
    // Apply category filter
    if (categoryFilter !== 'all' && image.category !== categoryFilter) {
      return false;
    }
    
    // Apply other filters
    if (filter === 'recent') {
      return new Date(image.uploadedAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);
    }
    if (filter === 'popular') {
      return image.likes > 40;
    }
    return true;
  });

  const getCategoryColor = (category: 'summit' | 'networking' | 'other') => {
    switch (category) {
      case 'summit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'networking':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'other':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Gallery Hub
              </h1>
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Capture and share your summit moments with the community
            </p>
            <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-lg">
              {images.length} Photos Shared
            </Badge>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-full"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-full"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-lg">
              {(['all', 'recent', 'popular'] as const).map((filterType) => (
                <Button
                  key={filterType}
                  variant={filter === filterType ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(filterType)}
                  className="rounded-full capitalize"
                >
                  {filterType}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-lg">
              {(['all', 'summit', 'networking', 'other'] as const).map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                  className="rounded-full capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredImages.length} of {images.length} photos
          </div>
        </div>

        {/* Gallery Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.id} className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 left-2">
                    <Badge className={`text-xs ${getCategoryColor(image.category)}`}>
                      {image.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm mb-1">{image.title}</h3>
                    <p className="text-xs text-gray-200">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(image.id)}
                        className="text-gray-600 hover:text-red-500 hover:bg-red-50"
                      >
                        <Heart className="h-4 w-4 mr-1" />
                        {image.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(image)}
                        className="text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(image.url, `${image.title}.jpg`)}
                      className="text-gray-600 hover:text-green-500 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                      className="text-gray-600 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredImages.map((image) => (
              <Card key={image.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                        <Badge className={`text-xs ${getCategoryColor(image.category)}`}>
                          {image.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Uploaded on {new Date(image.uploadedAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLike(image.id)}
                          className="flex items-center space-x-2"
                        >
                          <Heart className="h-4 w-4" />
                          <span>{image.likes}</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShare(image)}
                          className="flex items-center space-x-2"
                        >
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleDownload(image.url, `${image.title}.jpg`)}
                          className="flex items-center space-x-2 bg-blue-900 hover:bg-blue-800"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleDelete(image.id)}
                          className="flex items-center space-x-2 bg-red-900 hover:bg-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No photos found</h3>
            <p className="text-gray-500">Be the first to share a moment from the summit!</p>
          </div>
        )}
      </div>
    </div>
  );
}
