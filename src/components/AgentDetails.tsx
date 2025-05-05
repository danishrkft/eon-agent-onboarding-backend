
import React from 'react';
import { Agent } from '../utils/mockData';
import { File, Check, X, Edit } from 'lucide-react';

type AgentDetailsProps = {
  agent: Agent | null;
};

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent }) => {
  if (!agent) {
    return (
      <div className="bg-white rounded-lg shadow-card p-6 flex items-center justify-center h-full">
        <p className="text-gray-500">Select an agent to view details</p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const renderSectionHeader = (title: string) => (
    <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
  );

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">{agent.name}</h2>
          <p className="text-sm text-gray-500">{agent.agentId}</p>
        </div>
        <div className="flex space-x-2">
          {agent.status === 'pending' && (
            <>
              <button className="bg-eon-success text-white px-3 py-1 rounded-md text-sm flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Approve
              </button>
              <button className="bg-eon-error text-white px-3 py-1 rounded-md text-sm flex items-center">
                <X className="w-4 h-4 mr-1" />
                Reject
              </button>
            </>
          )}
          <button className="bg-eon-blue text-white px-3 py-1 rounded-md text-sm flex items-center">
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </button>
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[calc(100vh-240px)]">
        {/* Personal Info */}
        <div>
          {renderSectionHeader('Personal Information')}
          <div className="bg-gray-50 rounded-md p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Full Name:</p>
              <p className="text-sm">{agent.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">NRIC:</p>
              <p className="text-sm">{agent.nric}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Date of Birth:</p>
              <p className="text-sm">{new Date(agent.dob).toLocaleDateString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Mobile:</p>
              <p className="text-sm">{agent.mobile}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Email:</p>
              <p className="text-sm">{agent.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Address:</p>
              <p className="text-sm">{agent.address}</p>
            </div>
          </div>
        </div>

        {/* Bank Info */}
        <div>
          {renderSectionHeader('Bank Information')}
          <div className="bg-gray-50 rounded-md p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Bank Name:</p>
              <p className="text-sm">{agent.bankName}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Account Number:</p>
              <p className="text-sm">{agent.accountNumber}</p>
            </div>
          </div>

          {renderSectionHeader('Regulatory Information')}
          <div className="bg-gray-50 rounded-md p-4 space-y-3 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">KWSP Number:</p>
              <p className="text-sm">{agent.kwspNumber}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Tax ID:</p>
              <p className="text-sm">{agent.taxId}</p>
            </div>
          </div>
        </div>

        {/* Agent Metadata */}
        <div>
          {renderSectionHeader('Agent Metadata')}
          <div className="bg-gray-50 rounded-md p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Status:</p>
              <p className="text-sm capitalize">{agent.status}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Join Date:</p>
              <p className="text-sm">{new Date(agent.joinDate).toLocaleDateString()}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Sponsor:</p>
              <p className="text-sm">{agent.sponsor}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Commission Tier:</p>
              <p className="text-sm">{agent.commissionTier}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Region:</p>
              <p className="text-sm">{agent.region}</p>
            </div>
          </div>
        </div>

        {/* Sales & Commission */}
        <div>
          {renderSectionHeader('Sales & Commission')}
          <div className="bg-gray-50 rounded-md p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Total YTD Sales:</p>
              <p className="text-sm font-medium">{formatCurrency(agent.ytdSales)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">YTD Commission:</p>
              <p className="text-sm font-medium">{formatCurrency(agent.ytdCommission)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Last Payout:</p>
              <p className="text-sm">{agent.lastPayout ? formatCurrency(agent.lastPayout) : 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Last Payout Date:</p>
              <p className="text-sm">{agent.lastPayoutDate ? new Date(agent.lastPayoutDate).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-xs text-gray-500">Next Payment:</p>
              <p className="text-sm">{agent.nextPaymentDate ? new Date(agent.nextPaymentDate).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Training */}
        <div>
          {renderSectionHeader('Training')}
          <div className="bg-gray-50 rounded-md p-4">
            <ul className="space-y-2">
              {agent.trainingModules.map((module, index) => (
                <li key={index} className="flex items-start justify-between">
                  <span className="text-sm">{module.name}</span>
                  {module.completed ? (
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-eon-success mr-1" />
                      <span className="text-xs text-gray-500">{new Date(module.date).toLocaleDateString()}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">Pending</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Documents */}
        <div>
          {renderSectionHeader('Supporting Documents')}
          <div className="bg-gray-50 rounded-md p-4">
            <ul className="flex flex-wrap gap-3">
              {agent.documents.map((doc, index) => (
                <li key={index}>
                  <a
                    href={doc.url}
                    className="flex flex-col items-center justify-center p-3 bg-white rounded-md border border-gray-200 hover:border-eon-blue transition-colors"
                  >
                    <File className="h-8 w-8 text-eon-blue mb-1" />
                    <span className="text-xs font-medium">{doc.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
