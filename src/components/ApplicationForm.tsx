
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, Upload } from 'lucide-react';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ isOpen, onClose }) => {
  const [formStep, setFormStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [documents, setDocuments] = useState({
    nric: null,
    agentAgreement: null,
    nda: null
  });

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    if (event.target.files && event.target.files[0]) {
      setDocuments(prev => ({
        ...prev,
        [docType]: event.target.files?.[0] || null
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleClose = () => {
    setFormStep(1);
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#00205C]">
            {submitted ? "Application Submitted" : "New Agent Application"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Application submitted successfully!</h3>
            <p className="text-gray-500 text-center">The application has been received and will be reviewed shortly.</p>
            <Button onClick={handleClose} className="mt-2 bg-[#00205C]">Close</Button>
          </div>
        ) : (
          <div>
            {formStep === 1 && (
              <form onSubmit={(e) => {e.preventDefault(); setFormStep(2);}} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Enter full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nric">NRIC</Label>
                    <Input id="nric" placeholder="Enter NRIC" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" placeholder="Enter address" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Select>
                      <SelectTrigger id="branch">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kuala-lumpur">EON AUTO MART KUALA LUMPUR</SelectItem>
                        <SelectItem value="penang">EON AUTO MART PENANG</SelectItem>
                        <SelectItem value="johor-bahru">EON AUTO MART JOHOR BAHRU</SelectItem>
                        <SelectItem value="glenmarie">EON AUTO MART GLENMARIE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Select>
                      <SelectTrigger id="position">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="senior-agent">Senior Agent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                  <Button type="submit" className="bg-[#00205C]">Next: Upload Documents</Button>
                </div>
              </form>
            )}

            {formStep === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Upload Required Documents</h3>
                  <p className="text-sm text-gray-500">Please upload the following documents to complete your application.</p>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="nric-upload" className="font-medium">NRIC</Label>
                        <span className="text-xs text-gray-500">Required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Input 
                            id="nric-upload" 
                            type="file" 
                            className="cursor-pointer"
                            onChange={(e) => handleDocumentChange(e, 'nric')}
                            required
                          />
                        </div>
                        {documents.nric && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="agent-agreement-upload" className="font-medium">Agent Agreement</Label>
                        <span className="text-xs text-gray-500">Required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Input 
                            id="agent-agreement-upload" 
                            type="file" 
                            className="cursor-pointer"
                            onChange={(e) => handleDocumentChange(e, 'agentAgreement')}
                            required
                          />
                        </div>
                        {documents.agentAgreement && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF (Max 5MB)</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="nda-upload" className="font-medium">NDA (Non-Disclosure Agreement)</Label>
                        <span className="text-xs text-gray-500">Required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <Input 
                            id="nda-upload" 
                            type="file" 
                            className="cursor-pointer"
                            onChange={(e) => handleDocumentChange(e, 'nda')}
                            required
                          />
                        </div>
                        {documents.nda && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF (Max 5MB)</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setFormStep(1)}>Back</Button>
                  <div className="space-x-2">
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button 
                      type="submit" 
                      className="bg-[#00205C]" 
                      disabled={submitting || !documents.nric || !documents.agentAgreement || !documents.nda}
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationForm;
