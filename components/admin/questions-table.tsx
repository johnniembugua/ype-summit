'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, Search, Download, Filter, ThumbsUp } from 'lucide-react';
import { Question } from '@/types';
import { updateQuestionStatus, deleteQuestion, upvoteQuestion } from '@/actions/admin';
import { toast } from 'sonner';

interface QuestionsTableProps {
  questions: Question[];
  onUpdate: () => void;
}

export function QuestionsTable({ questions, onUpdate }: QuestionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<string | null>(null);

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = 
      question.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: string, status: 'pending' | 'reviewed' | 'answered' | 'archived') => {
    setLoading(id);
    try {
      const result = await updateQuestionStatus(id, status);
      if (result.success) {
        toast.success('Question status updated successfully!');
        onUpdate();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(null);
    }
  };

  const handleUpvote = async (id: string) => {
    setLoading(id);
    try {
      const result = await upvoteQuestion(id);
      if (result.success) {
        toast.success(result.message);
        onUpdate();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to upvote question');
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    
    setLoading(id);
    try {
      const result = await deleteQuestion(id);
      if (result.success) {
        toast.success(result.message);
        onUpdate();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to delete question');
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = (status: string, isAnswered: boolean) => {
    if (isAnswered) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Answered</Badge>;
    }
    
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'reviewed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Reviewed</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Question', 'Category', 'Status', 'Answered', 'Submitted Date'];
    const csvData = filteredQuestions.map(q => [
      q.name,
      q.question.replace(/"/g, '""'), // Escape quotes
      q.category || '',
      q.status,
      q.isAnswered ? 'Yes' : 'No',
      new Date(q.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `questions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Questions</h2>
          <p className="text-gray-600">{filteredQuestions.length} of {questions.length} questions</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name or question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Status: {statusFilter === 'all' ? 'All' : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('pending')}>Pending</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('reviewed')}>Reviewed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('answered')}>Answered</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('archived')}>Archived</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question.id}>
                <TableCell className="font-medium">
                  <div className="font-semibold text-gray-900">{question.name}</div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[400px]">
                    <p className="text-sm text-gray-900 line-clamp-3">
                      {question.question}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {question.category && (
                    <Badge variant="outline" className="capitalize">
                      {question.category}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {getStatusBadge(question.status, question.isAnswered)}
                  {question.answeredBy && (
                    <div className="text-xs text-gray-500 mt-1">
                      by {question.answeredBy}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">
                    {new Date(question.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpvote(question.id)}
                      disabled={loading === question.id}
                      className="p-2 flex items-center space-x-1"
                      title={`Upvote this question (${question.upvotes || 0} upvotes)`}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {question.upvotes > 0 && (
                        <span className="text-xs">{question.upvotes}</span>
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading === question.id}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(question.id, 'pending')}
                          disabled={question.status === 'pending'}
                        >
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(question.id, 'reviewed')}
                          disabled={question.status === 'reviewed'}
                        >
                          Mark as Reviewed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(question.id, 'answered')}
                          disabled={question.isAnswered}
                        >
                          Mark as Answered
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusUpdate(question.id, 'archived')}
                          disabled={question.status === 'archived'}
                        >
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(question.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredQuestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || statusFilter !== 'all' ? 'No questions match your filters.' : 'No questions found.'}
          </div>
        )}
      </div>
    </div>
  );
}
