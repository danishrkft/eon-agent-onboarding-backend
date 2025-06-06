
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';

interface TriggerPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PayoutState = 'confirm' | 'processing' | 'success' | 'error';

const TriggerPayoutModal: React.FC<TriggerPayoutModalProps> = ({ open, onOpenChange }) => {
  const [payoutState, setPayoutState] = useState<PayoutState>('confirm');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock data for demonstration
  const payoutData = {
    period: 'May 2025',
    eligibleAgents: 34,
    totalAmount: 12450.00,
    topRecipients: [
      { name: 'Agent Smith', amount: 1250.00 },
      { name: 'Agent Johnson', amount: 1100.00 },
      { name: 'Agent Wilson', amount: 950.00 },
      { name: 'Agent Brown', amount: 850.00 },
      { name: 'Agent Davis', amount: 800.00 }
    ]
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const handleConfirmPayout = async () => {
    setPayoutState('processing');
    
    // Simulate API call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          const shouldSucceed = Math.random() > 0.3;
          if (shouldSucceed) {
            resolve(true);
          } else {
            reject(new Error('No eligible agents found for this period'));
          }
        }, 2000);
      });
      
      setPayoutState('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setPayoutState('error');
    }
  };

  const handleRetry = () => {
    setPayoutState('confirm');
    setErrorMessage('');
  };

  const handleClose = () => {
    setPayoutState('confirm');
    setErrorMessage('');
    onOpenChange(false);
  };

  const renderConfirmContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-[#00205C]">
          Confirm Payout Trigger
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6 pt-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium mb-2">Summary of Action:</p>
          <p className="text-sm text-blue-700">
            You are about to trigger commission payouts for all eligible agents for the selected period.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Payout Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Payout Period</p>
              <p className="font-medium">{payoutData.period}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number of Eligible Agents</p>
              <p className="font-medium">{payoutData.eligibleAgents}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Total Payout Amount</p>
              <p className="text-lg font-bold text-[#00205C]">{formatCurrency(payoutData.totalAmount)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Top 5 Recipients</h4>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Agent</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payoutData.topRecipients.map((recipient, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{recipient.name}</td>
                    <td className="px-4 py-2 text-right font-medium">{formatCurrency(recipient.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View full list →
          </button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-yellow-800">Important Warnings:</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• This action is irreversible.</li>
                <li>• Ensure that all commissions are verified and finalized.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmPayout}
            style={{ backgroundColor: '#2563eb' }}
            className="text-white hover:opacity-90"
          >
            Confirm and Trigger Payout
          </Button>
        </div>
      </div>
    </>
  );

  const renderProcessingContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-[#00205C]">
          Processing Payout
        </DialogTitle>
      </DialogHeader>
      
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="text-lg font-medium text-gray-900">Processing payout. Please wait...</p>
        <p className="text-sm text-gray-500">This may take a few moments to complete.</p>
      </div>
    </>
  );

  const renderSuccessContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-green-600">
          Payout Triggered Successfully!
        </DialogTitle>
      </DialogHeader>
      
      <div className="flex flex-col items-center justify-center py-8 space-y-6">
        <CheckCircle className="h-16 w-16 text-green-600" />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-900">
            Payouts have been triggered for {payoutData.eligibleAgents} agents.
          </p>
          <p className="text-sm text-gray-500">
            Total amount: {formatCurrency(payoutData.totalAmount)}
          </p>
        </div>
        
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          View Payout Report →
        </button>
        
        <Button onClick={handleClose} className="mt-4">
          Close
        </Button>
      </div>
    </>
  );

  const renderErrorContent = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-red-600">
          Payout Failed
        </DialogTitle>
      </DialogHeader>
      
      <div className="flex flex-col items-center justify-center py-8 space-y-6">
        <XCircle className="h-16 w-16 text-red-600" />
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-900">
            Failed to trigger payout. Please try again or contact support.
          </p>
          {errorMessage && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              Error: {errorMessage}
            </p>
          )}
        </div>
        
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleRetry}>
            Retry
          </Button>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (payoutState) {
      case 'confirm':
        return renderConfirmContent();
      case 'processing':
        return renderProcessingContent();
      case 'success':
        return renderSuccessContent();
      case 'error':
        return renderErrorContent();
      default:
        return renderConfirmContent();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default TriggerPayoutModal;
