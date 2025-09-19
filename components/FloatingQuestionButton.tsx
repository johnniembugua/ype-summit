'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingQuestionButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-3 max-w-xs border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-900">Have a Question?</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Ask questions in real-time and get answers during the summit!
          </p>
          <Link href="/questions">
            <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">
              Ask a Question
            </Button>
          </Link>
        </div>
      )}
      
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-blue-900 hover:bg-blue-800 text-white rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
