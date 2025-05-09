import React, { useState } from 'react';
import { Calendar, Download, Filter, Search, ChevronDown } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import FilterDropdowns, { DateRange } from '../components/FilterDropdowns';

// Sample report data
const reportData = [{
  id: 1,
  name: 'Monthly Sales Overview',
  category: 'Sales',
  date: '2025-04-01',
  downloads: 124,
  status: 'Available'
}, {
  id: 2,
  name: 'Agent Performance Analysis',
  category: 'Performance',
  date: '2025-04-02',
  downloads: 86,
  status: 'Available'
}, {
  id: 3,
  name: 'Commission Breakdown',
  category: 'Finance',
  date: '2025-04-03',
  downloads: 215,
  status: 'Available'
}, {
  id: 4,
  name: 'Quarterly Financial Report',
  category: 'Finance',
  date: '2025-04-05',
  downloads: 76,
  status: 'Available'
}, {
  id: 5,
  name: 'Regional Market Analysis',
  category: 'Market',
  date: '2025-04-07',
  downloads: 54,
  status: 'Processing'
}, {
  id: 6,
  name: 'Agent Onboarding Status',
  category: 'Onboarding',
  date: '2025-04-08',
  downloads: 112,
  status: 'Available'
}, {
  id: 7,
  name: 'Product Performance',
  category: 'Products',
  date: '2025-04-10',
  downloads: 92,
  status: 'Available'
}, {
  id: 8,
  name: 'Customer Satisfaction Survey',
  category: 'Customer',
  date: '2025-04-11',
  downloads: 64,
  status: 'Available'
}, {
  id: 9,
  name: 'Market Trends Q1 2025',
  category: 'Market',
  date: '2025-04-12',
  downloads: 187,
  status: 'Processing'
}, {
  id: 10,
  name: 'Agent Recruitment Pipeline',
  category: 'Recruitment',
  date: '2025-04-14',
  downloads: 43,
  status: 'Available'
}, {
  id: 11,
  name: 'Annual Revenue Forecast',
  category: 'Finance',
  date: '2025-04-16',
  downloads: 156,
  status: 'Available'
}, {
  id: 12,
  name: 'Customer Acquisition Cost',
  category: 'Finance',
  date: '2025-04-17',
  downloads: 78,
  status: 'Available'
}];

