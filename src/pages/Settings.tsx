
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
  const [activeApiTab, setActiveApiTab] = useState('keys');

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

  // Sample API logs with pagination data
  const apiLogs = Array.from({ length: 36 }, (_, index) => {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const endpoints = [
      '/api/agents', 
      '/api/commission/payout', 
      '/api/applications', 
      '/api/reports',
      '/api/sales',
      '/api/users'
    ];
    const statuses = [
      { code: '200 OK', bg: 'bg-green-50 text-green-700 border-green-200' },
      { code: '201 Created', bg: 'bg-green-50 text-green-700 border-green-200' },
      { code: '400 Bad Request', bg: 'bg-red-50 text-red-700 border-red-200' },
      { code: '404 Not Found', bg: 'bg-red-50 text-red-700 border-red-200' },
      { code: '500 Server Error', bg: 'bg-red-50 text-red-700 border-red-200' },
    ];
    
    // Generate a date in the past week
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    
    return {
      id: `log-${index + 1}`,
      endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: date,
    };
  });
  
  const [currentApiPage, setCurrentApiPage] = useState(1);
  const logsPerPage = 12;
  
  const indexOfLastLog = currentApiPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = apiLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalApiPages = Math.ceil(apiLogs.length / logsPerPage);

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
            <TabsTrigger value="api">API</TabsTrigger>
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

          <TabsContent value="api">
            <div className="space-y-6">
              <div>
                <Tabs defaultValue="keys" onValueChange={setActiveApiTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="keys">API Keys</TabsTrigger>
                    <TabsTrigger value="logs">API Logs</TabsTrigger>
                  </TabsList>
                  
                  <div className="mt-6">
                    {activeApiTab === 'keys' ? (
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
                          <CardTitle>API Logs</CardTitle>
                          <CardDescription>View recent API activity.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex flex-col md:flex-row gap-3">
                            <div className="relative flex-1">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                              <Input placeholder="Search logs..." className="pl-9" />
                            </div>
                            
                            <div className="flex gap-2">
                              <Select defaultValue="all-methods">
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="All Methods" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all-methods">All Methods</SelectItem>
                                  <SelectItem value="get">GET</SelectItem>
                                  <SelectItem value="post">POST</SelectItem>
                                  <SelectItem value="put">PUT</SelectItem>
                                  <SelectItem value="delete">DELETE</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select defaultValue="all-status">
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="All Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all-status">All Status</SelectItem>
                                  <SelectItem value="success">Success (2xx)</SelectItem>
                                  <SelectItem value="error">Error (4xx/5xx)</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Button variant="outline">
                                Filter by Date
                              </Button>
                            </div>
                          </div>
                          
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Endpoint</TableHead>
                                  <TableHead>Method</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Timestamp</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {currentLogs.map(log => (
                                  <TableRow key={log.id}>
                                    <TableCell className="font-mono text-sm">{log.endpoint}</TableCell>
                                    <TableCell>{log.method}</TableCell>
                                    <TableCell>
                                      <Badge variant="outline" className={log.status.bg}>{log.status.code}</Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-sm">
                                      {log.timestamp.toLocaleDateString()}, {log.timestamp.toLocaleTimeString()}
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
                              onClick={() => setCurrentApiPage(prev => Math.max(1, prev - 1))}
                              disabled={currentApiPage === 1}
                            >
                              Previous
                            </Button>
                            
                            {Array.from({ length: totalApiPages }, (_, i) => (
                              <Button 
                                key={i} 
                                variant={currentApiPage === i + 1 ? 'default' : 'outline'} 
                                size="sm"
                                onClick={() => setCurrentApiPage(i + 1)}
                              >
                                {i + 1}
                              </Button>
                            ))}
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setCurrentApiPage(prev => Math.min(totalApiPages, prev + 1))}
                              disabled={currentApiPage === totalApiPages}
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
