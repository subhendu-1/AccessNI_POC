
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StepProgressBar from '@/components/StepProgressBar';
import { CheckCircle } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AccessNIFormStep13 = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();
  
  const caseReferenceNumber = '2000098279';
  const currentDate = new Date().toLocaleDateString('en-GB');
  const phoneNumber = '07454524242';

  const handleReturnToAccessNI = () => {
    navigate('/');
  };

  const handleStepClick = (step: number) => {
    console.log(`Step ${step} clicked - Application complete`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={13} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Confirmation</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <div className="bg-[#00703C] text-white p-6 rounded-lg text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Application complete</h2>
              <p className="text-lg">
                Your case reference number is: <strong>{caseReferenceNumber}</strong>
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <p>
                Thank you. This stage of your application for a Basic check is now complete.
              </p>
              
              <p>
                AccessNI aims to issue:
              </p>
              
              <ul className="list-disc pl-6 space-y-1">
                <li>95 per cent of Basic Disclosure Certificates within 14 calendar days</li>
              </ul>
              
              <p>
                You should note that AccessNI will not begin to process the case until all the necessary identity documentation 
                has been received, and is verified.
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">Applicant name:</p>
                  <p className="text-sm text-gray-900">
                    {`${formData.surname}, ${formData.forename}${formData.middleNames ? ' ' + formData.middleNames : ''}`}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">Application type:</p>
                  <p className="text-sm text-gray-900">Basic check</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">Date:</p>
                  <p className="text-sm text-gray-900">{currentDate}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">Address Line 1:</p>
                  <p className="text-sm text-gray-900">{formData.currentAddress.addressLine1}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">Town:</p>
                  <p className="text-sm text-gray-900">{formData.currentAddress.townCity}</p>
                </div>
                
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-1">Preferred contact number:</p>
                  <p className="text-sm text-gray-900">{formData.contactNumber || phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              <Button 
                onClick={handleReturnToAccessNI}
                className="bg-[#00703C] hover:bg-[#005a30] text-white px-8 py-2"
              >
                Return to AccessNI
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessNIFormStep13;
