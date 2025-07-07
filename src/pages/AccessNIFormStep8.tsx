import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertTriangle } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';

const AccessNIFormStep8 = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>(formData.selectedDocuments || []);
  const [visaShareCode, setVisaShareCode] = useState(formData.visaShareCode || '');

  const documents = [
    {
      id: 'originalBirth',
      title: 'Original Birth certificate (issued within 12 months of birth)',
      subtitle: 'UK, Isle of Man and Channel Islands - including those issued by UK authorities overseas, eg Embassies, High Commissions and HM Forces'
    },
    {
      id: 'certifiedBirth',
      title: 'Certified copy of birth certificate (issued more than 12 months after time of birth)',
      subtitle: 'UK, Isle of Man, Channel Islands or Ireland'
    },
    {
      id: 'longFormBirth',
      title: 'Long form Irish birth certificate (issued at time of registration of birth)',
      subtitle: 'Ireland'
    },
    {
      id: 'adoptionCert',
      title: 'Adoption Certificate',
      subtitle: 'UK, Channel Islands or Ireland'
    },
    {
      id: 'passport',
      title: 'Passport',
      subtitle: 'Any current and valid passport'
    },
    {
      id: 'irishPassportCard',
      title: 'Irish Passport Card',
      subtitle: 'Cannot be used with an Irish passport, Current and Valid'
    },
    {
      id: 'drivingLicencePhoto',
      title: 'Current driving licence photocard',
      subtitle: 'Full or provisional - UK, Isle of Man, Channel Islands or Ireland'
    },
    {
      id: 'drivingLicenceFull',
      title: 'Current driving licence photocard (full or provisional)',
      subtitle: 'All countries outside the UK (excluding Isle of Man and Channel Islands)'
    },
    {
      id: 'drivingLicencePaper',
      title: 'Current driving licence (full or provisional) - paper version (if issued before 2000)',
      subtitle: 'UK, Isle of Man, Channel Islands and Ireland'
    },
    {
      id: 'visaShare',
      title: 'eVisa share code',
      subtitle: 'Please enter a share code for your eVisa',
      hasInput: true
    },
    {
      id: 'utilityBill',
      title: 'Utility bill (not mobile phone)',
      subtitle: 'UK or Ireland, dated within 3 months'
    },
    {
      id: 'benefitStatement',
      title: 'Benefit statement, for example Child Benefit, Pension etc',
      subtitle: 'UK, dated within 3 months'
    },
    {
      id: 'officialGovDoc',
      title: 'Official Government/Council Document',
      subtitle: 'Central or local government, government agency, or local council document giving entitlement, for example from the Department for Work and Pensions or, the Employment Service, dated within the last 3 months. HMRC self-assessment or tax demand letter, dated within 12 months. UK and Channel Islands.'
    },
    {
      id: 'healthInsurance',
      title: 'European Health Insurance Card (EHIC) or Global Health Insurance Card (GHIC)',
      subtitle: 'UK, must be valid'
    },
    {
      id: 'eeaNationalId',
      title: 'EEA National ID card',
      subtitle: 'Current and Valid'
    },
    {
      id: 'smartPass',
      title: 'SmartPass issued by Translink',
      subtitle: 'Northern Ireland'
    },
    {
      id: 'yLink',
      title: 'yLink card issued by Translink',
      subtitle: 'Northern Ireland'
    },
    {
      id: 'passAccreditation',
      title: 'Cards carrying the PASS accreditation logo',
      subtitle: 'UK, Isle of Man and Channel Islands. Current and Valid. Issued by an approved digital PASS provider with a QR code to confirm details.'
    },
    {
      id: 'teacherLetter',
      title: 'Letter from head teacher or further education college principal',
      subtitle: 'UK - for 16 to 19 year olds in full time education - only in exceptional circumstances if other documents cannot be provided. Issued within the last month'
    },
    {
      id: 'sponsorshipLetter',
      title: 'Letter of sponsorship from future employment provider or voluntary organisation',
      subtitle: 'Non UK only - Valid only for applicants residing outside UK and Ireland at time of application'
    },
    {
      id: 'exceptionalCircs',
      title: 'Exceptional circumstances – Document agreed with AccessNI',
      subtitle: 'Cannot be used unless advised by AccessNI'
    }
  ];

  const handleDocumentChange = (documentId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocuments(prev => [...prev, documentId]);
    } else {
      setSelectedDocuments(prev => prev.filter(id => id !== documentId));
    }
  };

  const handleNext = () => {
    // Store selected documents and visa share code in form context
    updateFormData('selectedDocuments', selectedDocuments);
    updateFormData('visaShareCode', visaShareCode);
    
    console.log('Selected documents:', selectedDocuments);
    console.log('Visa share code:', visaShareCode);
    navigate('/accessni-form-step9');
  };

  const handleBack = () => {
    navigate('/accessni-form-step7');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) navigate('/accessni-form');
    else if (step === 2) navigate('/accessni-form-step2');
    else if (step === 3) navigate('/accessni-form-step3');
    else if (step === 4) navigate('/accessni-form-step4');
    else if (step === 5) navigate('/accessni-form-step5');
    else if (step === 6) navigate('/accessni-form-step6');
    else if (step === 7) navigate('/accessni-form-step7');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={8} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Select identity documents for the application</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Warning Message */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 font-medium">
                  You are now required to upload two identity documents from the following list so that information provided on your application can be verified. To help avoid delays, where possible you should select the first document on this list (as this document contains personal information that confirms your name(s) at birth and date of birth) and a second document that contains both your current name and a recent photographic image of yourself.
                </p>
              </div>
            </div>

            {/* Document Checkboxes */}
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={doc.id}
                      checked={selectedDocuments.includes(doc.id)}
                      onCheckedChange={(checked) => handleDocumentChange(doc.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={doc.id} className="text-sm font-bold text-gray-900 cursor-pointer">
                        {doc.title}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {doc.subtitle}
                      </p>
                      {doc.hasInput && selectedDocuments.includes(doc.id) && (
                        <div className="mt-3">
                          <Input
                            value={visaShareCode}
                            onChange={(e) => setVisaShareCode(e.target.value)}
                            placeholder="Please enter a share code for your eVisa"
                            className="max-w-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm text-gray-700">
                Where an individual has difficulty providing the required range of identity documentation please seek AccessNI assistance at{' '}
                <a href="mailto:accessni-contact@accessni.gov.uk" className="text-blue-600 underline">
                  accessni-contact@accessni.gov.uk
                </a>
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                type="button"
                variant="outline"
                onClick={handleBack}
                className="px-8 py-2"
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-[#00703C] hover:bg-[#005a30] text-white px-8 py-2"
                disabled={selectedDocuments.length === 0}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessNIFormStep8;
