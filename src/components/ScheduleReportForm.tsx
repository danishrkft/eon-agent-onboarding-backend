
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface ScheduledReport {
  id: string;
  name: string;
  frequency: string;
  recipient: string;
  nextRun: Date;
  status: string;
}

const ScheduleReportForm: React.FC = () => {
  const [reports, setReports] = useState<ScheduledReport[]>([
    {
      id: 'SCH001',
      name: 'Monthly Sales Report',
      frequency: 'Weekly',
      recipient: 'ahmad.faizal@eon.my',
      nextRun: new Date(2025, 5, 15),
      status: 'Active'
    },
    {
      id: 'SCH002',
      name: 'Agent Performance Report',
      frequency: 'Daily',
      recipient: 'nur.hidayah@eon.my',
      nextRun: new Date(2025, 5, 10),
      status: 'Active'
    },
    {
      id: 'SCH003',
      name: 'Commission Summary',
      frequency: 'Weekly',
      recipient: 'lim.chee.keong@eon.my',
      nextRun: new Date(2025, 5, 12),
      status: 'Paused'
    }
  ]);

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showNewReportForm, setShowNewReportForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#00205C]">Schedule Reports</h2>
          <p className="text-gray-600">Configure automated report delivery</p>
        </div>
        <Button 
          className="bg-[#00205C] hover:bg-[#001A45]"
          onClick={() => setShowNewReportForm(!showNewReportForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Scheduled Report
        </Button>
      </div>

      {showNewReportForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Scheduled Report</CardTitle>
            <CardDescription>Set up a new recurring report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Report</SelectItem>
                      <SelectItem value="performance">Agent Performance</SelectItem>
                      <SelectItem value="commission">Commission Summary</SelectItem>
                      <SelectItem value="inventory">Inventory Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Assign to Agent</Label>
                  <Select>
                    <SelectTrigger id="recipient">
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ahmad">Ahmad Faizal (AGT001)</SelectItem>
                      <SelectItem value="nur">Nur Hidayah (AGT002)</SelectItem>
                      <SelectItem value="tan">Tan Wei Ming (AGT003)</SelectItem>
                      <SelectItem value="rajesh">Rajesh Kumar (AGT004)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-4">
                  <Checkbox id="notify" />
                  <Label htmlFor="notify">Send email notification</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowNewReportForm(false)}>Cancel</Button>
            <Button className="bg-[#00205C] hover:bg-[#001A45]">Save Schedule</Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>View and manage your scheduled reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.frequency}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.recipient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.nextRun.toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-[#E5241B]">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleReportForm;
