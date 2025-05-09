import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarIcon, Edit, Trash2, Plus, LinkIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import FilterDropdowns from '../components/FilterDropdowns';

// Sample data for campaigns
const activeCampaignData = [{
  id: 'CAMP001',
  name: 'Summer Recruitment Drive',
  startDate: new Date(2025, 5, 1),
  endDate: new Date(2025, 7, 31),
  target: 50,
  status: 'Active',
  progress: 28,
  customLink: 'https://eon.my/summer-drive'
}, {
  id: 'CAMP003',
  name: 'Q3 Expansion Program',
  startDate: new Date(2025, 6, 1),
  endDate: new Date(2025, 8, 30),
  target: 30,
  status: 'Active',
  progress: 12,
  customLink: 'https://eon.my/q3-expansion'
}];
const upcomingCampaignData = [{
  id: 'CAMP002',
  name: 'Winter Agent Acquisition',
  startDate: new Date(2025, 10, 1),
  endDate: new Date(2026, 0, 31),
  target: 75,
  status: 'Upcoming',
  progress: 0,
  customLink: 'https://eon.my/winter-acquisition'
}, {
  id: 'CAMP005',
  name: 'New Market Entry Campaign',
  startDate: new Date(2025, 8, 1),
  endDate: new Date(2025, 11, 31),
  target: 100,
  status: 'Upcoming',
  progress: 0,
  customLink: 'https://eon.my/new-market'
}, {
  id: 'CAMP007',
  name: 'East Coast Expansion',
  startDate: new Date(2025, 9, 15),
  endDate: new Date(2025, 11, 15),
  target: 60,
  status: 'Upcoming',
  progress: 0,
  customLink: 'https://eon.my/east-coast'
}];
const completedCampaignData = [{
  id: 'CAMP004',
  name: 'Regional Partnership Initiative',
  startDate: new Date(2025, 3, 15),
  endDate: new Date(2025, 5, 15),
  target: 25,
  status: 'Completed',
  progress: 25,
  customLink: 'https://eon.my/regional-partnership'
}, {
  id: 'CAMP006',
  name: 'Graduate Recruitment Program',
  startDate: new Date(2025, 1, 1),
  endDate: new Date(2025, 2, 31),
  target: 40,
  status: 'Completed',
  progress: 38,
  customLink: 'https://eon.my/graduate-program'
}, {
  id: 'CAMP008',
  name: 'Referral Incentive Campaign',
  startDate: new Date(2025, 0, 15),
  endDate: new Date(2025, 2, 15),
  target: 35,
  status: 'Completed',
  progress: 32,
  customLink: 'https://eon.my/referral-incentive'
}];
const CampaignManagement: React.FC = () => {
  const [campaigns] = useState([...activeCampaignData, ...upcomingCampaignData, ...completedCampaignData]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDialog, setShowDialog] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [editCampaign, setEditCampaign] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('active');

  // Filter campaigns based on search term and status filter
  const getFilteredCampaigns = (campaignList: typeof activeCampaignData) => {
    return campaignList.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || campaign.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };
  const handleEditCampaign = (campaign: any) => {
    setEditCampaign(campaign);
    setStartDate(campaign.startDate);
    setEndDate(campaign.endDate);
    setShowDialog(true);
  };
  return <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="font-bold text-[#00205C] text-2xl">Registration Campaign Management</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <FilterDropdowns showDateFilter={false} />
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[#00205C] hover:bg-[#001A45]">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>{editCampaign ? 'Edit Campaign' : 'Create New Campaign'}</DialogTitle>
                  <DialogDescription>
                    {editCampaign ? 'Update the campaign details below.' : 'Fill in the campaign details below to create a new registration campaign.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" placeholder="Enter campaign name" defaultValue={editCampaign?.name || ''} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="start-date" className="text-right">
                      Start Date
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="end-date" className="text-right">
                      End Date
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus className="pointer-events-auto" />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="target" className="text-right">
                      Target
                    </Label>
                    <Input id="target" type="number" className="col-span-3" placeholder="Enter registration target" defaultValue={editCampaign?.target || ''} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="custom-link" className="text-right">
                      Custom Link
                    </Label>
                    <div className="col-span-3 flex">
                      <Input id="custom-link" className="flex-1" placeholder="e.g., /summer-campaign" defaultValue={editCampaign?.customLink || ''} />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-[#00205C] hover:bg-[#001A45]" onClick={() => setShowDialog(false)}>
                    {editCampaign ? 'Update Campaign' : 'Create Campaign'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="active">Active Campaigns</TabsTrigger>
            <TabsTrigger value="upcoming" className="text-sm">Upcoming Campaigns</TabsTrigger>
            <TabsTrigger value="completed">Completed Campaigns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Active Campaigns</CardTitle>
                <CardDescription>
                  Registration campaigns that are currently in progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <Input placeholder="Search campaigns..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Upcoming">Upcoming</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Custom Link</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredCampaigns(activeCampaignData).map(campaign => <TableRow key={campaign.id}>
                          <TableCell className="font-medium">
                            <button className="text-blue-600 hover:underline" onClick={() => handleEditCampaign(campaign)}>
                              {campaign.id}
                            </button>
                          </TableCell>
                          <TableCell>{campaign.name}</TableCell>
                          <TableCell>
                            {format(campaign.startDate, 'MMM d, yyyy')} - 
                            {format(campaign.endDate, 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>{campaign.target}</TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className={`h-2.5 rounded-full ${campaign.status === 'Completed' ? 'bg-green-500' : 'bg-[#00205C]'}`} style={{
                            width: `${campaign.progress / campaign.target * 100}%`
                          }}></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {campaign.progress} of {campaign.target} ({Math.round(campaign.progress / campaign.target * 100)}%)
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <LinkIcon className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="truncate max-w-[120px]">{campaign.customLink}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.status === 'Active' ? 'bg-green-100 text-green-800' : campaign.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                              {campaign.status}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditCampaign(campaign)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-[#E5241B]" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                        {getFilteredCampaigns(activeCampaignData).length === 0 && <TableRow>
                            <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                              No active campaigns found
                            </TableCell>
                          </TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Export Data</Button>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle className="font-semibold text-lg">Upcoming Campaigns</CardTitle>
                <CardDescription>
                  Registration campaigns scheduled for future dates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <Input placeholder="Search campaigns..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Custom Link</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredCampaigns(upcomingCampaignData).map(campaign => <TableRow key={campaign.id}>
                          <TableCell className="font-medium">
                            <button className="text-blue-600 hover:underline" onClick={() => handleEditCampaign(campaign)}>
                              {campaign.id}
                            </button>
                          </TableCell>
                          <TableCell>{campaign.name}</TableCell>
                          <TableCell>
                            {format(campaign.startDate, 'MMM d, yyyy')} - 
                            {format(campaign.endDate, 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>{campaign.target}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <LinkIcon className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="truncate max-w-[120px]">{campaign.customLink}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {campaign.status}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditCampaign(campaign)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-[#E5241B]" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
                        {getFilteredCampaigns(upcomingCampaignData).length === 0 && <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                              No upcoming campaigns found
                            </TableCell>
                          </TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Completed Campaigns</CardTitle>
                <CardDescription>
                  Registration campaigns that have ended.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 mr-4">
                    <Input placeholder="Search campaigns..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Results</TableHead>
                        <TableHead>Custom Link</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredCampaigns(completedCampaignData).map(campaign => <TableRow key={campaign.id}>
                          <TableCell className="font-medium">
                            <button className="text-blue-600 hover:underline" onClick={() => handleEditCampaign(campaign)}>
                              {campaign.id}
                            </button>
                          </TableCell>
                          <TableCell>{campaign.name}</TableCell>
                          <TableCell>
                            {format(campaign.startDate, 'MMM d, yyyy')} - 
                            {format(campaign.endDate, 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>{campaign.target}</TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="h-2.5 rounded-full bg-green-500" style={{
                            width: `${campaign.progress / campaign.target * 100}%`
                          }}></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {campaign.progress} of {campaign.target} ({Math.round(campaign.progress / campaign.target * 100)}%)
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <LinkIcon className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="truncate max-w-[120px]">{campaign.customLink}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {campaign.status}
                            </div>
                          </TableCell>
                        </TableRow>)}
                        {getFilteredCampaigns(completedCampaignData).length === 0 && <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                              No completed campaigns found
                            </TableCell>
                          </TableRow>}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Campaign Performance</CardTitle>
              <CardDescription>Registration conversion rates for active campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex flex-col justify-center items-center">
                <div className="text-center text-gray-500">
                  <p>Campaign performance charts will appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Campaign Statistics</CardTitle>
              <CardDescription>Key metrics for all registration campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total Campaigns</div>
                  <div className="text-2xl font-bold">{campaigns.length}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Active Campaigns</div>
                  <div className="text-2xl font-bold">
                    {campaigns.filter(c => c.status === 'Active').length}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Total Target</div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.target, 0)}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Current Progress</div>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, campaign) => sum + campaign.progress, 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>;
};
export default CampaignManagement;