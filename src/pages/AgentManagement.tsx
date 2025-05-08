
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AgentTable from '../components/AgentTable';
import AgentDetails from '../components/AgentDetails';
import { mockAgents, Agent } from '../utils/mockData';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AgentManagement: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  useEffect(() => {
    if (agentId) {
      const agent = mockAgents.find(a => a.id === agentId);
      if (agent) {
        setSelectedAgent(agent);
      }
    } else {
      setSelectedAgent(null);
    }
  }, [agentId]);

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    navigate(`/agents/${agent.id}`);
  };

  const handleBackToList = () => {
    setSelectedAgent(null);
    navigate('/agents');
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#00205C] dark:text-white">Agent Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage, monitor and onboard agents</p>
      </div>

      {agentId && selectedAgent ? (
        <div className="space-y-6">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleBackToList}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Agent List
          </Button>
          <AgentDetails agent={selectedAgent} />
        </div>
      ) : (
        <AgentTable 
          agents={mockAgents}
          onSelectAgent={handleSelectAgent}
          selectedAgentId={selectedAgent?.id || null}
        />
      )}
    </Layout>
  );
};

export default AgentManagement;