// Sample chart data
const yearlyRevenueData = {
  2023: [{
    month: 'Jan',
    revenue: 45000,
    target: 42000
  }, {
    month: 'Feb',
    revenue: 52000,
    target: 45000
  }, {
    month: 'Mar',
    revenue: 48000,
    target: 47000
  }, {
    month: 'Apr',
    revenue: 61000,
    target: 50000
  }, {
    month: 'May',
    revenue: 55000,
    target: 53000
  }, {
    month: 'Jun',
    revenue: 67000,
    target: 55000
  }, {
    month: 'Jul',
    revenue: 72000,
    target: 58000
  }, {
    month: 'Aug',
    revenue: 69000,
    target: 60000
  }, {
    month: 'Sep',
    revenue: 74000,
    target: 63000
  }, {
    month: 'Oct',
    revenue: 78000,
    target: 65000
  }, {
    month: 'Nov',
    revenue: 84000,
    target: 68000
  }, {
    month: 'Dec',
    revenue: 92000,
    target: 70000
  }],
  2024: [{
    month: 'Jan',
    revenue: 75000,
    target: 72000
  }, {
    month: 'Feb',
    revenue: 82000,
    target: 75000
  }, {
    month: 'Mar',
    revenue: 78000,
    target: 77000
  }, {
    month: 'Apr',
    revenue: 91000,
    target: 80000
  }, {
    month: 'May',
    revenue: 85000,
    target: 83000
  }, {
    month: 'Jun',
    revenue: 97000,
    target: 85000
  }, {
    month: 'Jul',
    revenue: 102000,
    target: 88000
  }, {
    month: 'Aug',
    revenue: 99000,
    target: 90000
  }, {
    month: 'Sep',
    revenue: 104000,
    target: 93000
  }, {
    month: 'Oct',
    revenue: 108000,
    target: 95000
  }, {
    month: 'Nov',
    revenue: 114000,
    target: 98000
  }, {
    month: 'Dec',
    revenue: 122000,
    target: 100000
  }],
  2025: [{
    month: 'Jan',
    revenue: 105000,
    target: 102000
  }, {
    month: 'Feb',
    revenue: 112000,
    target: 105000
  }, {
    month: 'Mar',
    revenue: 108000,
    target: 107000
  }, {
    month: 'Apr',
    revenue: 121000,
    target: 110000
  }, {
    month: 'May',
    revenue: 0,
    target: 113000
  }, {
    month: 'Jun',
    revenue: 0,
    target: 115000
  }, {
    month: 'Jul',
    revenue: 0,
    target: 118000
  }, {
    month: 'Aug',
    revenue: 0,
    target: 120000
  }, {
    month: 'Sep',
    revenue: 0,
    target: 123000
  }, {
    month: 'Oct',
    revenue: 0,
    target: 125000
  }, {
    month: 'Nov',
    revenue: 0,
    target: 128000
  }, {
    month: 'Dec',
    revenue: 0,
    target: 130000
  }]
};
const yearlyAgentProductivityData = {
  2023: [{
    name: 'Q1',
    policies: 245,
    revenue: 367500
  }, {
    name: 'Q2',
    policies: 312,
    revenue: 468000
  }, {
    name: 'Q3',
    policies: 287,
    revenue: 430500
  }, {
    name: 'Q4',
    policies: 356,
    revenue: 534000
  }],
  2024: [{
    name: 'Q1',
    policies: 325,
    revenue: 487500
  }, {
    name: 'Q2',
    policies: 392,
    revenue: 588000
  }, {
    name: 'Q3',
    policies: 367,
    revenue: 550500
  }, {
    name: 'Q4',
    policies: 426,
    revenue: 639000
  }],
  2025: [{
    name: 'Q1',
    policies: 405,
    revenue: 607500
  }, {
    name: 'Q2',
    policies: 0,
    revenue: 0
  }, {
    name: 'Q3',
    policies: 0,
    revenue: 0
  }, {
    name: 'Q4',
    policies: 0,
    revenue: 0
  }]
};
const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [revenueYear, setRevenueYear] = useState<keyof typeof yearlyRevenueData>(2025);
  const [productivityYear, setProductivityYear] = useState<keyof typeof yearlyAgentProductivityData>(2025);
  const itemsPerPage = 10;

  // New state for filters
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 4, 31)
  });
  const [company, setCompany] = useState("EPD");
  const [branch, setBranch] = useState("Edaran Otomobil Nasional Bhd (Glenmarie)");

  // Filter data based on search term and category
  const filteredData = reportData.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || report.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(reportData.map(report => report.category)))];
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  return <Layout>
      <div className="w-full space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#00205C]">Reports</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <FilterDropdowns onDateChange={setDateRange} onCompanyChange={setCompany} onBranchChange={setBranch} />
            <Button className="bg-blue-600 hover:bg-blue-500">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Report
            </Button>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trends Chart */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#00205C]">Revenue Trends</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 border-gray-300">
                    {revenueYear} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-0">
                  <div className="flex flex-col">
                    {Object.keys(yearlyRevenueData).map(year => <Button key={year} variant="ghost" className="justify-start rounded-none h-9" onClick={() => setRevenueYear(Number(year) as 2023 | 2024 | 2025)}>
                        {year}
                      </Button>)}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyRevenueData[revenueYear]} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={value => `$${value / 1000}k`} />
                  <Tooltip formatter={value => formatCurrency(Number(value))} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#00205C" strokeWidth={2} name="Actual Revenue" />
                  <Line type="monotone" dataKey="target" stroke="#E5241B" strokeDasharray="5 5" name="Target Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Agent Productivity Chart */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#00205C]">Quarterly Agent Productivity</h2>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 border-gray-300">
                    {productivityYear} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-0">
                  <div className="flex flex-col">
                    {Object.keys(yearlyAgentProductivityData).map(year => <Button key={year} variant="ghost" className="justify-start rounded-none h-9" onClick={() => setProductivityYear(Number(year) as 2023 | 2024 | 2025)}>
                        {year}
                      </Button>)}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyAgentProductivityData[productivityYear]} margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#00205C" />
                  <YAxis yAxisId="right" orientation="right" stroke="#E5241B" tickFormatter={value => `$${value / 1000}k`} />
                  <Tooltip formatter={(value, name) => {
                  if (name === "revenue") {
                    return [formatCurrency(Number(value)), "Revenue"];
                  }
                  return [value, "Policies Sold"];
                }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="policies" fill="#00205C" name="Policies Sold" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#E5241B" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Total Reports</span>
                <span className="text-2xl font-bold">{reportData.length}</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <svg className="w-6 h-6 text-[#00205C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#00205C] h-2 rounded-full" style={{
                width: '100%'
              }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Downloads This Month</span>
                <span className="text-2xl font-bold">1,287</span>
              </div>
              <div className="bg-red-50 p-3 rounded-full">
                <svg className="w-6 h-6 text-[#E5241B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#E5241B] h-2 rounded-full" style={{
                width: '75%'
              }}></div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Processing Reports</span>
                <span className="text-2xl font-bold">2</span>
              </div>
              <div className="bg-yellow-50 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{
                width: '20%'
              }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
          <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h2 className="text-lg font-semibold">Available Reports</h2>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search reports..." className="pl-9" value={searchTerm} onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }} />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 h-4 w-4" />
                <select className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00205C]" value={filterCategory} onChange={e => {
                setFilterCategory(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}>
                  {categories.map(category => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? paginatedData.map(report => <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.name}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>{new Date(report.date).toLocaleDateString()}</TableCell>
                    <TableCell>{report.downloads}</TableCell>
                    <TableCell>
                      <Badge className={report.status === 'Available' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant={report.status === 'Available' ? 'outline' : 'secondary'} className={report.status === 'Available' ? 'border-[#00205C] text-[#00205C] hover:bg-[#00205C] hover:text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'} disabled={report.status !== 'Available'}>
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>) : <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No reports found matching your criteria
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          {totalPages > 1 && <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex flex-1 justify-between sm:hidden">
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * itemsPerPage, filteredData.length)}
                    </span> of{' '}
                    <span className="font-medium">{filteredData.length}</span> reports
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button variant="outline" size="icon" className="rounded-l-md" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </Button>
                    {Array.from({
                  length: totalPages
                }, (_, i) => i + 1).map(page => <Button key={page} variant={currentPage === page ? "default" : "outline"} size="icon" className={currentPage === page ? "bg-[#00205C]" : ""} onClick={() => setCurrentPage(page)}>
                        {page}
                      </Button>)}
                    <Button variant="outline" size="icon" className="rounded-r-md" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </nav>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </Layout>;
};
export default Reports;