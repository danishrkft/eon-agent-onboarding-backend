
import React, { useState } from 'react';
import { Users, UserCheck, Clock, Calendar, DollarSign, Timer, TrendingUp, Target, Shield } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Cell, Pie, PieChart } from 'recharts';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import { dashboardData } from '../utils/mockData';

const Dashboard = () => {
  const COLORS = ['#00205C', '#315195', '#6281C9', '#94A3FF', '#D3E4FD', '#E5241B'];
  const [yearFilter, setYearFilter] = useState('2024');
  const [monthFilter, setMonthFilter] = useState('all');

  // Additional mock data for new charts
  const conversionRateData = [
    { month: 'Jan', rate: 9.4 },
    { month: 'Feb', rate: 10.1 },
    { month: 'Mar', rate: 12.5 },
    { month: 'Apr', rate: 14.2 },
    { month: 'May', rate: 13.8 },
    { month: 'Jun', rate: 15.5 },
  ];

  const agentPerformanceData = [
    { month: 'Jan', newAgents: 18, activatedAgents: 12, convertedLeads: 32 },
    { month: 'Feb', newAgents: 22, activatedAgents: 15, convertedLeads: 38 },
    { month: 'Mar', newAgents: 30, activatedAgents: 22, convertedLeads: 45 },
    { month: 'Apr', newAgents: 25, activatedAgents: 20, convertedLeads: 50 },
    { month: 'May', newAgents: 33, activatedAgents: 28, convertedLeads: 55 },
    { month: 'Jun', newAgents: 42, activatedAgents: 35, convertedLeads: 65 },
  ];

  // Filter monthly registrations based on selected year and month
  const filteredMonthlyRegistrations = dashboardData.monthlyRegistrations.filter(item => {
    const [monthName, yearStr] = item.month.split(' ');
    const itemYear = yearStr;
    const matchesYear = yearFilter === 'all' || itemYear === yearFilter;
    const matchesMonth = monthFilter === 'all' || monthName === monthFilter;
    return matchesYear && matchesMonth;
  });

  // Available years and months for filtering
  const availableYears = ['all', ...new Set(dashboardData.monthlyRegistrations.map(item => item.month.split(' ')[1]))];
  const availableMonths = ['all', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#00205C]">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of agent performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardCard 
          title="Total Registered Agents"
          value={dashboardData.totalAgents}
          icon={<Users className="h-6 w-6 text-[#00205C]" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <DashboardCard 
          title="Active Agents"
          value={dashboardData.activeAgents}
          icon={<UserCheck className="h-6 w-6 text-[#00205C]" />}
          trend={{ value: 3.1, isPositive: true }}
        />
        <DashboardCard 
          title="Pending Approvals"
          value={dashboardData.pendingApprovals}
          icon={<Clock className="h-6 w-6 text-[#00205C]" />}
          trend={{ value: 2.5, isPositive: false }}
        />
        <DashboardCard 
          title="Approved This Month"
          value={dashboardData.approvedThisMonth}
          icon={<Calendar className="h-6 w-6 text-[#00205C]" />}
          trend={{ value: 12.4, isPositive: true }}
        />
        <DashboardCard 
          title="YTD Commission Paid"
          value={`RM ${dashboardData.ytdCommissionPaid.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-[#00205C]" />}
          trend={{ value: 7.8, isPositive: true }}
        />
        <DashboardCard 
          title="Avg. Approval Time"
          value={dashboardData.avgApprovalTime}
          icon={<Timer className="h-6 w-6 text-[#00205C]" />}
          trend={{ value: 8.5, isPositive: true }}
        />
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Registrations Chart with Filters */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Agent Registrations (Last 6 Months)</h2>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <select
                className="text-sm rounded-md border border-gray-300 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-[#00205C]"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <select
                className="text-sm rounded-md border border-gray-300 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-[#00205C]"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                {availableMonths.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredMonthlyRegistrations.length > 0 ? filteredMonthlyRegistrations : [{ month: 'No Data', count: 0 }]}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00205C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region Distribution Pie Chart */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Agent Distribution by Region</h2>
          <div className="h-64 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.regionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {dashboardData.regionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} agents`, props.payload.region]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Chart 1: Conversion Rate Trend */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Lead Conversion Rate</h2>
            <div className="bg-blue-100 text-[#00205C] p-2 rounded-md">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 20]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#00205C" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#00205C', strokeWidth: 2, stroke: 'white' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Chart 2: Agent Performance Metrics */}
        <div className="bg-white rounded-lg shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Agent Performance Metrics</h2>
            <div className="bg-red-100 text-[#E5241B] p-2 rounded-md">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={agentPerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="newAgents" name="New Agents" fill="#00205C" stackId="a" />
                <Bar dataKey="activatedAgents" name="Activated Agents" fill="#315195" stackId="a" />
                <Bar dataKey="convertedLeads" name="Converted Leads" fill="#E5241B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recently Approved Agents Table with Pagination */}
      <div className="bg-white rounded-lg shadow-card p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Recently Approved Agents</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 bg-gray-50">#</th>
                <th className="px-6 py-3 bg-gray-50">Agent ID</th>
                <th className="px-6 py-3 bg-gray-50">Name</th>
                <th className="px-6 py-3 bg-gray-50">Email</th>
                <th className="px-6 py-3 bg-gray-50">Region</th>
                <th className="px-6 py-3 bg-gray-50">Join Date</th>
                <th className="px-6 py-3 bg-gray-50">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboardData.recentlyApproved.slice(0, 10).map((agent, index) => (
                <tr key={agent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{agent.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(agent.joinDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
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

export default Dashboard;
