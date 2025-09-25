'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Download, Camera, X, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/Logo';
import { Navigation } from '@/components/Navigation';

export default function PosterGenerator() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleImageUpload(imageFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  }, []);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generatePoster = async () => {
    if (!uploadedImage || !canvasRef.current) return;

    setIsGenerating(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // Set canvas size to exact specifications
      canvas.width = 1080;
      canvas.height = 1080;

      // Load the template image
      const templateImg = new Image();
      templateImg.crossOrigin = 'anonymous'; // Handle potential CORS issues
      
      templateImg.onload = () => {
        // Draw the template as background
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

        // Load and draw the uploaded image in circular frame
        const userImg = new Image();
        userImg.crossOrigin = 'anonymous';
        
        userImg.onload = () => {
          // Use exact specifications for circular position
          const centerX = 860;  // Exact center X coordinate
          const centerY = 484;  // Exact center Y coordinate
          const radius = 162;   // Exact radius

          // Create circular clipping path with smooth edges
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.clip();

          // Calculate image dimensions to fit the circle with proper scaling
          const imgSize = radius * 2.2 * scale; // Slightly larger to ensure full coverage
          const imgX = centerX - imgSize / 2 + position.x;
          const imgY = centerY - imgSize / 2 + position.y;

          // Draw the user's image with smooth scaling
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(userImg, imgX, imgY, imgSize, imgSize);
          ctx.restore();

          // Add subtle white border around the circle for better definition
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.stroke();

          // Add inner shadow for depth
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius - 1, 0, Math.PI * 2);
          ctx.stroke();

          // Download the poster
          const link = document.createElement('a');
          link.download = 'ype-summit-attendance-poster.png';
          link.href = canvas.toDataURL('image/png', 1.0); // Maximum quality
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setIsGenerating(false);
        };
        
        userImg.onerror = () => {
          console.error('Error loading user image');
          setIsGenerating(false);
          alert('Error loading your image. Please try uploading a different image.');
        };
        
        userImg.src = uploadedImage;
      };
      
      templateImg.onerror = () => {
        console.error('Error loading template image');
        setIsGenerating(false);
        alert('Error loading the poster template. Please try again later.');
      };
      
      // Load the template from the images directory
      templateImg.src = '/images/I will Attend.png';
      
    } catch (error) {
      console.error('Error generating poster:', error);
      setIsGenerating(false);
      alert('An error occurred while generating your poster. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative text-white" style={{ background: 'linear-gradient(90deg, #1e3a8a, #0f172a)' }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="space-y-6">
            <Badge className="bg-yellow-400 text-blue-900 text-sm font-semibold px-4 py-2">
              <Camera className="w-4 h-4" />
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Create Your Attendance Poster
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Upload your portrait and generate a personalized "I Will Be Attending" poster for the Young Professionals Summit.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Upload Your Portrait
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!uploadedImage ? (
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                        isDragging
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Drag & Drop Your Photo
                      </h3>
                      <p className="text-gray-600 mb-4">
                        or click to browse files
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports: JPG, PNG, WebP (Max 10MB)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <img
                          src={uploadedImage}
                          alt="Uploaded portrait"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Adjust Your Photo</h4>
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                          >
                            <ZoomOut className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-gray-600">
                            Zoom: {Math.round(scale * 100)}%
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setScale(Math.min(2, scale + 0.1))}
                          >
                            <ZoomIn className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setScale(1);
                              setPosition({ x: 0, y: 0 });
                            }}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-4 text-lg"
                    onClick={generatePoster}
                    disabled={!uploadedImage || isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating Poster...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Generate & Download Poster
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    High-quality PNG poster ready for sharing
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-white rounded-lg overflow-hidden" style={{ aspectRatio: '1/1' }}>
                    {/* Actual poster template as background */}
                    <img 
                      src="/images/I will Attend.png" 
                      alt="Poster template" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    
                    {/* Circular overlay for user image preview - positioned exactly as in final poster */}
                    <div className="absolute inset-0">
                      <div 
                        className="absolute rounded-full border-4 border-white overflow-hidden bg-white/20 flex items-center justify-center shadow-lg"
                        style={{
                          // Exact coordinates from canvas generation, scaled down for preview (scale factor ~0.25)
                          width: '81px',   // 162px radius * 2 = 324px diameter * 0.25 (scaled down for preview)
                          height: '81px', // 162px radius * 2 = 324px diameter * 0.25 (scaled down for preview)
                          left: `${215 - 40.5}px`, // (860px center X - 162px radius) * 0.25 = 215px - 40.5px (scaled down for preview)
                          top: `${121 - 40.5}px`,   // (484px center Y - 162px radius) * 0.25 = 121px - 40.5px (scaled down for preview)
                        }}
                      >
                        {uploadedImage ? (
                          <img
                            src={uploadedImage}
                            alt="Portrait preview"
                            className="w-full h-full object-cover"
                            style={{
                              transform: `scale(${scale}) translate(${position.x * 0.25}px, ${position.y * 0.25}px)`,
                            }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-white/70">
                            <Camera className="w-5 h-5 mb-1" />
                            <span className="text-xs text-center">Your Photo</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Preview overlay indicator */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      Live Preview
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Badge variant="outline" className="text-blue-900 border-blue-900">
                      Professional Quality
                    </Badge>
                    <Badge variant="outline" className="text-blue-900 border-blue-900">
                      High Resolution (1080x1080px)
                    </Badge>
                    <Badge variant="outline" className="text-blue-900 border-blue-900">
                      Perfect for Social Media
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="border-0 shadow-lg bg-blue-50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">How to Use:</h4>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                      Upload a clear portrait photo (JPG, PNG, or WebP)
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                      Adjust zoom and position for perfect framing
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                      Click "Generate & Download" to create your poster
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                      Share your attendance poster on social media!
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden canvas for poster generation */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
