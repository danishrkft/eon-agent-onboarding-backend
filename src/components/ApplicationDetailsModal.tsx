
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, FileCheck, User, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

// Sample application document type
type ApplicationDocument = {
  id: string;
  name: string;
  type: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  uploadedDate: string;
};

// Sample application type
type Application = {
  id: string;
  agent: string;
  type: string;
  submissionDate: string;
  status: string;
  documents: number;
  description?: string;
  email?: string;
  phone?: string;
  comments?: string[];
  documentList?: ApplicationDocument[];
};

type ApplicationDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: Application | null;
};

const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  open,
  onOpenChange,
  application
}) => {
  if (!application) return null;

  // Sample document list (in real app, this would come from the application data)
  const sampleDocuments: ApplicationDocument[] = application.documentList || [
    {
      id: '1',
      name: 'Identity Card',
      type: 'PDF',
      status: 'Verified',
      uploadedDate: '2025-04-02'
    },
    {
      id: '2',
      name: 'Professional License',
      type: 'PDF',
      status: 'Verified',
      uploadedDate: '2025-04-02'
    },
    {
      id: '3',
      name: 'Bank Statement',
      type: 'PDF',
      status: 'Pending',
      uploadedDate: '2025-04-02'
    },
    {
      id: '4',
      name: 'Address Proof',
      type: 'JPG',
      status: 'Rejected',
      uploadedDate: '2025-04-03'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-[#E5241B]" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#00205C]">
            <FileText className="h-5 w-5" />
            Application Details: {application.id}
          </DialogTitle>
          <DialogDescription>
            Submitted on {new Date(application.submissionDate).toLocaleDateString()} - 
            <span className={
              application.status === 'Approved' 
                ? 'text-green-600 ml-1' 
                : application.status === 'Rejected'
                  ? 'text-[#E5241B] ml-1'
                  : 'text-yellow-600 ml-1'
            }>
              {application.status}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Application Information</h3>
              <div className="bg-gray-50 rounded-md p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="text-sm font-medium">{application.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(application.status)}
                    <span className="text-sm font-medium">{application.status}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Submission Date:</span>
                  <span className="text-sm font-medium">{new Date(application.submissionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Documents:</span>
                  <span className="text-sm font-medium">{application.documents}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Agent Information</h3>
              <div className="bg-gray-50 rounded-md p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-[#00205C] text-white p-2 rounded-full">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{application.agent}</p>
                    <p className="text-sm text-gray-500">{application.email || "email@example.com"}</p>
                    <p className="text-sm text-gray-500">{application.phone || "+1 (555) 123-4567"}</p>
                  </div>
                </div>
              </div>
            </div>

            {application.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Description</h3>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm">{application.description}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Documents</h3>
              <div className="bg-gray-50 rounded-md p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <FileCheck className="h-4 w-4 text-[#00205C] mr-2" />
                            {doc.name}
                          </div>
                        </TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{getDocumentStatusBadge(doc.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {application.comments && application.comments.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Comments</h3>
                <div className="bg-gray-50 rounded-md p-4 space-y-3">
                  {application.comments.map((comment, index) => (
                    <div key={index} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                      <p className="text-sm">{comment}</p>
                      <p className="text-xs text-gray-500 mt-1">Added on {new Date().toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          {application.status === 'Pending' && (
            <>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button variant="outline" className="border-[#E5241B] text-[#E5241B] hover:bg-red-50">
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
