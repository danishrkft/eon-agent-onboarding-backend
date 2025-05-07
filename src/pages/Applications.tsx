
import React, { useState } from 'react';
import { Filter, PlusCircle, Search, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Sample application data
const applicationData = [
  { id: 'APP001', agent: 'John Doe', type: 'New Agent', submissionDate: '2025-04-01', status: 'Pending', documents: 4 },
  { id: 'APP002', agent: 'Sarah Johnson', type: 'License Renewal', submissionDate: '2025-04-02', status: 'Approved', documents: 3 },
  { id: 'APP003', agent: 'Michael Brown', type: 'New Agent', submissionDate: '2025-04-03', status: 'Rejected', documents: 5 },
  { id: 'APP004', agent: 'Jessica Williams', type: 'Address Change', submissionDate: '2025-04-03', status: 'Pending', documents: 2 },
  { id: 'APP005', agent: 'David Miller', type: 'New Agent', submissionDate: '2025-04-04', status: 'Approved', documents: 4 },
  { id: 'APP006', agent: 'Emily Davis', type: 'License Renewal', submissionDate: '2025-04-05', status: 'Pending', documents: 3 },
  { id: 'APP007', agent: 'Robert Wilson', type: 'New Agent', submissionDate: '2025-04-06', status: 'Pending', documents: 5 },
  { id: 'APP008', agent: 'Jennifer Garcia', type: 'Address Change', submissionDate: '2025-04-07', status: 'Approved', documents: 2 },
  { id: 'APP009', agent: 'Thomas Martinez', type: 'License Renewal', submissionDate: '2025-04-08', status: 'Rejected', documents: 3 },
  { id: 'APP010', agent: 'Lisa Robinson', type: 'New Agent', submissionDate: '2025-04-09', status: 'Pending', documents: 4 },
  { id: 'APP011', agent: 'Daniel Lee', type: 'Address Change', submissionDate: '2025-04-10', status: 'Approved', documents: 2 },
  { id: 'APP012', agent: 'Nancy Clark', type: 'License Renewal', submissionDate: '2025-04-11', status: 'Pending', documents: 3 },
  { id: 'APP013', agent: 'Paul Harris', type: 'New Agent', submissionDate: '2025-04-12', status: 'Approved', documents: 5 },
  { id: 'APP014', agent: 'Karen Lewis', type: 'Address Change', submissionDate: '2025-04-13', status: 'Rejected', documents: 2 },
  { id: 'APP015', agent: 'Jason Walker', type: 'License Renewal', submissionDate: '2025-04-14', status: 'Pending', documents: 3 },
];

const Applications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  
  const itemsPerPage = 10;
  
  // Filter data based on search term, status, and type
  const filteredData = applicationData.filter(application => {
    const matchesSearch = application.agent.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          application.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || application.status === filterStatus;
    const matchesType = filterType === 'All' || application.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Extract unique statuses and types
  const statuses = ['All', ...Array.from(new Set(applicationData.map(app => app.status)))];
  const types = ['All', ...Array.from(new Set(applicationData.map(app => app.type)))];

  // Count applications by status
  const pendingCount = applicationData.filter(app => app.status === 'Pending').length;
  const approvedCount = applicationData.filter(app => app.status === 'Approved').length;
  const rejectedCount = applicationData.filter(app => app.status === 'Rejected').length;

  return (
    <Layout>
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#00205C]">Applications</h1>
          <Button className="bg-[#00205C] hover:bg-[#001845]">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Clock className="h-6 w-6 text-[#00205C]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Applications</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Approved Applications</p>
              <p className="text-2xl font-bold">{approvedCount}</p>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <XCircle className="h-6 w-6 text-[#E5241B]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rejected Applications</p>
              <p className="text-2xl font-bold">{rejectedCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
          <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h2 className="text-lg font-medium">Application Submissions</h2>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search applications..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 h-4 w-4" />
                <select 
                  className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00205C]"
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <select 
                  className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00205C]"
                  value={filterType}
                  onChange={(e) => {
                    setFilterType(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {types.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Agent Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.agent}</TableCell>
                    <TableCell>{application.type}</TableCell>
                    <TableCell>{new Date(application.submissionDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-gray-500" />
                        {application.documents}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          application.status === 'Approved' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : application.status === 'Rejected'
                              ? 'bg-red-100 text-red-800 hover:bg-red-100'
                              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        }
                      >
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-[#00205C] text-[#00205C] hover:bg-[#00205C] hover:text-white"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No applications found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex flex-1 justify-between sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, filteredData.length)}
                    </span> of{' '}
                    <span className="font-medium">{filteredData.length}</span> applications
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-md"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className={currentPage === page ? "bg-[#00205C]" : ""}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-md"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Applications;
