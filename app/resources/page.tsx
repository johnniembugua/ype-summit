'use client';

import { useState, useEffect, useMemo } from 'react';
import { Download, FileText, Filter, Grid, List, Search, Trash2, Eye, Calendar, User, Folder, Facebook, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';

interface Document {
  id: string;
  name: string;
  originalName: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  description?: string;
  uploadedBy?: string;
}

export default function ResourcesPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/documents/resources.json', { cache: 'no-store' });
      const data = await response.json();
      // Expecting an array of documents from the static manifest
      if (Array.isArray(data)) {
        setDocuments(data);
      } else if (data?.documents && Array.isArray(data.documents)) {
        setDocuments(data.documents);
      } else {
        console.error('Unexpected resources manifest format', data);
        setDocuments([]);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (document: Document) => {
    try {
      const response = await fetch(document.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.originalName || document.name;
      window.document.body.appendChild(link);
      link.click();
      
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Error downloading document');
    }
  };

  const handleDelete = async (document: Document) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/documents?id=${document.id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert('Document deleted successfully!');
        loadDocuments(); // Refresh the document list
      } else {
        alert(`Delete failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('presentation') || type.includes('powerpoint')) return '📊';
    if (type.includes('sheet') || type.includes('excel')) return '📈';
    if (type.includes('image')) return '🖼️';
    if (type.includes('text')) return '📃';
    return '📄';
  };

  const normalizeBase = (s: string) =>
    s
      .trim()
      .replace(/\.+$/, '')
      .replace(/[_\-]+/g, ' ')
      .replace(/\s+/g, ' ');

  const getBaseName = (name: string) => {
    const idx = name.lastIndexOf('.');
    return normalizeBase(idx > 0 ? name.slice(0, idx) : name).trim();
  };

  // Manual cover overrides for specific titles -> /public/images path
  const coverOverrides: Record<string, string> = {
    // keys should be normalized (lowercased, trimmed, spaces collapsed, punctuation removed where reasonable)
    'the lean startup - erick ries': '/images/The Lean Startup - Erick Ries.jpg',
    'the lean startup': '/images/The Lean Startup - Erick Ries.jpg',
    'mountain is you': '/images/The Mountain Is You.jpg',
    'the mountain is you': '/images/The Mountain Is You.jpg',
  };

  const normalizeForLookup = (s: string) =>
    s
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^\w\s\-]/g, '')
      .replace(/^the\s+/, '')
      .replace(/\s+/g, ' ')
      .trim();

  const DocumentCover: React.FC<{ baseName: string; mime: string; alt: string; className?: string }> = ({ baseName, mime, alt, className }) => {
    const candidates = useMemo(() => {
      const base = getBaseName(baseName);
      const exts = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

      const stripLeadingThe = (s: string) => s.replace(/^the\s+/i, '').trim();

      const simple = base
        .replace(/&/g, 'and')
        .replace(/[^\w\s\-]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      const variantsSet = new Set<string>([
        base,
        simple,
        stripLeadingThe(base),
        stripLeadingThe(simple),
      ]);

      // Also push lowercase variants to handle filenames saved in lowercase
      const lowerVariants = Array.from(variantsSet).map((v) => v.toLowerCase());
      for (const v of lowerVariants) variantsSet.add(v);

      const variants = Array.from(variantsSet).filter(Boolean);

      const urls: string[] = [];
      for (const n of variants) {
        for (const ext of exts) {
          urls.push(encodeURI(`/images/${n}.${ext}`));
        }
      }
      return urls;
    }, [baseName]);

    const [idx, setIdx] = useState(0);
    const isPdf = mime.includes('pdf');

    // Check manual overrides first
    const override = coverOverrides[normalizeForLookup(baseName)]
      || coverOverrides[normalizeForLookup(getBaseName(baseName))];
    if (isPdf && override) {
      return <img src={override} alt={alt} className={className} />;
    }

    if (!isPdf) {
      return <div className={className + ' text-6xl flex items-center justify-center'}>{getFileIcon(mime)}</div>;
    }

    if (idx >= candidates.length) {
      return <div className={className + ' text-6xl flex items-center justify-center'}>{getFileIcon(mime)}</div>;
    }

    return (
      <img
        src={candidates[idx]}
        alt={alt}
        className={className}
        onError={() => setIdx((i) => i + 1)}
      />
    );
  };

  const imagePreviewIndex = useMemo(() => {
    const index = new Map<string, string>();
    for (const doc of documents) {
      const isImage = doc.type.includes('image');
      if (!isImage) continue;
      const key = `${getBaseName(doc.originalName || doc.name)}`;
      if (!index.has(key)) index.set(key, doc.url);
    }
    return index;
  }, [documents]);

  const filteredDocuments = documents
    .filter((document) => {
      const hay = `${document.originalName} ${document.name} ${document.description || ''}`;
      return !/concept/i.test(hay);
    })
    .filter((document) => {
      const matchesSearch =
        searchQuery === '' ||
        document.originalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (document.description && document.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
      <Navigation />
      {/* Header */}
      <div className="text-white py-16" style={{ background: 'linear-gradient(90deg, #0b3050, #021023)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-4">
              <Badge className="bg-yellow-400 text-white text-sm font-semibold px-4 py-2">
                <FileText className="w-4 h-4 text-blue-900" />
              </Badge>
            </div>
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Resources Hub
              </h1>
            </div>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Access and share important documents, presentations, and materials for the YPE Summit
            </p>
            <Badge className="bg-white/10 text-white px-5 py-2 text-lg rounded-full backdrop-blur-md border border-white/20 shadow-lg ring-1 ring-white/10">
              {documents.length} Documents Available
            </Badge>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
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
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 h-4 w-4" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Documents Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                  {(() => {
                    const isPdf = document.type.includes('pdf');
                    const key = `${getBaseName(document.originalName || document.name)}`;
                    const preview = isPdf ? imagePreviewIndex.get(key) : undefined;
                    if (preview) {
                      return <img src={preview} alt={document.originalName} className="w-full h-full object-cover" />;
                    }
                    return (
                      <DocumentCover
                        baseName={document.originalName || document.name}
                        mime={document.type}
                        alt={document.originalName}
                        className="w-full h-full object-cover"
                      />
                    );
                  })()}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-2 truncate" title={document.originalName}>
                    {document.originalName}
                  </h3>
                  {document.description && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {document.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{formatFileSize(document.size)}</span>
                    <span>{new Date(document.uploadedAt).toLocaleDateString()} {new Date(document.uploadedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(document)}
                      className="text-gray-600 hover:text-green-500 hover:bg-green-50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(document.url, '_blank')}
                      className="text-gray-600 hover:text-blue-500 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(document)}
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
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                      {(() => {
                        const isPdf = document.type.includes('pdf');
                        const key = `${getBaseName(document.originalName || document.name)}`;
                        const preview = isPdf ? imagePreviewIndex.get(key) : undefined;
                        if (preview) {
                          return <img src={preview} alt={document.originalName} className="w-full h-full object-cover" />;
                        }
                        return (
                          <DocumentCover
                            baseName={document.originalName || document.name}
                            mime={document.type}
                            alt={document.originalName}
                            className="w-full h-full object-cover"
                          />
                        );
                      })()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{document.originalName}</h3>
                      </div>
                      {document.description && (
                        <p className="text-sm text-gray-600 mb-2">{document.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{formatFileSize(document.size)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                        </div>
                        {document.uploadedBy && (
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{document.uploadedBy}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(document)}
                        className="flex items-center space-x-2"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(document.url, '_blank')}
                        className="flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(document)}
                        className="flex items-center space-x-2 text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredDocuments.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No documents found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? 'Try adjusting your search.'
                : 'There are currently no documents to display.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo variant="footer" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering spiritually grounded professionals to make a lasting impact in their fields and communities.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-400 hover:text-blue-900 transition-colors">Home</Link>
                <Link href="/about" className="block text-gray-400 hover:text-blue-900 transition-colors">About</Link>
                <Link href="/program" className="block text-gray-400 hover:text-blue-900 transition-colors">Program</Link>
                <Link href="/speakers" className="block text-gray-400 hover:text-blue-900 transition-colors">Speakers</Link>
                <Link href="/register" className="block text-gray-400 hover:text-blue-900 transition-colors">Register</Link>
                <Link href="/about" className="block text-gray-400 hover:text-blue-900 transition-colors">About</Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <p>aysmwangaza@gmail.com</p>
                <p> +254117476172</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="space-y-2 text-gray-400">
                <p>Follow us on social media for updates</p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="#"
                    aria-label="YouTube"
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
                  >
                    <Youtube className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} YPE Summit. All rights reserved. | Powered by Mwangaza Adventist Youth Society YPE Band</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
