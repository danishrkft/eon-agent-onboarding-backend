import React, { useState } from 'react';
import Layout from '../components/Layout';
import { commissionData } from '../utils/mockData';
import { Calendar, Filter, Download, CreditCard, Search } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';
import FilterDropdowns from '../components/FilterDropdowns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import StatusBreadcrumbs from '../components/StatusBreadcrumbs';
import TriggerPayoutModal from '../components/TriggerPayoutModal';

const CommissionPayout = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [triggerPayoutModalOpen, setTriggerPayoutModalOpen] = useState(false);
  const itemsPerPage = 10;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800';
      case 'Pending Verification':
        return 'bg-purple-100 text-purple-800';
      case 'Verified':
        return 'bg-indigo-100 text-indigo-800';
      case 'Pending Payment':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Updated payout data with new statuses
  const updatedPayouts = commissionData.payouts.map(payout => ({
    ...payout,
    status: ['Submitted', 'Pending Verification', 'Verified', 'Pending Payment', 'Paid', 'Rejected'][Math.floor(Math.random() * 6)],
    agingDays: Math.floor(Math.random() * 30) + 1
  }));
  const filteredPayouts = updatedPayouts.filter(payout => {
    // Apply search filter
    const matchesSearch = payout.name.toLowerCase().includes(searchTerm.toLowerCase()) || payout.agentId.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply status filter
    const matchesStatus = selectedStatus === 'all' || payout.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayouts = filteredPayouts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPayouts.length / itemsPerPage);

  const handleAgentClick = (agent: any) => {
    setSelectedAgent(agent);
    setDetailsModalOpen(true);
  };

  // Generate status flow for the selected agent
  const getAgentStatusFlow = (agent: any) => {
    // Status values: Submitted, Pending Verification, Verified, Pending Payment, Paid, Rejected
    const allStatuses = ['Submitted', 'Pending Verification', 'Verified', 'Pending Payment', 'Paid'];
    const currentStatusIndex = allStatuses.findIndex(s => s === agent.status);
    const statuses = allStatuses.map((status, index) => {
      // If rejected, only show Submitted and Rejected
      if (agent.status === 'Rejected' && status !== 'Submitted' && status !== 'Rejected') {
        return null;
      }
      const completed = index <= currentStatusIndex && agent.status !== 'Rejected';
      const active = index === currentStatusIndex;

      // Generate random dates and times for statuses that are completed or active
      const isRelevant = completed || active;
      const daysAgo = index * 2; // Submitted is 8 days ago, Verified is 4 days ago, etc.
      const date = isRelevant ? new Date(new Date().setDate(new Date().getDate() - daysAgo)) : undefined;
      return {
        label: status,
        date: date ? date.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }) : undefined,
        time: date ? date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }) : undefined,
        completed,
        active
      };
    }).filter(Boolean);

    // If status is rejected, add the Rejected status at the end
    if (agent.status === 'Rejected') {
      statuses.push({
        label: 'Rejected',
        date: new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        completed: true,
        active: true
      });
    }
    return statuses;
  };

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00205C]">Commission Payout</h1>
          <p className="text-gray-600">Manage agent commission payments</p>
        </div>
        <FilterDropdowns />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Paid This Month</p>
              <h3 className="text-2xl font-bold">{formatCurrency(commissionData.totalPaidThisMonth)}</h3>
            </div>
            <div className="bg-green-100 text-green-600 p-3 rounded-lg">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Pending</p>
              <h3 className="text-2xl font-bold">{formatCurrency(commissionData.totalPending)}</h3>
            </div>
            <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
              <Calendar className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-card p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search by name or ID..." 
                className="pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00205C] focus:border-[#00205C] text-sm" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select 
                className="text-sm rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#00205C] focus:border-[#00205C]" 
                value={selectedStatus} 
                onChange={e => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="pending verification">Pending Verification</option>
                <option value="verified">Verified</option>
                <option value="pending payment">Pending Payment</option>
                <option value="paid">Paid</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setTriggerPayoutModalOpen(true)}
              className="text-white px-3 py-2 rounded-md text-sm flex items-center bg-blue-600 hover:bg-blue-500"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Trigger Payout
            </button>
            <button className="px-3 py-2 rounded-md text-sm flex items-center text-white bg-emerald-600 hover:bg-emerald-500">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Payout Table */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 bg-gray-50">Agent ID</th>
                <th className="px-6 py-3 bg-gray-50">Name</th>
                <th className="px-6 py-3 bg-gray-50">Commission Tier</th>
                <th className="px-6 py-3 bg-gray-50">Last Payout</th>
                <th className="px-6 py-3 bg-gray-50">Last Date</th>
                <th className="px-6 py-3 bg-gray-50">Next Payment</th>
                <th className="px-6 py-3 bg-gray-50">YTD Total</th>
                <th className="px-6 py-3 bg-gray-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentPayouts.map(payout => (
                <tr key={payout.agentId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleAgentClick(payout)} 
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {payout.agentId}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{payout.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{payout.tier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{formatCurrency(payout.lastAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(payout.lastDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(payout.nextDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{formatCurrency(payout.ytdTotal)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(payout.status)}`}>
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredPayouts.length > 0 && (
          <div className="py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  // Show pagination numbers based on current page
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                    if (i === 4) pageNumber = totalPages;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={pageNumber === currentPage} 
                        onClick={() => setCurrentPage(pageNumber)} 
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} 
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Commission Details Modal */}
      <Dialog open={detailsModalOpen} onOpenChange={setDetailsModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Commission Details</DialogTitle>
            <DialogDescription>
              Details for agent {selectedAgent?.agentId}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAgent && (
            <div className="space-y-6 pt-4">
              <StatusBreadcrumbs 
                statuses={getAgentStatusFlow(selectedAgent)} 
                showAgingPeriod={selectedAgent.status === 'Pending Payment'} 
                agingDays={selectedAgent.agingDays} 
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-500">Agent Information</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Agent ID</p>
                      <p className="font-medium">{selectedAgent.agentId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium">{selectedAgent.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Commission Tier</p>
                      <p className="font-medium">{selectedAgent.tier}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedAgent.status)}`}>
                        {selectedAgent.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-gray-500">Payment Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-500">Last Amount</p>
                      <p className="font-medium">{formatCurrency(selectedAgent.lastAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Next Payment</p>
                      <p className="font-medium">{formatCurrency(selectedAgent.lastAmount * 1.1)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Date</p>
                      <p className="font-medium">{new Date(selectedAgent.lastDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Next Date</p>
                      <p className="font-medium">{new Date(selectedAgent.nextDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-500">Payment History</h4>
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Reference</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {[...Array(4)].map((_, i) => {
                      const date = new Date();
                      date.setMonth(date.getMonth() - i);
                      const statuses = ['Paid', 'Paid', 'Paid', 'Rejected'];
                      const amounts = [selectedAgent.lastAmount, selectedAgent.lastAmount * 0.9, selectedAgent.lastAmount * 0.85, selectedAgent.lastAmount * 0.75];
                      
                      return (
                        <tr key={i}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {date.toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                            {formatCurrency(amounts[i])}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {`REF-${Math.floor(100000 + Math.random() * 900000)}`}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(statuses[i])}`}>
                              {statuses[i]}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Trigger Payout Modal */}
      <TriggerPayoutModal 
        open={triggerPayoutModalOpen} 
        onOpenChange={setTriggerPayoutModalOpen} 
      />
    </Layout>
  );
};

export default CommissionPayout;
