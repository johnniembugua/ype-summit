'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Download, Sparkles, Tag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GOOGLE_ALBUM_URL = 'https://photos.app.goo.gl/Qi6HMU9Epjb6QsUN7';

export function FloatingGalleryButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'summit' | 'networking' | 'other'>('summit');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', selectedCategory);
      
      // Upload to server
      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Success - show success message
        alert('Image uploaded successfully!');
        console.log('Image uploaded successfully:', result);
        setIsExpanded(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        // Show error message from server
        alert(`Upload failed: ${result.error || 'Unknown error'}`);
        console.error('Upload failed:', result);
      }
    } catch (error) {
      alert(`Error uploading image: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraCapture = async () => {
    setShowCamera(true);
    
    try {
      // Access camera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setShowCamera(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        
        // Convert to blob and upload
        canvas.toBlob(async (blob) => {
          if (blob) {
            const formData = new FormData();
            formData.append('file', blob, 'camera-photo.jpg');
            formData.append('category', selectedCategory);
            
            try {
              const response = await fetch('/api/gallery/upload', {
                method: 'POST',
                body: formData,
              });
              
              if (response.ok) {
                console.log('Photo uploaded successfully');
                setShowCamera(false);
                setIsExpanded(false);
                alert('Photo uploaded successfully!');
              } else {
                const result = await response.json();
                alert(`Upload failed: ${result.error || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('Error uploading photo:', error);
              alert(`Error uploading photo: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleAddToGoogleAlbum = () => {
    // Open Google Photos album in a new tab
    window.open(GOOGLE_ALBUM_URL, '_blank');
  };

  return (
    <>
      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-2xl w-full mx-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <Button
                onClick={takePhoto}
                className="bg-blue-900 hover:bg-blue-800 text-white rounded-full h-16 w-16 p-0 shadow-lg"
              >
                <Camera className="h-8 w-8" />
              </Button>
              <Button
                onClick={() => setShowCamera(false)}
                variant="outline"
                className="bg-white/20 border-white/30 text-white rounded-full h-12 w-12 p-0"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-start space-y-3">
        {isExpanded && (
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 rounded-2xl shadow-2xl p-6 mb-3 max-w-sm border border-blue-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Gallery Hub</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Share your summit moments! Upload photos or capture live shots to add to our community gallery.
            </p>

            {/* Category Selection */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200 text-sm font-medium">Select Category:</span>
              </div>
              <div className="flex space-x-2">
                {(['summit', 'networking', 'other'] as const).map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`flex-1 capitalize ${
                      selectedCategory === category
                        ? 'bg-blue-700 hover:bg-blue-600 text-white'
                        : 'bg-white/10 border-blue-400/30 text-blue-200 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full bg-blue-700 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload Photo</span>
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleCameraCapture}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Camera className="h-5 w-5" />
                <span>Take Photo</span>
              </Button>
              
              <Button
                onClick={handleAddToGoogleAlbum}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Add to Google Album</span>
              </Button>
              
              <Button
                onClick={() => {
                  setIsExpanded(false);
                  window.location.href = '/gallery';
                }}
                className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl border border-white/30 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>View Gallery</span>
              </Button>
            </div>
          </div>
        )}
        
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-blue-900 hover:bg-blue-800 text-white rounded-full h-16 w-16 p-0 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center animate-pulse hover:animate-none"
          size="lg"
        >
          <Camera className="h-7 w-7" />
        </Button>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </>
  );
}
