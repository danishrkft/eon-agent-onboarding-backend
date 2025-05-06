
import React from 'react';
import { Users, UserCheck, Clock, Calendar, DollarSign, Timer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Cell, Pie, PieChart } from 'recharts';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import { dashboardData } from '../utils/mockData';

const Dashboard = () => {
  const COLORS = ['#00205C', '#315195', '#6281C9', '#94A3FF', '#D3E4FD', '#E5241B'];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-eon-blue dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's an overview of agent performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DashboardCard 
          title="Total Registered Agents"
          value={dashboardData.totalAgents}
          icon={<Users className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 5.2, isPositive: true }}
        />
        <DashboardCard 
          title="Active Agents"
          value={dashboardData.activeAgents}
          icon={<UserCheck className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 3.1, isPositive: true }}
        />
        <DashboardCard 
          title="Pending Approvals"
          value={dashboardData.pendingApprovals}
          icon={<Clock className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 2.5, isPositive: false }}
        />
        <DashboardCard 
          title="Approved This Month"
          value={dashboardData.approvedThisMonth}
          icon={<Calendar className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 12.4, isPositive: true }}
        />
        <DashboardCard 
          title="YTD Commission Paid"
          value={`RM ${dashboardData.ytdCommissionPaid.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 7.8, isPositive: true }}
        />
        <DashboardCard 
          title="Avg. Approval Time"
          value={dashboardData.avgApprovalTime}
          icon={<Timer className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 8.5, isPositive: true }}
        />
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Registrations Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Agent Registrations (Last 6 Months)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.monthlyRegistrations}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#00205C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Region Distribution Pie Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Agent Distribution by Region</h2>
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
      </div>

      {/* Recently Approved Agents */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-5">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recently Approved Agents</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">#</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Agent ID</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Name</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Email</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Region</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Join Date</th>
                <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {dashboardData.recentlyApproved.map((agent, index) => (
                <tr key={agent.id} className="hover:bg-eon-light-gray dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{agent.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(agent.joinDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-eon-success dark:bg-green-900/30 dark:text-green-400">
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
