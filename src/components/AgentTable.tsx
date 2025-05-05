
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Agent } from '../utils/mockData';

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

  const filteredAgents = agents.filter((agent) => {
    // Apply search filter
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.mobile.includes(searchTerm);
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-eon-success';
      case 'pending':
        return 'bg-yellow-100 text-eon-pending';
      case 'rejected':
        return 'bg-red-100 text-eon-error';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search agents..."
              className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-eon-blue focus:border-eon-blue text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              className="text-sm rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-eon-blue focus:border-eon-blue"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3 bg-gray-50">Agent ID</th>
              <th className="px-6 py-3 bg-gray-50">Name</th>
              <th className="px-6 py-3 bg-gray-50">Mobile</th>
              <th className="px-6 py-3 bg-gray-50">Status</th>
              <th className="px-6 py-3 bg-gray-50">Region</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <tr 
                  key={agent.id}
                  onClick={() => onSelectAgent(agent)}
                  className={`cursor-pointer hover:bg-eon-light-gray ${
                    selectedAgentId === agent.id ? 'bg-eon-light-blue' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{agent.agentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(agent.status)}`}>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.region}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No agents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentTable;
