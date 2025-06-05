
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import ApplicationForm from '../components/ApplicationForm';

const Applications: React.FC = () => {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#00205C] dark:text-white">Applications Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Review and manage agent applications</p>
        </div>
        <Button 
          className="bg-[#00205C] hover:bg-[#001A45]"
          onClick={() => setShowApplicationForm(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      {/* Applications content will go here */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Applications list will be displayed here...</p>
      </div>

      <ApplicationForm 
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
      />
    </Layout>
  );
};

export default Applications;
