
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { commissionData } from '../utils/mockData';
import { Calendar, Filter, Download, CreditCard, Search } from 'lucide-react';

const CommissionPayout = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-eon-success';
      case 'pending':
        return 'bg-yellow-100 text-eon-pending';
      case 'failed':
        return 'bg-red-100 text-eon-error';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredPayouts = commissionData.payouts.filter((payout) => {
    // Apply search filter
    const matchesSearch =
      payout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.agentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = selectedStatus === 'all' || payout.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Commission Payout</h1>
        <p className="text-gray-600">Manage agent commission payments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm mb-1">Total Paid This Month</p>
              <h3 className="text-2xl font-bold">{formatCurrency(commissionData.totalPaidThisMonth)}</h3>
            </div>
            <div className="bg-green-100 text-eon-success p-3 rounded-lg">
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
            <div className="bg-yellow-100 text-eon-pending p-3 rounded-lg">
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
                className="pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-eon-blue focus:border-eon-blue text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                className="text-sm rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-eon-blue focus:border-eon-blue"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="bg-eon-blue text-white px-3 py-2 rounded-md text-sm flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Trigger Payout
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm flex items-center">
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
              {filteredPayouts.map((payout) => (
                <tr key={payout.agentId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{payout.agentId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{payout.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{payout.tier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{formatCurrency(payout.lastAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(payout.lastDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(payout.nextDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{formatCurrency(payout.ytdTotal)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(payout.status)}`}>
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default CommissionPayout;
