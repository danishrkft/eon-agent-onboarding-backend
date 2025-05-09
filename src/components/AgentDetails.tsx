
import React from 'react';
import { Agent } from '../utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <StatusBreadcrumbs statuses={agentStatuses} />
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
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
          <div className="text-center py-10 text-gray-500">
            <p>Agent's submitted documents will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
          <div className="text-center py-10 text-gray-500">
            <p>Agent's activity history will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="commissions">
          <div className="text-center py-10 text-gray-500">
            <p>Agent's commission details will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDetails;
