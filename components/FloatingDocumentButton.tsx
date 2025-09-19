'use client';

import { useState, useRef } from 'react';
import { FileText, Upload, X, Download, Sparkles, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePathname } from 'next/navigation';

export function FloatingDocumentButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'panelist-materials' | 'summit-docs' | 'resources' | 'presentations'>('resources');
  const [description, setDescription] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Hide on resources page
  if (pathname && pathname.startsWith('/resources')) {
    return null;
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', selectedCategory);
      if (description) formData.append('description', description);
      if (uploadedBy) formData.append('uploadedBy', uploadedBy);
      
      // Upload to server
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Success - show success message
        alert('Document uploaded successfully!');
        console.log('Document uploaded successfully:', result);
        setIsExpanded(false);
        // Reset form
        setDescription('');
        setUploadedBy('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        // Show error message from server
        alert(`Upload failed: ${result.error || 'Unknown error'}`);
        console.error('Upload failed:', result);
      }
    } catch (error) {
      alert(`Error uploading document: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Error uploading document:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          size="lg"
        >
          <FileText className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-5 w-5 text-blue-900" />
              <h3 className="font-semibold text-gray-900">Upload Document</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {/* File Input */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,.jpg,.jpeg,.png,.gif,.webp"
                className="hidden"
              />
              <Button
                onClick={triggerFileInput}
                disabled={isUploading}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Choose File</span>
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOC, PPT, XLS, TXT, CSV, Images (Max 25MB)
              </p>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'resources', label: 'Resources', color: 'bg-green-100 text-green-800' },
                  { value: 'panelist-materials', label: 'Panelist', color: 'bg-purple-100 text-purple-800' },
                  { value: 'summit-docs', label: 'Summit Docs', color: 'bg-blue-100 text-blue-800' },
                  { value: 'presentations', label: 'Presentations', color: 'bg-orange-100 text-orange-800' }
                ].map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value as any)}
                    className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === category.value
                        ? `${category.color} border-2 border-current`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the document..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm resize-none"
                rows={2}
              />
            </div>

            {/* Uploaded By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uploaded By (Optional)</label>
              <input
                type="text"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                placeholder="Your name or organization"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>

            {/* Security Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Sparkles className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">Security Notice</p>
                  <p>All documents are scanned for security. Only safe file types are allowed to prevent hacking attempts.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsExpanded(false)}
                className="flex-1"
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => window.open('/resources', '_blank')}
                variant="outline"
                className="flex-1"
                disabled={isUploading}
              >
                <Download className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
