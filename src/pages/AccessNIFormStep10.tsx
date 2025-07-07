
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from 'sonner';

const AccessNIFormStep10 = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  
  const [confirmationChecked, setConfirmationChecked] = useState(false);
  const [declarationDate, setDeclarationDate] = useState({
    day: '01',
    month: '07',
    year: '2025'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!confirmationChecked) {
      newErrors.confirmation = 'You must confirm that you have read and understood the information above';
    }

    if (!declarationDate.day || !declarationDate.month || !declarationDate.year) {
      newErrors.date = 'Please enter a valid date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      updateFormData('declarations', {
        declaration1: true,
        declaration2: true,
        declaration3: true,
        declaration4: true,
        declaration5: true,
        declaration6: true,
        declaration7: true
      });
      navigate('/accessni-form-step11');
    } else {
      toast.error('Please complete all required fields before proceeding');
    }
  };

  const handleBack = () => {
    navigate('/accessni-form-step9');
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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={10} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Applicant's declaration</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-sm font-bold text-gray-700 mb-4">
                By ticking the box below, I confirm that:
              </p>

              <ul className="list-disc pl-6 space-y-3 text-sm text-gray-700">
                <li>the information I have provided in support of this application is complete and true. I will supply AccessNI with any additional information required to verify the information provided in this application. I understand that knowingly to make a false statement in this application is a criminal offence.</li>
                <li>AccessNI may use the information I have supplied on this form for the purposes of identity verification</li>
                <li>AccessNI may use the information I have supplied on this form for the purposes of the prevention or detection of crime in accordance with Schedule 2, paragraph 2(1) of the Data Protection Act 2018</li>
                <li>AccessNI may pass the information I have supplied on this form, and any other information I have supplied in support of this application to other government organisations and law enforcement agencies in accordance with Schedule 2, paragraph 2(1) of the Data Protection Act 2018.</li>
              </ul>

              <div className="flex items-start space-x-3 mt-6">
                <Checkbox
                  id="confirmation"
                  checked={confirmationChecked}
                  onCheckedChange={(checked) => setConfirmationChecked(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="confirmation" className="text-sm font-bold text-gray-700">
                    I confirm that I have read and understood the information above
                  </Label>
                  {errors.confirmation && <p className="text-red-600 text-sm mt-1">{errors.confirmation}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-bold text-gray-700">
                Date of declaration
              </Label>
              <div className="flex space-x-2 max-w-md">
                <div className="flex-1">
                  <Label htmlFor="day" className="text-xs font-bold text-gray-600 block mb-1">Day</Label>
                  <Input
                    id="day"
                    value={declarationDate.day}
                    onChange={(e) => setDeclarationDate(prev => ({ ...prev, day: e.target.value }))}
                    maxLength={2}
                    className="w-full text-center"
                    placeholder="01"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="month" className="text-xs font-bold text-gray-600 block mb-1">Month</Label>
                  <Input
                    id="month"
                    value={declarationDate.month}
                    onChange={(e) => setDeclarationDate(prev => ({ ...prev, month: e.target.value }))}
                    maxLength={2}
                    className="w-full text-center"
                    placeholder="07"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="year" className="text-xs font-bold text-gray-600 block mb-1">Year</Label>
                  <Input
                    id="year"
                    value={declarationDate.year}
                    onChange={(e) => setDeclarationDate(prev => ({ ...prev, year: e.target.value }))}
                    maxLength={4}
                    className="w-full text-center"
                    placeholder="2025"
                  />
                </div>
              </div>
              {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
            </div>

            {/* Data Protection Section */}
            <div className="bg-[#0066CC] text-white p-6 rounded-lg">
              <h3 className="font-bold mb-3 text-lg">Important</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-base mb-2">Data Protection</h4>
                  <p className="text-sm">Information on this form will be treated in confidence.</p>
                </div>
                <p className="text-sm">
                  AccessNI is registered with the Information Commission. Data supplied by you on this form will be processed in accordance with the provisions of the Data Protection Act 2018.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t">
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
                Confirm and proceed
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessNIFormStep10;
