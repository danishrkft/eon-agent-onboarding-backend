
import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Agent } from '../utils/mockData';
import AddAgentModal from './AddAgentModal';

type AgentTableProps = {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  selectedAgentId: string | null;
};

const AgentTable: React.FC<AgentTableProps> = ({
  agents,
  onSelectAgent,
  selectedAgentId,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [addAgentModalOpen, setAddAgentModalOpen] = useState(false);

  const filteredAgents = agents.filter((agent) => {
    // Apply search filter
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.mobile.includes(searchTerm) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.nric.includes(searchTerm);
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-eon-success dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-eon-pending dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-eon-error dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const handleAddAgent = (data: any) => {
    console.log('New agent data:', data);
    // This would typically make an API call to add the agent
    // For now, we just log the data
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search agents..."
              className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-eon-blue dark:bg-gray-700 dark:text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <select
              className="text-sm rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-eon-blue"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <button
            onClick={() => setAddAgentModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-eon-blue text-white rounded-md hover:bg-eon-blue/90 text-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Add Agent</span>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">#</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Agent ID</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Full Name</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Email Address</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">NRIC</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Mobile</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">DOB</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Bank Account #</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Issuing Bank</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">District, State</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Gender</th>
              <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent, index) => (
                <tr 
                  key={agent.id}
                  onClick={() => onSelectAgent(agent)}
                  className={`cursor-pointer hover:bg-eon-light-gray dark:hover:bg-gray-700 ${
                    selectedAgentId === agent.id ? 'bg-eon-light-blue dark:bg-eon-blue/10' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{agent.agentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.nric}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(agent.dob).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.accountNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.bankName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.gender || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(agent.status)}`}>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  No agents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddAgentModal 
        isOpen={addAgentModalOpen}
        onClose={() => setAddAgentModalOpen(false)}
        onSubmit={handleAddAgent}
      />
    </div>
  );
};

export default AgentTable;
