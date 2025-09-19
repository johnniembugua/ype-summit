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
import { Registration } from '@/types';
import { updateRegistrationStatus, deleteRegistration } from '@/actions/admin';
import { toast } from 'sonner';

interface RegistrationsTableProps {
  registrations: Registration[];
  onUpdate: () => void;
}

export function RegistrationsTable({ registrations, onUpdate }: RegistrationsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<string | null>(null);

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch = 
      registration.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.profession.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || registration.paymentStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: string, status: 'pending' | 'paid' | 'failed' | 'refunded') => {
    setLoading(id);
    try {
      const result = await updateRegistrationStatus(id, status);
      if (result.success) {
        toast.success(result.message);
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
    if (!confirm('Are you sure you want to delete this registration?')) return;
    
    setLoading(id);
    try {
      const result = await deleteRegistration(id);
      if (result.success) {
        toast.success(result.message);
        onUpdate();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Failed to delete registration');
    } finally {
      setLoading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      case 'refunded':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Profession', 'Church', 'Workshop', 'Status', 'Registration Date'];
    const csvData = filteredRegistrations.map(reg => [
      reg.fullName,
      reg.email,
      reg.phone,
      reg.profession,
      reg.church || '',
      reg.workshopPreference,
      reg.paymentStatus,
      new Date(reg.registrationDate).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registrations</h2>
          <p className="text-gray-600">{filteredRegistrations.length} of {registrations.length} registrations</p>
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
            placeholder="Search by name, email, or profession..."
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
            <DropdownMenuItem onClick={() => setStatusFilter('paid')}>Paid</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('failed')}>Failed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter('refunded')}>Refunded</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Profession</TableHead>
              <TableHead>Workshop</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.map((registration) => (
              <TableRow key={registration.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-semibold text-gray-900">{registration.fullName}</div>
                    {registration.church && (
                      <div className="text-sm text-gray-500">{registration.church}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{registration.email}</div>
                  </div>
                </TableCell>
                <TableCell>{registration.phone}</TableCell>
                <TableCell>{registration.profession}</TableCell>
                <TableCell>
                  <div className="text-sm max-w-[200px] truncate" title={registration.workshopPreference}>
                    {registration.workshopPreference}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(registration.paymentStatus)}</TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">
                    {new Date(registration.registrationDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading === registration.id}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(registration.id, 'paid')}
                        disabled={registration.paymentStatus === 'paid'}
                      >
                        Mark as Paid
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(registration.id, 'pending')}
                        disabled={registration.paymentStatus === 'pending'}
                      >
                        Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(registration.id, 'failed')}
                        disabled={registration.paymentStatus === 'failed'}
                      >
                        Mark as Failed
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate(registration.id, 'refunded')}
                        disabled={registration.paymentStatus === 'refunded'}
                      >
                        Mark as Refunded
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(registration.id)}
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
        
        {filteredRegistrations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || statusFilter !== 'all' ? 'No registrations match your filters.' : 'No registrations found.'}
          </div>
        )}
      </div>
    </div>
  );
}
