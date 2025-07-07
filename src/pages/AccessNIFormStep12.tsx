import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AccessNIFormStep12 = () => {
  const navigate = useNavigate();
  const [paymentData] = useState({
    reference: 'WP-2000095531-ys3xe',
    description: 'Basic Application',
    amount: '£16.00'
  });

  const handleNext = () => {
    navigate('/accessni-form-step12-payment');
  };

  const handleBack = () => {
    navigate('/accessni-form-step11');
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
                      {paymentData.reference}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 bg-gray-50 font-bold text-sm text-gray-700">
                      Description
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {paymentData.description}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 font-bold text-sm text-gray-700">
                      Amount
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-bold">
                      {paymentData.amount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payment Form Container */}
            <div className="bg-gray-100 border border-red-300 rounded-lg p-6">
              {/* Test Mode Warning */}
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-md mb-4 text-center">
                <strong>Test Mode - This is not a live transaction.</strong>
              </div>

              {/* Payment Form Placeholder */}
              <div className="bg-white border border-gray-300 rounded-lg p-6">
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Payment form will be loaded here</p>
                  <p className="text-sm text-gray-500">
                    In the actual implementation, this would contain the secure payment form
                    with card details entry fields and payment processing functionality.
                  </p>
                </div>
              </div>
            </div>

            {/* Continue to Payment Button */}
            <div className="text-center">
              <Button 
                onClick={handleNext}
                className="bg-[#00703C] hover:bg-[#005a30] text-white px-8 py-2 text-lg"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessNIFormStep12;
