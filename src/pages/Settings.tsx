
import React, { useState } from 'react';
import { Bell, Key, Lock, Mail, Save, Shield, User, Globe, Database, Building } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  // Profile settings
  const [profileForm, setProfileForm] = useState({
    fullName: 'Admin User',
    email: 'admin@eon.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'System Administrator',
    department: 'IT Department'
  });

  // Security settings
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    applicationUpdates: true,
    securityAlerts: true,
    newsAndAnnouncements: false
  });

  // API settings
  const [apiSettings, setApiSettings] = useState({
    apiKey: 'sk_test_51KzXyHSI7hR8A9eM',
    webhookUrl: 'https://api.eonagents.com/webhooks/inbound',
    developerMode: false
  });

  // Organization settings
  const [organizationSettings, setOrganizationSettings] = useState({
    companyName: 'EON Insurance',
    websiteUrl: 'https://eoninsurance.com',
    address: '123 Main Street, Suite 100, New York, NY 10001',
    taxId: '12-3456789',
    industry: 'Insurance'
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, section: string) => {
    if (section === 'security') {
      setSecurityForm(prev => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev]
      }));
    } else if (section === 'notifications') {
      setNotificationSettings(prev => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev]
      }));
    } else if (section === 'api') {
      setApiSettings(prev => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev]
      }));
    }
  };

  const handleOrganizationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrganizationSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSettings = (section: string) => {
    toast({
      title: "Settings Updated",
      description: `Your ${section} settings have been saved successfully.`,
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Password Error",
        description: "New passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    if (securityForm.newPassword.length < 8) {
      toast({
        title: "Password Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    
    setSecurityForm(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  return (
    <Layout>
      <div className="w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#00205C]">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4 grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="profile" className="text-sm">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="text-sm">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api" className="text-sm">
              <Key className="h-4 w-4 mr-2" />
              API Settings
            </TabsTrigger>
            <TabsTrigger value="organization" className="text-sm">
              <Building className="h-4 w-4 mr-2" />
              Organization
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Profile Information</h2>
                <p className="text-sm text-gray-500">Update your personal information</p>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-full md:w-1/3">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      value={profileForm.fullName} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  <div className="w-full md:w-1/3">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={profileForm.email} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  <div className="w-full md:w-1/3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={profileForm.phone} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input 
                      id="jobTitle" 
                      name="jobTitle" 
                      value={profileForm.jobTitle} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="department">Department</Label>
                    <Input 
                      id="department" 
                      name="department" 
                      value={profileForm.department} 
                      onChange={handleProfileChange} 
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('profile')}
                  className="bg-[#00205C] hover:bg-[#001845]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Password</h2>
                <p className="text-sm text-gray-500">Update your password</p>
              </div>
              <form onSubmit={handleChangePassword} className="p-4 space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword" 
                      type="password" 
                      value={securityForm.currentPassword} 
                      onChange={handleSecurityChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword" 
                      type="password" 
                      value={securityForm.newPassword} 
                      onChange={handleSecurityChange}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password" 
                      value={securityForm.confirmPassword} 
                      onChange={handleSecurityChange}
                      required 
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <Button 
                    type="submit"
                    className="bg-[#00205C] hover:bg-[#001845]"
                  >
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Two-Factor Authentication</h2>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Receive a verification code via text message when signing in</p>
                  </div>
                  <Switch 
                    checked={securityForm.twoFactorEnabled} 
                    onCheckedChange={() => handleSwitchChange('twoFactorEnabled', 'security')} 
                  />
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('security')}
                  className="bg-[#00205C] hover:bg-[#001845]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Manage how you receive notifications</p>
              </div>
              <div className="p-4 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications} 
                    onCheckedChange={() => handleSwitchChange('emailNotifications', 'notifications')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via text message</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications} 
                    onCheckedChange={() => handleSwitchChange('smsNotifications', 'notifications')} 
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <p className="font-medium mb-4">Notification Categories</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Application Updates</p>
                        <p className="text-sm text-gray-500">Notifications about application status changes</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.applicationUpdates} 
                        onCheckedChange={() => handleSwitchChange('applicationUpdates', 'notifications')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Security Alerts</p>
                        <p className="text-sm text-gray-500">Important security notifications</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.securityAlerts} 
                        onCheckedChange={() => handleSwitchChange('securityAlerts', 'notifications')} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">News & Announcements</p>
                        <p className="text-sm text-gray-500">Company news and product updates</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.newsAndAnnouncements} 
                        onCheckedChange={() => handleSwitchChange('newsAndAnnouncements', 'notifications')} 
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('notification')}
                  className="bg-[#00205C] hover:bg-[#001845]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* API Settings */}
          <TabsContent value="api" className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">API Configuration</h2>
                <p className="text-sm text-gray-500">Manage API keys and integrations</p>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex">
                    <Input 
                      id="apiKey" 
                      name="apiKey" 
                      value={apiSettings.apiKey} 
                      readOnly
                      className="rounded-r-none" 
                    />
                    <Button variant="outline" className="rounded-l-none border-l-0">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Keep this key secure and do not share it</p>
                </div>
                
                <div>
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input 
                    id="webhookUrl" 
                    name="webhookUrl" 
                    value={apiSettings.webhookUrl} 
                    onChange={(e) => setApiSettings(prev => ({ ...prev, webhookUrl: e.target.value }))}
                  />
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Developer Mode</p>
                      <p className="text-sm text-gray-500">Enable additional logging and debugging information</p>
                    </div>
                    <Switch 
                      checked={apiSettings.developerMode} 
                      onCheckedChange={() => handleSwitchChange('developerMode', 'api')} 
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('api')}
                  className="bg-[#00205C] hover:bg-[#001845]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">API Documentation</h2>
                <p className="text-sm text-gray-500">Resources for developers</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    API Reference
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Developer Portal
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Authentication Guide
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Organization Settings */}
          <TabsContent value="organization" className="space-y-4">
            <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium">Organization Details</h2>
                <p className="text-sm text-gray-500">Manage your company information</p>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      name="companyName" 
                      value={organizationSettings.companyName} 
                      onChange={handleOrganizationChange} 
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input 
                      id="websiteUrl" 
                      name="websiteUrl" 
                      value={organizationSettings.websiteUrl} 
                      onChange={handleOrganizationChange} 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    value={organizationSettings.address} 
                    onChange={handleOrganizationChange} 
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="taxId">Tax ID / EIN</Label>
                    <Input 
                      id="taxId" 
                      name="taxId" 
                      value={organizationSettings.taxId} 
                      onChange={handleOrganizationChange} 
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input 
                      id="industry" 
                      name="industry" 
                      value={organizationSettings.industry} 
                      onChange={handleOrganizationChange} 
                    />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleSaveSettings('organization')}
                  className="bg-[#00205C] hover:bg-[#001845]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
