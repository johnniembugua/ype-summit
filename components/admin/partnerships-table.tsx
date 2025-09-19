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
import { MoreHorizontal, Search, Download, Filter } from 'lucide-react';
import { Partnership } from '@/types';
import { updatePartnershipStatus, deletePartnership } from '@/actions/admin';
import { toast } from 'sonner';

interface PartnershipsTableProps {
  partnerships: Partnership[];
  onUpdate: () => void;
}

export function PartnershipsTable({ partnerships, onUpdate }: PartnershipsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<string | null>(null);

  const filteredPartnerships = partnerships.filter((partnership) => {
    const matchesSearch = 
      partnership.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partnership.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partnership.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || partnership.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (
    id: string, 
    status: 'pending' | 'contacted' | 'confirmed' | 'declined',
    tier?: 'platinum' | 'gold' | 'silver' | 'bronze',
    value?: number
  ) => {
    setLoading(id);
    try {
      const result = await updatePartnershipStatus(id, status, tier, value);
      if (result.success) {
        toast.success('Partnership status updated successfully!');
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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partnership inquiry?')) return;
    
    setLoading(id);
    try {
      const result = await deletePartnership(id);
      if (result.success) {
        toast.success(result.message);
        onUpdate();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to delete partnership');
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmed</Badge>;
      case 'contacted':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Contacted</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Platinum</Badge>;
      case 'gold':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Gold</Badge>;
      case 'silver':
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200">Silver</Badge>;
      case 'bronze':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Bronze</Badge>;
      default:
        return null;
    }
  };

  const getSupportTypeBadge = (type: string) => {
    const colors = {
      financial: 'bg-green-100 text-green-800 border-green-200',
      venue: 'bg-blue-100 text-blue-800 border-blue-200',
      media: 'bg-purple-100 text-purple-800 border-purple-200',
      logistics: 'bg-orange-100 text-orange-800 border-orange-200',
      other: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
      <Badge className={colors[type as keyof typeof colors] || colors.other}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const headers = [
      'Organization', 'Contact Person', 'Email', 'Phone', 'Support Type', 
      'Status', 'Tier', 'Value', 'Submitted Date'
    ];
    const csvData = filteredPartnerships.map(p => [
      p.organizationName,
      p.contactPerson,
      p.email,
      p.phone,
      p.supportType,
      p.status,
      p.partnershipTier || '',
      p.partnershipValue?.toString() || '',
      new Date(p.createdAt).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `partnerships-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Partnerships</h2>
          <p className="text-gray-600">{filteredPartnerships.length} of {partnerships.length} partnerships</p>
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
            placeholder="Search by organization, contact person, or email..."
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
            <DropdownMenuItem onClick={() => setStatusFilter('contacted')}>Contacted</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('confirmed')}>Confirmed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('declined')}>Declined</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Support Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartnerships.map((partnership) => (
              <TableRow key={partnership.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold text-gray-900">{partnership.organizationName}</div>
                    {partnership.message && (
                      <div className="text-sm text-gray-500 max-w-[200px] truncate" title={partnership.message}>
                        {partnership.message}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{partnership.contactPerson}</div>
                    <div className="text-gray-500">{partnership.email}</div>
                    <div className="text-gray-500">{partnership.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{getSupportTypeBadge(partnership.supportType)}</TableCell>
                <TableCell>{getStatusBadge(partnership.status)}</TableCell>
                <TableCell>
                  {partnership.partnershipTier ? getTierBadge(partnership.partnershipTier) : '-'}
                </TableCell>
                <TableCell>
                  {partnership.partnershipValue ? (
                    <div className="font-medium text-green-600">
                      KSH {partnership.partnershipValue.toLocaleString()}
                    </div>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">
                    {new Date(partnership.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading === partnership.id}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(partnership.id, 'contacted')}
                        disabled={partnership.status === 'contacted'}
                      >
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(partnership.id, 'confirmed', 'gold', 50000)}
                        disabled={partnership.status === 'confirmed'}
                      >
                        Confirm Partnership
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(partnership.id, 'declined')}
                        disabled={partnership.status === 'declined'}
                      >
                        Decline Partnership
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(partnership.id, 'pending')}
                        disabled={partnership.status === 'pending'}
                      >
                        Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(partnership.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredPartnerships.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || statusFilter !== 'all' ? 'No partnerships match your filters.' : 'No partnerships found.'}
          </div>
        )}
      </div>
    </div>
  );
}
