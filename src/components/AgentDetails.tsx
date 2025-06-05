import React from 'react';
import { Agent } from '../utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import StatusBreadcrumbs from './StatusBreadcrumbs';

interface AgentDetailsProps {
  agent: Agent;
}

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent }) => {
  // Sample agent status flow
  const agentStatuses = [
    { 
      label: "New Application", 
      date: "01/01/2025", 
      time: "09:30AM", 
      completed: true, 
      active: false 
    },
    { 
      label: "Approved", 
      date: "02/01/2025", 
      time: "11:45AM", 
      completed: true, 
      active: false 
    },
    { 
      label: "Training", 
      date: "05/01/2025", 
      time: "10:00AM", 
      completed: agent.status === "active", 
      active: agent.status === "pending" 
    },
    { 
      label: "Verified", 
      date: agent.status === "active" ? "10/01/2025" : undefined, 
      time: agent.status === "active" ? "02:15PM" : undefined, 
      completed: agent.status === "active", 
      active: false 
    }
  ];

  const sampleDocuments = [
    { name: `NRIC_${agent.name.replace(/\s+/g, '_')}`, type: 'PDF', size: '2.4 MB' },
    { name: `Agent_agreement_${agent.agentId}_${agent.name.replace(/\s+/g, '_')}`, type: 'PDF', size: '1.8 MB' },
    { name: `NDA_${agent.agentId}`, type: 'PDF', size: '0.9 MB' },
    { name: `Bank_verification_${agent.agentId}`, type: 'PDF', size: '1.2 MB' },
    { name: `Training_certificate_${agent.name.replace(/\s+/g, '_')}`, type: 'PDF', size: '3.1 MB' }
  ];

  const sampleActivities = [
    { date: '2025-06-01', time: '14:30', action: 'Application submitted', details: 'Initial application form completed' },
    { date: '2025-06-02', time: '09:15', action: 'Documents uploaded', details: 'NRIC and bank details submitted' },
    { date: '2025-06-03', time: '11:45', action: 'Application approved', details: 'Background check completed successfully' },
    { date: '2025-06-05', time: '16:20', action: 'Training assigned', details: 'Compliance training module assigned' },
    { date: '2025-06-08', time: '13:10', action: 'Training completed', details: 'Passed with 95% score' }
  ];

  const handleDownloadDocument = (documentName: string) => {
    // Simulate document download
    console.log(`Downloading ${documentName}`);
    // In a real app, this would trigger actual file download
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="w-full mb-6">
        <StatusBreadcrumbs statuses={agentStatuses} />
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-4">
          <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
          <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
          <TabsTrigger value="commissions" className="flex-1">Commissions</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-4">Agent Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Agent ID</p>
                <p className="font-medium">{agent.agentId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{agent.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{agent.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium">{agent.mobile}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">NRIC</p>
                <p className="font-medium">{agent.nric}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{new Date(agent.dob).toLocaleDateString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{agent.gender || "Not specified"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Branch</p>
                <p className="font-medium">{agent.branch || "EON AUTO MART GLENMARIE"}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Banking Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Bank</p>
                <p className="font-medium">{agent.bankName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="font-medium">{agent.accountNumber}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4">Address</h2>
            <div className="grid grid-cols-1 gap-y-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium">{agent.region}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Full Address</p>
                <p className="font-medium">123 Main Street, {agent.region}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Documents</h2>
            <div className="grid gap-4">
              {sampleDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{doc.name}.{doc.type.toLowerCase()}</p>
                    <p className="text-sm text-gray-500">{doc.type} • {doc.size}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownloadDocument(doc.name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Activity History</h2>
            <div className="space-y-4">
              {sampleActivities.map((activity, index) => (
                <div key={index} className="border-l-2 border-[#2563EB] pl-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-sm text-gray-500">
                      {activity.date} at {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="commissions">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Commission Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-500">Current Month</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Commission Earned</p>
                    <p className="font-medium">RM 2,450.00</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Paid
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-500">Year to Date</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500">Total Earned</p>
                    <p className="font-medium">RM 14,750.00</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Paid</p>
                    <p className="font-medium">RM 12,300.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDetails;
