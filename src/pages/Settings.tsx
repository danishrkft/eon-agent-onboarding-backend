import React from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, UserPlus, UserCog, Key } from 'lucide-react';
const Settings: React.FC = () => {
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
  return <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#00205C]">Settings</h1>
          <p className="text-gray-600">Manage your application settings</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-5 gap-4 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="user-access">User Access</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <Button size="sm" variant="outline">Upload new photo</Button>
                      <p className="text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-blue-600 hover:bg-blue-500">Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-blue-600 hover:bg-blue-500">Change Password</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <Card>
                <CardHeader>
                  <CardTitle>API Logs</CardTitle>
                  <CardDescription>View recent API activity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input placeholder="Search logs..." className="pl-9" />
                    </div>
                    <Button variant="outline">Filter</Button>
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
                        <TableRow>
                          <TableCell className="font-mono text-sm">/api/agents</TableCell>
                          <TableCell>GET</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">200 OK</Badge>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">28 Apr 2025, 14:35:22</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-sm">/api/commission/payout</TableCell>
                          <TableCell>POST</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">201 Created</Badge>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">28 Apr 2025, 14:32:17</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-mono text-sm">/api/applications/APP003</TableCell>
                          <TableCell>GET</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">404 Not Found</Badge>
                          </TableCell>
                          <TableCell className="text-gray-500 text-sm">28 Apr 2025, 14:30:05</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="ghost" size="sm">Load More</Button>
                  </div>
                </CardContent>
              </Card>
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
                    <Button className="bg-[#00205C] hover:bg-[#001A45]">
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
                      {users.map(user => <TableRow key={user.id}>
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
                        </TableRow>)}
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
                      {Object.entries(userRolePermissions).flatMap(([_, perms]) => perms).filter((value, index, self) => self.indexOf(value) === index).map((permission, i) => <TableRow key={i}>
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
                        </TableRow>)}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00205C] hover:bg-[#001A45]">Edit Role Permissions</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>;
};
export default Settings;