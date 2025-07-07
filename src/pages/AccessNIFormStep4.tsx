
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from 'sonner';
import { validateDate } from '@/utils/validation';

const AccessNIFormStep4 = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  const [livedSince, setLivedSince] = useState({
    day: formData.currentAddress.livedSince?.day || '',
    month: formData.currentAddress.livedSince?.month || '',
    year: formData.currentAddress.livedSince?.year || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const dateError = validateDate(livedSince.day, livedSince.month, livedSince.year);
    if (dateError) {
      newErrors.livedSince = dateError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      updateFormData('currentAddress', {
        ...formData.currentAddress,
        livedSince: livedSince
      });
      navigate('/accessni-form-step5');
    } else {
      toast.error('Please fix the errors before proceeding');
    }
  };

  const handleBack = () => {
    navigate('/accessni-form-step3');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) navigate('/accessni-form');
    else if (step === 2) navigate('/accessni-form-step2');
    else if (step === 3) navigate('/accessni-form-step3');
    else if (step === 5) navigate('/accessni-form-step5');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={4} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg text-gray-700">Applicant's current address</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md border-l-4 border-blue-500">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">{formData.currentAddress.addressLine1 || '8 LANYON PLACE'}</div>
                  <div className="text-gray-700">{formData.currentAddress.addressLine2 || 'BELFAST'}</div>
                  <div className="text-gray-700">{formData.currentAddress.addressLine3 || 'NORTHERN IRELAND'}</div>
                  <div className="text-gray-700">{formData.currentAddress.postcode || 'BT1 3LP'}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-bold text-gray-700 mb-2 block">
                  Lived at this address since *
                </Label>
                <p className="text-sm text-gray-600 mb-4">
                  Enter the day, month and year from which you have been a resident at this address. If you have lived at your current address for less than five years, you will need to provide your continuous address history for the last five years.
                </p>
                
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  <div>
                    <Label htmlFor="day" className="text-xs font-bold text-gray-600">Day *</Label>
                    <Input
                      id="day"
                      value={livedSince.day}
                      onChange={(e) => setLivedSince(prev => ({ ...prev, day: e.target.value }))}
                      placeholder="1"
                      maxLength={2}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="month" className="text-xs font-bold text-gray-600">Month *</Label>
                    <Input
                      id="month"
                      value={livedSince.month}
                      onChange={(e) => setLivedSince(prev => ({ ...prev, month: e.target.value }))}
                      placeholder="12"
                      maxLength={2}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-xs font-bold text-gray-600">Year *</Label>
                    <Input
                      id="year"
                      value={livedSince.year}
                      onChange={(e) => setLivedSince(prev => ({ ...prev, year: e.target.value }))}
                      placeholder="2024"
                      maxLength={4}
                      className="w-full"
                    />
                  </div>
                </div>
                {errors.livedSince && <p className="text-red-600 text-sm mt-1">{errors.livedSince}</p>}
              </div>
            </div>

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
                type="submit"
                className="bg-[#00703C] hover:bg-[#005a30] text-white px-8 py-2"
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessNIFormStep4;
