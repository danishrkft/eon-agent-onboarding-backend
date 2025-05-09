
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileText, FileCheck, Calendar, UserCheck, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ApplicationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: any;
}

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({ open, onOpenChange, application }) => {
  if (!application) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Rejected':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    }
  };

  const documents = [
    { name: 'Identity Card.pdf', type: 'PDF', size: '2.3 MB', uploaded: '2025-04-01', status: 'Verified' },
    { name: 'Driver License.jpg', type: 'JPG', size: '1.5 MB', uploaded: '2025-04-01', status: 'Verified' },
    { name: 'Bank Statement.pdf', type: 'PDF', size: '3.8 MB', uploaded: '2025-04-01', status: 'Pending' },
    { name: 'Resume.docx', type: 'DOCX', size: '1.2 MB', uploaded: '2025-04-01', status: 'Verified' }
  ];
  
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'DOCX':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'JPG':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>
            View the details for application {application.id}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center gap-4 border-b pb-4">
            <div>
              <Badge className={getStatusColor(application.status)}>
                {application.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="mr-2 h-4 w-4" />
              Submitted on {new Date(application.submissionDate).toLocaleDateString()}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Briefcase className="mr-2 h-4 w-4" />
              {application.campaign}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <UserCheck className="mr-2 h-4 w-4" />
              {application.type}
            </div>
          </div>
          
          <Tabs defaultValue="summary">
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="documents">Documents ({application.documents})</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Applicant Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{application.agent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{application.agent.replace(/\s/g, '.').toLowerCase()}@email.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+6012-{Math.floor(1000000 + Math.random() * 9000000)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">NRIC</p>
                    <p className="font-medium">{Math.floor(800000 + Math.random() * 100000)}-{Math.floor(10 + Math.random() * 90)}-{Math.floor(1000 + Math.random() * 9000)}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Application Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium">{application.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Campaign</p>
                    <p className="font-medium">{application.campaign}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Submission Date</p>
                    <p className="font-medium">{new Date(application.submissionDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className={getStatusColor(application.status)}>
                      {application.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                {application.status === 'Pending' && (
                  <>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                      Reject
                    </Button>
                    <Button className="bg-[#00205C] hover:bg-[#001A45]">
                      Approve
                    </Button>
                  </>
                )}
                {application.status === 'Rejected' && (
                  <Button className="bg-[#00205C] hover:bg-[#001A45]">
                    Reconsider
                  </Button>
                )}
                {application.status === 'Approved' && (
                  <Button variant="outline" className="border-[#00205C] text-[#00205C]">
                    View Certificate
                  </Button>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="documents">
              <div className="space-y-4">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map((doc, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center">
                              {getDocumentIcon(doc.type)}
                              <span className="ml-2">{doc.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(doc.uploaded).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge className={doc.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {doc.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Download</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-[#00205C] hover:bg-[#001A45]">
                    <FileCheck className="mr-2 h-4 w-4" />
                    Verify All Documents
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="relative mr-3">
                      <div className="h-8 w-8 rounded-full bg-[#00205C] flex items-center justify-center text-white">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="absolute top-8 left-1/2 -ml-px h-full w-0.5 bg-gray-200"></span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <p className="text-sm font-medium text-gray-900">Application submitted</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(application.submissionDate).toLocaleDateString()} at {new Date(application.submissionDate).toLocaleTimeString()}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="relative mr-3">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <span className="absolute top-8 left-1/2 -ml-px h-full w-0.5 bg-gray-200"></span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <p className="text-sm font-medium text-gray-900">Documents reviewed</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(new Date(application.submissionDate).getTime() + 86400000).toLocaleDateString()} at {new Date(new Date(application.submissionDate).getTime() + 86400000).toLocaleTimeString()}
                      </p>
                    </div>
                  </li>
                  {application.status !== 'Pending' && (
                    <li className="flex items-start">
                      <div className="relative mr-3">
                        <div className={`h-8 w-8 rounded-full ${application.status === 'Approved' ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center text-white`}>
                          {application.status === 'Approved' ? <UserCheck className="h-4 w-4" /> : <Trash className="h-4 w-4" />}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5">
                        <p className="text-sm font-medium text-gray-900">Application {application.status.toLowerCase()}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(new Date(application.submissionDate).getTime() + 172800000).toLocaleDateString()} at {new Date(new Date(application.submissionDate).getTime() + 172800000).toLocaleTimeString()}
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
