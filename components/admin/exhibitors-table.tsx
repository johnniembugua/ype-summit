'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  ExternalLink,
  Calendar,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { toast } from 'sonner';
import { Exhibitor } from '@/types';
import { updateExhibitorStatus, deleteExhibitor } from '@/actions/exhibitors';

interface ExhibitorsTableProps {
  exhibitors: Exhibitor[];
  onUpdate: () => void;
}

export function ExhibitorsTable({ exhibitors, onUpdate }: ExhibitorsTableProps) {
  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    setIsUpdating(true);
    try {
      const result = await updateExhibitorStatus(
        id, 
        status as 'pending' | 'reviewed' | 'approved' | 'rejected',
        'Admin' // In a real app, this would be the actual admin user
      );

      if (result.success) {
        toast.success('Exhibitor status updated successfully');
        onUpdate();
      } else {
        toast.error(result.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred while updating status');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const result = await deleteExhibitor(id);

      if (result.success) {
        toast.success('Exhibitor deleted successfully');
        onUpdate();
      } else {
        toast.error(result.error || 'Failed to delete exhibitor');
      }
    } catch (error) {
      console.error('Error deleting exhibitor:', error);
      toast.error('An error occurred while deleting exhibitor');
    } finally {
      setIsDeleting(null);
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const parseSdgAlignment = (sdgJson: string) => {
    try {
      return JSON.parse(sdgJson);
    } catch {
      return [];
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>Exhibitor Submissions ({exhibitors.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Idea Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exhibitors.map((exhibitor) => (
                  <TableRow key={exhibitor.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{exhibitor.fullName}</div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{exhibitor.email}</span>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{exhibitor.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {exhibitor.companyName ? (
                        <div>
                          <div className="font-medium">{exhibitor.companyName}</div>
                          {exhibitor.website && (
                            <a 
                              href={exhibitor.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center space-x-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Website</span>
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium truncate">{exhibitor.ideaTitle}</div>
                        <div className="text-sm text-gray-500">{exhibitor.fieldOfFocus}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{exhibitor.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={exhibitor.status}
                          onValueChange={(value) => handleStatusUpdate(exhibitor.id, value)}
                          disabled={isUpdating}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(exhibitor.createdAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedExhibitor(exhibitor)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Exhibitor Details</DialogTitle>
                              <DialogDescription>
                                Complete submission details for {exhibitor.fullName}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedExhibitor && (
                              <div className="space-y-6">
                                {/* Personal Information */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Full Name</label>
                                      <p className="text-sm">{selectedExhibitor.fullName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Email</label>
                                      <p className="text-sm">{selectedExhibitor.email}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Phone</label>
                                      <p className="text-sm">{selectedExhibitor.phone}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Company</label>
                                      <p className="text-sm">{selectedExhibitor.companyName || 'Not provided'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Years of Operation</label>
                                      <p className="text-sm">{selectedExhibitor.yearsOfOperation || 'Not provided'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Website</label>
                                      <p className="text-sm">
                                        {selectedExhibitor.website ? (
                                          <a 
                                            href={selectedExhibitor.website} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                          >
                                            {selectedExhibitor.website}
                                          </a>
                                        ) : 'Not provided'}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Idea Information */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Idea Information</h3>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Idea Title</label>
                                      <p className="text-sm font-medium">{selectedExhibitor.ideaTitle}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Category</label>
                                      <p className="text-sm">{selectedExhibitor.category}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Field of Focus</label>
                                      <p className="text-sm">{selectedExhibitor.fieldOfFocus}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Areas of Interest</label>
                                      <p className="text-sm">{selectedExhibitor.areasOfInterest || 'Not provided'}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">What Makes It Unique?</label>
                                      <p className="text-sm">{selectedExhibitor.uniqueness}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Summary</label>
                                      <p className="text-sm">{selectedExhibitor.summary}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Business Model</label>
                                      <p className="text-sm">{selectedExhibitor.businessModel}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Target Market</label>
                                      <p className="text-sm">{selectedExhibitor.targetMarket}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Collaboration */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Collaboration</h3>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Want to Team Up?</label>
                                      <p className="text-sm capitalize">{selectedExhibitor.wantToTeamUp}</p>
                                    </div>
                                    {selectedExhibitor.lookingFor && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">Looking For</label>
                                        <p className="text-sm">{selectedExhibitor.lookingFor}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* SDG Alignment */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-3">SDG Alignment</h3>
                                  <div className="space-y-2">
                                    {parseSdgAlignment(selectedExhibitor.sdgAlignment).map((sdg: string, index: number) => (
                                      <Badge key={index} variant="outline">{sdg}</Badge>
                                    ))}
                                    {selectedExhibitor.otherSdg && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">Other SDG</label>
                                        <p className="text-sm">{selectedExhibitor.otherSdg}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Status Information */}
                                <div>
                                  <h3 className="text-lg font-semibold mb-3">Status Information</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Current Status</label>
                                      <div className="mt-1">
                                        <Badge className={getStatusColor(selectedExhibitor.status)}>
                                          {getStatusIcon(selectedExhibitor.status)}
                                          <span className="ml-1 capitalize">{selectedExhibitor.status}</span>
                                        </Badge>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-500">Submitted</label>
                                      <p className="text-sm">{formatDate(selectedExhibitor.createdAt)}</p>
                                    </div>
                                    {selectedExhibitor.reviewedAt && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">Reviewed At</label>
                                        <p className="text-sm">{formatDate(selectedExhibitor.reviewedAt)}</p>
                                      </div>
                                    )}
                                    {selectedExhibitor.reviewedBy && (
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">Reviewed By</label>
                                        <p className="text-sm">{selectedExhibitor.reviewedBy}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(exhibitor.id)}
                          disabled={isDeleting === exhibitor.id}
                          className="text-red-600 hover:text-red-700"
                        >
                          {isDeleting === exhibitor.id ? (
                            <Clock className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {exhibitors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No exhibitor submissions yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
