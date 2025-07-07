
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StepProgressBar from '@/components/StepProgressBar';

const AccessNIFormStep12Payment = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/accessni-form-step12');
  };

  const handleConfirmPayment = () => {
    // Simulate payment processing and navigate to final confirmation
    navigate('/accessni-form-step13');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) navigate('/accessni-form');
    else if (step === 2) navigate('/accessni-form-step2');
    else if (step === 3) navigate('/accessni-form-step3');
    else if (step === 4) navigate('/accessni-form-step4');
    else if (step === 5) navigate('/accessni-form-step5');
    else if (step === 6) navigate('/accessni-form-step6');
    else if (step === 7) navigate('/accessni-form-step7');
    else if (step === 8) navigate('/accessni-form-step8');
    else if (step === 9) navigate('/accessni-form-step9');
    else if (step === 10) navigate('/accessni-form-step10');
    else if (step === 11) navigate('/accessni-form-step11');
    else if (step === 12) navigate('/accessni-form-step12');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#005EA5] shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">AccessNI</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="/accessni-home" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                AccessNI home
              </a>
              <a href="/my-applications" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                My applications
              </a>
              <a href="/account" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                Account
              </a>
              <span className="text-white text-sm font-medium">Rajani Lanka</span>
              <a href="/logout" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                Log out
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={12} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Payment details</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Payment Details Table */}
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-bold text-sm text-gray-700 w-1/3">
                      Reference
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      WP-2000095531-ys3xe
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-bold text-sm text-gray-700">
                      Description
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      Basic Application
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 font-bold text-sm text-gray-700">
                      Amount
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-bold">
                      £16.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Authentication Container */}
            <div className="bg-gray-100 border border-red-300 rounded-lg p-6">
              {/* Test Mode Warning */}
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md mb-4 text-center">
                <strong>Test Mode - This is not a live transaction.</strong>
              </div>

              {/* Cardholder Authentication */}
              <div className="bg-white border border-gray-300 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Cardholder authentication</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Verified by Visa</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                    >
                      Change payment method
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Please do not click the refresh button as this may interrupt or terminate your transaction.
                  </p>
                  
                  <p className="text-sm text-gray-700">
                    To increase the security of your transactions, card issuers have introduced 3D Secure. You have 
                    received a message asking you to authorize or acknowledge your transaction. Once you respond 
                    the transaction will be completed.
                  </p>
                  
                  <p className="text-sm text-gray-700">
                    This is a challenge window; press <strong>OK</strong>.
                  </p>

                  {/* Simulated 3D Secure Challenge */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
                    <div className="space-y-4">
                      <div className="text-6xl">🔒</div>
                      <p className="text-lg font-bold text-gray-900">3D Secure Authentication</p>
                      <p className="text-sm text-gray-600">
                        Your card issuer is requesting additional authentication for this transaction.
                      </p>
                      <Button 
                        onClick={handleConfirmPayment}
                        className="bg-[#0066CC] hover:bg-[#0052A3] text-white px-8 py-2"
                      >
                        OK
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancel Button */}
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={handleCancel}
                className="px-8 py-2"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-blue-600">
            <a href="/crown-copyright" className="hover:text-blue-800 transition-colors underline">
              © Crown copyright (opens in a new tab)
            </a>
            <a href="/terms-and-conditions" className="hover:text-blue-800 transition-colors underline">
              Terms and conditions (opens in a new tab)
            </a>
            <a href="/privacy" className="hover:text-blue-800 transition-colors underline">
              Privacy (opens in a new tab)
            </a>
            <a href="/cookies" className="hover:text-blue-800 transition-colors underline">
              Cookies (opens in a new tab)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AccessNIFormStep12Payment;
