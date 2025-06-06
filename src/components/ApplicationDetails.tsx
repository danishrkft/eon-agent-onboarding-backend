
import React from 'react';
import { ArrowLeft, Download, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusBreadcrumbs from './StatusBreadcrumbs';

interface ApplicationDetailsProps {
  application: any;
  onBack: () => void;
}

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({ application, onBack }) => {
  // Sample documents
  const documents = [
    { name: 'NRIC', type: 'pdf', size: '2.4 MB' },
    { name: 'Agent Agreement', type: 'pdf', size: '1.8 MB' },
    { name: 'NDA', type: 'pdf', size: '0.9 MB' },
    { name: 'Proof of Address', type: 'pdf', size: '1.2 MB' },
  ];

  // Sample activity log
  const activityLog = [
    { date: '2025-04-28', time: '09:30 AM', action: 'Application submitted', user: 'System' },
    { date: '2025-04-28', time: '10:15 AM', action: 'Documents uploaded', user: 'System' },
    { date: '2025-04-28', time: '11:45 AM', action: 'Application viewed', user: 'Admin' },
    { date: '2025-04-29', time: '09:10 AM', action: 'Application review started', user: 'Ahmad Faizal' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: any = {
      'New Application': { color: 'bg-blue-100 text-blue-800', icon: FileText },
      'Approved': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Training': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Verified': { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
      'Rejected': { color: 'bg-red-100 text-red-800', icon: XCircle }
    };

    const config = statusConfig[status] || statusConfig['New Application'];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  // Sample application status flow
  const applicationStatuses = [
    { 
      label: "New Application", 
      date: "2025-04-28", 
      time: "09:30AM", 
      completed: true, 
      active: false 
    },
    { 
      label: "Document Review", 
      date: application.status !== "New Application" ? "2025-04-29" : undefined, 
      time: application.status !== "New Application" ? "11:45AM" : undefined, 
      completed: application.status !== "New Application", 
      active: application.status === "New Application" 
    },
    { 
      label: "Background Check", 
      date: application.status === "Approved" || application.status === "Training" || application.status === "Verified" ? "2025-05-01" : undefined, 
      time: application.status === "Approved" || application.status === "Training" || application.status === "Verified" ? "10:00AM" : undefined, 
      completed: application.status === "Approved" || application.status === "Training" || application.status === "Verified", 
      active: false 
    },
    { 
      label: "Approval", 
      date: application.status === "Approved" || application.status === "Training" || application.status === "Verified" ? "2025-05-02" : undefined, 
      time: application.status === "Approved" || application.status === "Training" || application.status === "Verified" ? "02:15PM" : undefined, 
      completed: application.status === "Approved" || application.status === "Training" || application.status === "Verified", 
      active: false 
    }
  ];

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Applications
      </Button>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl font-bold text-[#00205C]">
                Application {application.id}
              </CardTitle>
              <CardDescription className="mt-1">
                Submitted on {new Date(application.submittedDate).toLocaleDateString()} | Last updated on {new Date(application.lastUpdated).toLocaleDateString()}
              </CardDescription>
            </div>
            <div>
              {getStatusBadge(application.status)}
            </div>
          </CardHeader>
        </Card>

        <div className="bg-white rounded-lg shadow p-6">
          <StatusBreadcrumbs statuses={applicationStatuses} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Applicant Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{application.agentName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium">{application.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{application.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">{application.position}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-medium">{application.branch}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.size} • {doc.type.toUpperCase()}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLog.map((log, index) => (
                <div key={index} className="border-l-2 border-[#00205C] pl-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{log.action}</span>
                    <span className="text-sm text-gray-500">
                      {log.date} at {log.time} by {log.user}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Reject Application</Button>
          <Button className="bg-[#00205C]">Approve Application</Button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
