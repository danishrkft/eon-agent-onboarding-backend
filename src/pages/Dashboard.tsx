
import React from 'react';
import Layout from '../components/Layout';
import DashboardCard from '../components/DashboardCard';
import { 
  Users, 
  UserCheck, 
  Clock, 
  Calendar, 
  DollarSign,
  CheckSquare 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { dashboardData } from '../utils/mockData';

const Dashboard = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const COLORS = ['#0EA5E9', '#60A5FA', '#93C5FD', '#BAE6FD', '#E0F2FE'];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to EON Agent Management Portal</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <DashboardCard 
          title="Total Registered Agents"
          value={dashboardData.totalAgents}
          icon={<Users className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard 
          title="Active Agents"
          value={dashboardData.activeAgents}
          icon={<UserCheck className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard 
          title="Pending Approvals"
          value={dashboardData.pendingApprovals}
          icon={<Clock className="h-6 w-6 text-eon-blue" />}
        />
        <DashboardCard 
          title="Approved This Month"
          value={dashboardData.approvedThisMonth}
          icon={<Calendar className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 20, isPositive: true }}
        />
        <DashboardCard 
          title="YTD Commission Paid"
          value={formatCurrency(dashboardData.ytdCommissionPaid)}
          icon={<DollarSign className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 5, isPositive: true }}
        />
        <DashboardCard 
          title="Avg. Approval Time"
          value={dashboardData.avgApprovalTime}
          icon={<CheckSquare className="h-6 w-6 text-eon-blue" />}
          trend={{ value: 10, isPositive: false }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-white p-5 rounded-lg shadow-card">
          <h3 className="font-medium text-gray-800 mb-4">Agent Registrations (Last 6 Months)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={dashboardData.monthlyRegistrations}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Agents"
                  stroke="#0EA5E9"
                  strokeWidth={3}
                  dot={{ r: 6, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-lg shadow-card">
          <h3 className="font-medium text-gray-800 mb-4">Agent Distribution by Region</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.regionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="region"
                  label={({ region, percent }) => `${region}: ${(percent * 100).toFixed(0)}%`}
                >
                  {dashboardData.regionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
                <Tooltip formatter={(value, name, props) => [value, props.payload.region]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recently Approved Agents */}
      <div className="bg-white p-5 rounded-lg shadow-card">
        <h3 className="font-medium text-gray-800 mb-4">Recently Approved Agents</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 bg-gray-50">Agent ID</th>
                <th className="px-6 py-3 bg-gray-50">Name</th>
                <th className="px-6 py-3 bg-gray-50">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dashboardData.recentlyApproved.map((agent) => (
                <tr key={agent.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{agent.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(agent.joinDate).toLocaleDateString()}</td>
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
