import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AlertTriangle, Upload, FileText, CheckCircle } from 'lucide-react';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from 'sonner';

const AccessNIFormStep9 = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File | null}>({});
  const [uploadStatus, setUploadStatus] = useState<{[key: string]: 'pending' | 'uploading' | 'success' | 'error'}>({});

  const documentMap: {[key: string]: string} = {
    'originalBirth': 'Original Birth certificate (issued within 12 months of birth)',
    'certifiedBirth': 'Certified copy of birth certificate (issued more than 12 months after time of birth)',
    'longFormBirth': 'Long form Irish birth certificate (issued at time of registration of birth)',
    'adoptionCert': 'Adoption Certificate',
    'passport': 'Passport',
    'irishPassportCard': 'Irish Passport Card',
    'drivingLicencePhoto': 'Current driving licence photocard',
    'drivingLicenceFull': 'Current driving licence photocard (full or provisional)',
    'drivingLicencePaper': 'Current driving licence (full or provisional) - paper version',
    'visaShare': 'eVisa share code',
    'utilityBill': 'Utility bill (not mobile phone)',
    'benefitStatement': 'Benefit statement',
    'officialGovDoc': 'Official Government/Council Document',
    'healthInsurance': 'European Health Insurance Card (EHIC) or Global Health Insurance Card (GHIC)',
    'eeaNationalId': 'EEA National ID card',
    'smartPass': 'SmartPass issued by Translink',
    'yLink': 'yLink card issued by Translink',
    'passAccreditation': 'Cards carrying the PASS accreditation logo',
    'teacherLetter': 'Letter from head teacher or further education college principal',
    'sponsorshipLetter': 'Letter of sponsorship from future employment provider or voluntary organisation',
    'exceptionalCircs': 'Exceptional circumstances – Document agreed with AccessNI'
  };

  const handleFileUpload = async (documentId: string, file: File) => {
    if (!file) return;

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid document format (JPG, PNG, PDF, DOC, DOCX)');
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setUploadStatus(prev => ({ ...prev, [documentId]: 'uploading' }));
    
    // Simulate upload process
    setTimeout(() => {
      setUploadedFiles(prev => ({ ...prev, [documentId]: file }));
      setUploadStatus(prev => ({ ...prev, [documentId]: 'success' }));
      toast.success(`${file.name} uploaded successfully`);
    }, 2000);
  };

  const handleNext = () => {
    const requiredUploads = formData.selectedDocuments.filter(doc => doc !== 'visaShare');
    const completedUploads = requiredUploads.filter(doc => uploadedFiles[doc]);
    
    if (completedUploads.length < requiredUploads.length) {
      toast.error('Please upload all required documents before proceeding');
      return;
    }
    
    navigate('/accessni-form-step10');
  };

  const handleBack = () => {
    navigate('/accessni-form-step8');
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={9} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Upload identity documents for the application</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Information Message */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  For each document, click choose file button to browse and select the document followed by upload button.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>NOTE:</strong> Please do not use a dark background or zoom in when photographing your document. 
                  Documents must be in either .jpg, .png, word document, or PDF format.
                </p>
              </div>
            </div>

            {/* Upload Documents Section */}
            <div className="bg-[#0066CC] text-white p-3 rounded-t-md">
              <h3 className="font-bold text-lg">Upload Documents</h3>
            </div>

            {/* Document Upload Forms */}
            <div className="space-y-6">
              {formData.selectedDocuments.map((docId) => (
                <div key={docId} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-4">
                    <Label className="text-sm font-bold text-gray-900 block mb-2">
                      {documentMap[docId]}
                    </Label>
                    
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(docId, file);
                          }
                        }}
                        className="flex-1"
                      />
                      
                      {uploadStatus[docId] === 'uploading' && (
                        <div className="flex items-center space-x-2 text-blue-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span className="text-sm">Uploading...</span>
                        </div>
                      )}
                      
                      {uploadStatus[docId] === 'success' && (
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Uploaded</span>
                        </div>
                      )}
                      
                      {uploadedFiles[docId] && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                        >
                          Upload
                        </Button>
                      )}
                    </div>
                    
                    {uploadedFiles[docId] && (
                      <div className="mt-2 text-sm text-gray-600">
                        Selected: {uploadedFiles[docId]?.name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Help Text */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
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

export default AccessNIFormStep9;
