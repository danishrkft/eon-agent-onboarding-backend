import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, UserPlus, UserCog, Key } from 'lucide-react';
import AddUserModal from '../components/AddUserModal';
import EditPermissionsModal from '../components/EditPermissionsModal';
import ScheduleReportForm from '../components/ScheduleReportForm';

const Settings: React.FC = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditPermissionsModal, setShowEditPermissionsModal] = useState(false);
  const [activeLogsTab, setActiveLogsTab] = useState('api-keys');

  // Sample user data for User Access tab
  const users = [{
    id: 1,
    name: "Ahmad Faizal",
    email: "ahmad.faizal@eon.my",
    role: "Admin",
    status: "Active",
    lastActive: "2025-04-25"
  }, {
    id: 2,
    name: "Nur Hidayah",
    email: "nur.hidayah@eon.my",
    role: "Manager",
    status: "Active",
    lastActive: "2025-04-24"
  }, {
    id: 3,
    name: "Tan Wei Ming",
    email: "wei.ming@eon.my",
    role: "Editor",
    status: "Active",
    lastActive: "2025-04-26"
  }, {
    id: 4,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@eon.my",
    role: "Viewer",
    status: "Inactive",
    lastActive: "2025-03-30"
  }, {
    id: 5,
    name: "Lim Chee Keong",
    email: "chee.keong@eon.my",
    role: "Viewer",
    status: "Active",
    lastActive: "2025-04-23"
  }];

  const userRolePermissions = {
    "Admin": ["View Reports", "Edit Reports", "Manage Users", "Manage Settings", "Approve Applications", "Manage Campaigns"],
    "Manager": ["View Reports", "Edit Reports", "Approve Applications", "Manage Campaigns"],
    "Editor": ["View Reports", "Edit Reports", "Manage Campaigns"],
    "Viewer": ["View Reports"]
  };

  // Sample Audit Logs with mixed status
  const auditLogs = [
    {
      id: 'audit-1',
      timestamp: new Date('2025-05-30T05:01:47'),
      user: 'John Smith',
      email: 'john.smith@aviation.com',
      role: 'Administrator',
      module: 'Assets',
      action: 'Logout',
      details: 'Logout Asset HL-300 | Serial No. 2645 | Update...',
      ipAddress: '15.43.157.246',
      device: 'Firefox 97.0.1 / Ubuntu 20.04',
      status: 'Successful'
    },
    {
      id: 'audit-2',
      timestamp: new Date('2025-05-21T10:59:47'),
      user: 'John Smith',
      email: 'john.smith@aviation.com',
      role: 'Administrator',
      module: 'Analytics',
      action: 'Edit',
      details: 'Edit Asset CP-Loader | Serial No. 9416 | Update...',
      ipAddress: '193.121.5.200',
      device: 'Edge 99.0.1150 / Windows 11',
      status: 'Successful'
    },
    {
      id: 'audit-3',
      timestamp: new Date('2025-05-21T21:41:47'),
      user: 'Sarah Johnson',
      email: 'sarah.j@aviation.com',
      role: 'Supervisor',
      module: 'Location',
      action: 'Access Control Change',
      details: 'Access Control Change Asset WB500 | Serial ...',
      ipAddress: '196.196.91.32',
      device: 'Chrome 98.0.4758 / Windows 10',
      status: 'Successful'
    },
    {
      id: 'audit-4',
      timestamp: new Date('2025-05-15T13:56:47'),
      user: 'Sarah Johnson',
      email: 'sarah.j@aviation.com',
      role: 'Supervisor',
      module: 'Telematics',
      action: 'View',
      details: 'View Asset HL250 | Serial No. 1445 | Update...',
      ipAddress: '96.48.26.123',
      device: 'Safari Mobile 15.4 / iOS 15.4',
      status: 'Failed'
    },
    {
      id: 'audit-5',
      timestamp: new Date('2025-05-14T08:30:15'),
      user: 'Mike Chen',
      email: 'mike.chen@aviation.com',
      role: 'Operator',
      module: 'Maintenance',
      action: 'Create',
      details: 'Create Maintenance Record | Asset ID: 7823 | ...',
      ipAddress: '172.16.45.98',
      device: 'Chrome 98.0.4758 / macOS 12.3',
      status: 'Failed'
    },
    {
      id: 'audit-6',
      timestamp: new Date('2025-05-13T16:22:33'),
      user: 'Lisa Wong',
      email: 'lisa.wong@aviation.com',
      role: 'Manager',
      module: 'Reports',
      action: 'Export',
      details: 'Export Monthly Asset Report | Format: PDF | ...',
      ipAddress: '10.0.0.45',
      device: 'Firefox 96.0 / Windows 10',
      status: 'Successful'
    },
    {
      id: 'audit-7',
      timestamp: new Date('2025-05-12T11:15:22'),
      user: 'David Kim',
      email: 'david.kim@aviation.com',
      role: 'Technician',
      module: 'Inventory',
      action: 'Update',
      details: 'Update Inventory Count | Item: Engine Parts | ...',
      ipAddress: '192.168.1.100',
      device: 'Chrome 97.0.4692 / Android 12',
      status: 'Successful'
    },
    {
      id: 'audit-8',
      timestamp: new Date('2025-05-11T14:45:10'),
      user: 'Emma Rodriguez',
      email: 'emma.rodriguez@aviation.com',
      role: 'Administrator',
      module: 'User Management',
      action: 'Delete',
      details: 'Delete User Account | User ID: 456 | Name: ...',
      ipAddress: '203.0.113.25',
      device: 'Safari 15.4 / macOS 12.3',
      status: 'Failed'
    },
    {
      id: 'audit-9',
      timestamp: new Date('2025-05-10T09:33:44'),
      user: 'Tom Anderson',
      email: 'tom.anderson@aviation.com',
      role: 'Operator',
      module: 'Fleet',
      action: 'Assign',
      details: 'Assign Aircraft to Route | Flight: AA1234 | ...',
      ipAddress: '198.51.100.42',
      device: 'Edge 98.0.1108 / Windows 11',
      status: 'Successful'
    },
    {
      id: 'audit-10',
      timestamp: new Date('2025-05-09T17:28:55'),
      user: 'Rachel Green',
      email: 'rachel.green@aviation.com',
      role: 'Manager',
      module: 'Compliance',
      action: 'Review',
      details: 'Review Compliance Report | Document ID: CR-789 | ...',
      ipAddress: '172.31.255.1',
      device: 'Chrome 98.0.4758 / Ubuntu 20.04',
      status: 'Successful'
    }
  ];
  
  const [currentAuditPage, setCurrentAuditPage] = useState(1);
  const logsPerPage = 10;
  
  const indexOfLastAuditLog = currentAuditPage * logsPerPage;
  const indexOfFirstAuditLog = indexOfLastAuditLog - logsPerPage;
  const currentAuditLogs = auditLogs.slice(indexOfFirstAuditLog, indexOfLastAuditLog);
  const totalAuditPages = Math.ceil(auditLogs.length / logsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Successful':
        return <Badge className="bg-green-100 text-green-800 border border-green-200">Successful</Badge>;
      case 'Failed':
        return <Badge className="bg-red-100 text-red-800 border border-red-200">Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border border-gray-200">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#00205C]">Settings</h1>
          <p className="text-gray-600">Manage your application settings</p>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid grid-cols-5 gap-4 mb-8">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="user-access">User Access</TabsTrigger>
            <TabsTrigger value="schedule-report">Schedule Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive email notifications for important updates.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your device.</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive text message notifications.</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="font-medium">Notification Types</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-1" />
                      <Label htmlFor="notification-1">New Agent Applications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-2" defaultChecked />
                      <Label htmlFor="notification-2">Commission Payouts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-3" defaultChecked />
                      <Label htmlFor="notification-3">Campaign Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notification-4" />
                      <Label htmlFor="notification-4">System Maintenance</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00205C] hover:bg-[#001A45]">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <div className="space-y-6">
              <div>
                <Tabs defaultValue="api-keys" onValueChange={setActiveLogsTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                    <TabsTrigger value="audit-logs">Audit Logs</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6">
                    {activeLogsTab === 'api-keys' ? (
                      <Card>
                        <CardHeader>
                          <CardTitle>API Keys</CardTitle>
                          <CardDescription>Manage your API access keys.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Created</TableHead>
                                  <TableHead>Last Used</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell>Production Key</TableCell>
                                  <TableCell>2025-01-15</TableCell>
                                  <TableCell>2025-04-28</TableCell>
                                  <TableCell>
                                    <Button variant="ghost" size="sm">Revoke</Button>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>Development Key</TableCell>
                                  <TableCell>2025-03-02</TableCell>
                                  <TableCell>2025-04-27</TableCell>
                                  <TableCell>
                                    <Button variant="ghost" size="sm">Revoke</Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            <Key className="mr-2 h-4 w-4" />
                            Generate New API Key
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card>
                        <CardHeader>
                          <CardTitle>Audit Logs</CardTitle>
                          <CardDescription>View system audit logs and user activities.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-1">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                              <Input placeholder="Search logs..." className="pl-9" />
                            </div>
                            
                            <div className="flex gap-2">
                              <Select defaultValue="all-actions">
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="All Actions" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all-actions">All Actions</SelectItem>
                                  <SelectItem value="login">Login</SelectItem>
                                  <SelectItem value="logout">Logout</SelectItem>
                                  <SelectItem value="edit">Edit</SelectItem>
                                  <SelectItem value="delete">Delete</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select defaultValue="all-status">
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all-status">All Status</SelectItem>
                                  <SelectItem value="successful">Successful</SelectItem>
                                  <SelectItem value="failed">Failed</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Button variant="outline">
                                Filter by Date
                              </Button>
                            </div>
                          </div>
                          
                          <div className="rounded-md border overflow-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[140px]">Timestamp</TableHead>
                                  <TableHead className="w-[200px]">User</TableHead>
                                  <TableHead className="w-[100px]">Role</TableHead>
                                  <TableHead className="w-[100px]">Module</TableHead>
                                  <TableHead className="w-[120px]">Action</TableHead>
                                  <TableHead className="w-[300px]">Details</TableHead>
                                  <TableHead className="w-[130px]">IP Address</TableHead>
                                  <TableHead className="w-[150px]">Device</TableHead>
                                  <TableHead className="w-[100px]">Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {currentAuditLogs.map(log => (
                                  <TableRow key={log.id}>
                                    <TableCell className="text-sm">
                                      {log.timestamp.toLocaleDateString()}<br />
                                      <span className="text-gray-500">{log.timestamp.toLocaleTimeString()}</span>
                                    </TableCell>
                                    <TableCell>
                                      <div>
                                        <div className="font-medium">{log.user}</div>
                                        <div className="text-sm text-gray-500">{log.email}</div>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-sm">{log.role}</TableCell>
                                    <TableCell className="text-sm">{log.module}</TableCell>
                                    <TableCell className="text-sm">{log.action}</TableCell>
                                    <TableCell className="text-sm text-gray-600 max-w-[300px] truncate" title={log.details}>
                                      {log.details}
                                    </TableCell>
                                    <TableCell className="text-sm font-mono">{log.ipAddress}</TableCell>
                                    <TableCell className="text-sm text-gray-500">
                                      {log.device}
                                    </TableCell>
                                    <TableCell>
                                      {getStatusBadge(log.status)}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div className="flex items-center justify-center gap-2 mt-4">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setCurrentAuditPage(prev => Math.max(1, prev - 1))}
                              disabled={currentAuditPage === 1}
                            >
                              Previous
                            </Button>
                            
                            {Array.from({ length: totalAuditPages }, (_, i) => (
                              <Button 
                                key={i} 
                                variant={currentAuditPage === i + 1 ? 'default' : 'outline'} 
                                size="sm"
                                onClick={() => setCurrentAuditPage(i + 1)}
                                className={currentAuditPage === i + 1 ? 'bg-[#00205C]' : ''}
                              >
                                {i + 1}
                              </Button>
                            ))}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setCurrentAuditPage(prev => Math.min(totalAuditPages, prev + 1))}
                              disabled={currentAuditPage === totalAuditPages}
                            >
                              Next
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding Settings</CardTitle>
                <CardDescription>Customize the appearance of your platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-md bg-[#00205C]"></div>
                    <Input value="#00205C" className="w-32" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-md bg-[#E5241B]"></div>
                    <Input value="#E5241B" className="w-32" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="border rounded-md p-4 flex items-center justify-center h-32">
                    <div className="text-center">
                      <div className="mb-2">Current logo preview</div>
                      <Button variant="outline">Upload New Logo</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <div className="border rounded-md p-4 flex items-center justify-center h-32">
                    <div className="text-center">
                      <div className="mb-2">Current favicon preview</div>
                      <Button variant="outline">Upload New Favicon</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00205C] hover:bg-[#001A45]">Save Branding</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="user-access">
            <Card>
              <CardHeader>
                <CardTitle>User Access Management</CardTitle>
                <CardDescription>Manage user permissions and access levels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                    <Input placeholder="Search users..." className="pl-9" />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="bg-[#00205C] hover:bg-[#001A45]"
                      onClick={() => setShowAddUserModal(true)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <UserCog className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-[#E5241B]" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Configure access levels for different user roles.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Permission</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Manager</TableHead>
                        <TableHead>Editor</TableHead>
                        <TableHead>Viewer</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(userRolePermissions).flatMap(([_, perms]) => perms).filter((value, index, self) => self.indexOf(value) === index).map((permission, i) => (
                        <TableRow key={i}>
                          <TableCell>{permission}</TableCell>
                          <TableCell>
                            <Checkbox checked={userRolePermissions["Admin"].includes(permission)} disabled />
                          </TableCell>
                          <TableCell>
                            <Checkbox checked={userRolePermissions["Manager"].includes(permission)} disabled />
                          </TableCell>
                          <TableCell>
                            <Checkbox checked={userRolePermissions["Editor"].includes(permission)} disabled />
                          </TableCell>
                          <TableCell>
                            <Checkbox checked={userRolePermissions["Viewer"].includes(permission)} disabled />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-[#00205C] hover:bg-[#001A45]"
                  onClick={() => setShowEditPermissionsModal(true)}
                >
                  Edit Role Permissions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="schedule-report">
            <ScheduleReportForm />
          </TabsContent>
        </Tabs>

        <AddUserModal 
          isOpen={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
        />

        <EditPermissionsModal 
          isOpen={showEditPermissionsModal}
          onClose={() => setShowEditPermissionsModal(false)}
        />
      </div>
    </Layout>
  );
};

export default Settings;
