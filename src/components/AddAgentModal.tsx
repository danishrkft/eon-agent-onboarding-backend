
import React from 'react';
import { X } from 'lucide-react';

interface AddAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const malaysianBanks = [
  'Maybank', 'CIMB Bank', 'Public Bank', 'RHB Bank', 'Hong Leong Bank', 
  'AmBank', 'UOB Malaysia', 'OCBC Bank', 'HSBC Malaysia', 'Bank Rakyat',
  'Bank Islam', 'Affin Bank', 'Alliance Bank', 'Standard Chartered', 'Citibank'
];

const malaysianStates = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka', 
  'Negeri Sembilan', 'Pahang', 'Perak', 'Perlis', 'Pulau Pinang', 'Putrajaya',
  'Sabah', 'Sarawak', 'Selangor', 'Terengganu'
];

const AddAgentModal: React.FC<AddAgentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    nric: '',
    mobile: '',
    dob: '',
    bankAccount: '',
    issuingBank: '',
    district: '',
    state: '',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg max-h-[90vh] overflow-auto animate-in fade-in-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-medium text-eon-blue">Add New Agent</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name*
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="nric" className="block text-sm font-medium text-gray-700">
                NRIC*
              </label>
              <input
                type="text"
                id="nric"
                name="nric"
                placeholder="e.g., 901234567890"
                required
                value={formData.nric}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number*
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="e.g., 60123456789"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth*
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender*
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700">
                Bank Account Number*
              </label>
              <input
                type="text"
                id="bankAccount"
                name="bankAccount"
                required
                value={formData.bankAccount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="issuingBank" className="block text-sm font-medium text-gray-700">
                Issuing Bank*
              </label>
              <select
                id="issuingBank"
                name="issuingBank"
                required
                value={formData.issuingBank}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              >
                <option value="">Select Bank</option>
                {malaysianBanks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                District*
              </label>
              <input
                type="text"
                id="district"
                name="district"
                required
                placeholder="e.g., Shah Alam"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State*
              </label>
              <select
                id="state"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-eon-blue"
              >
                <option value="">Select State</option>
                {malaysianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-eon-blue text-white rounded-md hover:bg-eon-blue/90"
            >
              Add Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgentModal;
