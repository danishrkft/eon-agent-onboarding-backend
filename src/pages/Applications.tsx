
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter, Eye, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import ApplicationForm from '../components/ApplicationForm';

const Applications: React.FC = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Sample applications data
  const applications = [
    {
      id: 'APP001',
      agentName: 'Ahmad Faizal',
      email: 'ahmad.faizal@eon.my',
      phone: '+60123456789',
      status: 'New Application',
      submittedDate: '2025-01-15',
      lastUpdated: '2025-01-15',
      branch: 'Kuala Lumpur',
      position: 'Senior Agent'
    },
    {
      id: 'APP002',
      agentName: 'Nur Hidayah',
      email: 'nur.hidayah@eon.my',
      phone: '+60123456790',
      status: 'Approved',
      submittedDate: '2025-01-10',
      lastUpdated: '2025-01-20',
      branch: 'Penang',
      position: 'Agent'
    },
    {
      id: 'APP003',
      agentName: 'Tan Wei Ming',
      email: 'wei.ming@eon.my',
      phone: '+60123456791',
      status: 'Training',
      submittedDate: '2025-01-05',
      lastUpdated: '2025-01-25',
      branch: 'Johor Bahru',
      position: 'Agent'
    },
    {
      id: 'APP004',
      agentName: 'Rajesh Kumar',
      email: 'rajesh.kumar@eon.my',
      phone: '+60123456792',
      status: 'Verified',
      submittedDate: '2024-12-20',
      lastUpdated: '2025-01-30',
      branch: 'Kuala Lumpur',
      position: 'Senior Agent'
    },
    {
      id: 'APP005',
      agentName: 'Lim Chee Keong',
      email: 'chee.keong@eon.my',
      phone: '+60123456793',
      status: 'Rejected',
      submittedDate: '2025-01-12',
      lastUpdated: '2025-01-18',
      branch: 'Ipoh',
      position: 'Agent'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'New Application': { color: 'bg-blue-100 text-blue-800', icon: FileText },
      'Approved': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Training': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Verified': { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
      'Rejected': { color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['New Application'];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#00205C] dark:text-white">Applications Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Review and manage agent applications</p>
          </div>
          <Button 
            className="bg-[#00205C] hover:bg-[#001A45]"
            onClick={() => setShowApplicationForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Button>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Applications</CardTitle>
            <CardDescription>Search and filter applications by various criteria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input placeholder="Search by name, email, or application ID..." className="pl-9" />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applications List</CardTitle>
            <CardDescription>All agent applications and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.id}</TableCell>
                      <TableCell>{application.agentName}</TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell>{application.phone}</TableCell>
                      <TableCell>{application.branch}</TableCell>
                      <TableCell>{application.position}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell>{new Date(application.submittedDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(application.lastUpdated).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <ApplicationForm 
          isOpen={showApplicationForm}
          onClose={() => setShowApplicationForm(false)}
        />
      </div>
    </Layout>
  );
};

export default Applications;
