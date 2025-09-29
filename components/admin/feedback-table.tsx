'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Eye, MoreHorizontal, Trash2, CheckCircle, Archive, Star, Calendar, Mail, Phone, MessageSquare } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Feedback } from '@/types';
import { updateFeedbackStatus, deleteFeedback } from '@/actions/admin';

interface FeedbackTableProps {
  feedback: Feedback[];
  onUpdate: () => void;
}

export function FeedbackTable({ feedback, onUpdate }: FeedbackTableProps) {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (feedbackId: string, status: 'pending' | 'reviewed' | 'archived') => {
    setIsUpdating(true);
    try {
      const result = await updateFeedbackStatus(feedbackId, status, 'Admin');
      if (result.success) {
        toast.success(result.message);
        onUpdate();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to update feedback status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (feedbackId: string) => {
    try {
      const result = await deleteFeedback(feedbackId);
      if (result.success) {
        toast.success(result.message);
        onUpdate();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to delete feedback');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'reviewed':
        return <Badge variant="default" className="bg-green-100 text-green-800">Reviewed</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Feedback Submissions ({feedback.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Overall Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedback.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.fullName}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-sm">{item.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {item.dayAttended === 'yes' ? 'Full Event' : 'Partial'}
                      </Badge>
                    </TableCell>
                    <TableCell>{getRatingStars(item.overallRating)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedFeedback(item);
                              setIsViewOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(item.id, 'reviewed')}
                            disabled={isUpdating || item.status === 'reviewed'}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Reviewed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(item.id, 'archived')}
                            disabled={isUpdating || item.status === 'archived'}
                          >
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this feedback submission? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(item.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Feedback Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogDescription>
              Complete feedback submission from {selectedFeedback?.fullName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedFeedback && (
            <div className="space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-sm">{selectedFeedback.fullName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-sm flex items-center space-x-1">
                        <Mail className="w-3 h-3" />
                        <span>{selectedFeedback.email}</span>
                      </p>
                    </div>
                    {selectedFeedback.phone && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="text-sm flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{selectedFeedback.phone}</span>
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Attendance</label>
                      <p className="text-sm">
                        <Badge variant="outline">
                          {selectedFeedback.dayAttended === 'yes' ? 'Full Event' : 'Partial Event'}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ratings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Event Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Overall Experience</label>
                      <div className="mt-1">{getRatingStars(selectedFeedback.overallRating)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Content Quality</label>
                      <div className="mt-1">{getRatingStars(selectedFeedback.contentQuality)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Speaker Quality</label>
                      <div className="mt-1">{getRatingStars(selectedFeedback.speakerQuality)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Organization</label>
                      <div className="mt-1">{getRatingStars(selectedFeedback.organizationRating)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Venue & Facilities</label>
                      <div className="mt-1">{getRatingStars(selectedFeedback.venueRating)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Networking Opportunities</label>
                      <div className="mt-1">{getRatingStars(selectedFeedback.networkingRating)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Most Valuable</label>
                    <p className="text-sm mt-1">{selectedFeedback.mostValuable}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Needs Improvement</label>
                    <p className="text-sm mt-1">{selectedFeedback.improvements}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Future Topics Interest</label>
                    <p className="text-sm mt-1">{selectedFeedback.futureTopics}</p>
                  </div>
                  {selectedFeedback.recommendLikelihood && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Recommendation Likelihood</label>
                      <p className="text-sm mt-1">{selectedFeedback.recommendLikelihood}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Workshop Preferences */}
              {(selectedFeedback.favoriteWorkshop || selectedFeedback.speakerSuggestions) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workshop & Speaker Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedFeedback.favoriteWorkshop && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Favorite Workshop</label>
                        <p className="text-sm mt-1">
                          {selectedFeedback.favoriteWorkshop === 'other' 
                            ? selectedFeedback.favoriteWorkshopOther 
                            : selectedFeedback.favoriteWorkshop}
                        </p>
                      </div>
                    )}
                    {selectedFeedback.speakerSpecialization && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Speaker Expertise Interest</label>
                        <p className="text-sm mt-1">{selectedFeedback.speakerSpecialization}</p>
                      </div>
                    )}
                    {selectedFeedback.speakerSuggestions && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Speaker Suggestions</label>
                        <p className="text-sm mt-1">{selectedFeedback.speakerSuggestions}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Additional Comments */}
              {selectedFeedback.additionalComments && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedFeedback.additionalComments}</p>
                  </CardContent>
                </Card>
              )}

              {/* Status Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Current Status</label>
                      <div className="mt-1">{getStatusBadge(selectedFeedback.status)}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Update Status</label>
                      <Select
                        value={selectedFeedback.status}
                        onValueChange={(value) => handleStatusUpdate(selectedFeedback.id, value as any)}
                        disabled={isUpdating}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {selectedFeedback.reviewedAt && (
                    <div className="mt-4">
                      <label className="text-sm font-medium text-gray-600">Reviewed</label>
                      <p className="text-sm text-gray-600">
                        {formatDate(selectedFeedback.reviewedAt)}
                        {selectedFeedback.reviewedBy && ` by ${selectedFeedback.reviewedBy}`}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
