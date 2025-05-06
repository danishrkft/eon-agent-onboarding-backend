
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AgentTable from '../components/AgentTable';
import AgentDetails from '../components/AgentDetails';
import { mockAgents, Agent } from '../utils/mockData';

const AgentManagement = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-eon-blue dark:text-white">Agent Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage, monitor and onboard agents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AgentTable 
            agents={mockAgents}
            onSelectAgent={handleSelectAgent}
            selectedAgentId={selectedAgent?.id || null}
          />
        </div>
        <div>
          <AgentDetails agent={selectedAgent} />
        </div>
      </div>
    </Layout>
  );
};

export default AgentManagement;
