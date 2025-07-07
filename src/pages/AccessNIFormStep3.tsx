import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from 'sonner';
import { validateRequired, validatePostcode } from '@/utils/validation';

const AccessNIFormStep3 = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  const [postcode, setPostcode] = useState('');
  const [currentAddress, setCurrentAddress] = useState({
    addressLine1: formData.currentAddress.addressLine1 || '',
    addressLine2: formData.currentAddress.addressLine2 || '',
    addressLine3: formData.currentAddress.addressLine3 || '',
    townCity: formData.currentAddress.townCity || '',
    county: formData.currentAddress.county || '',
    country: formData.currentAddress.country || 'Northern Ireland',
    postcode: formData.currentAddress.postcode || ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleFindAddress = () => {
    if (!postcode.trim()) {
      toast.error('Please enter a postcode');
      return;
    }
    
    const postcodeError = validatePostcode(postcode);
    if (postcodeError) {
      toast.error(postcodeError);
      return;
    }
    
    // Simulate address lookup
    setCurrentAddress(prev => ({
      ...prev,
      addressLine1: '8 LANYON PLACE',
      townCity: 'BELFAST', 
      postcode: postcode
    }));
    toast.success('Address found');
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    const addressLine1Error = validateRequired(currentAddress.addressLine1, 'Address line 1');
    if (addressLine1Error) newErrors.addressLine1 = addressLine1Error;
    
    const townCityError = validateRequired(currentAddress.townCity, 'Town/city');
    if (townCityError) newErrors.townCity = townCityError;
    
    if (!currentAddress.country) newErrors.country = 'Country is required';
    
    const postcodeError = validatePostcode(currentAddress.postcode);
    if (postcodeError) newErrors.postcode = postcodeError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before proceeding');
      return;
    }
    
    updateFormData('currentAddress', currentAddress);
    navigate('/accessni-form-step4');
  };

  const handleBack = () => {
    navigate('/accessni-form-step2');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) navigate('/accessni-form');
    else if (step === 2) navigate('/accessni-form-step2');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={3} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Applicant's current address</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-bold text-gray-700 block mb-2">
                Search for postcode
              </Label>
              <p className="text-sm text-gray-600 mb-3">
                To find your address, enter a valid postcode in United Kingdom
              </p>
              <div className="flex space-x-3 max-w-md">
                <Input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="Enter postcode"
                  className="flex-1"
                />
                <Button
                  onClick={handleFindAddress}
                  className="bg-[#00703C] hover:bg-[#005a30] text-white"
                >
                  Find address
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              If you don't live in the UK, or if you can't find your address, enter your address below.
            </p>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="addressLine1" className="text-sm font-bold text-gray-700">
                  Address line 1 *
                </Label>
                <Input
                  id="addressLine1"
                  value={currentAddress.addressLine1}
                  onChange={(e) => setCurrentAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                  placeholder="8 LANYON PLACE"
                  className={`w-full ${errors.addressLine1 ? 'border-red-500' : ''}`}
                  required
                />
                {errors.addressLine1 && <p className="text-sm text-red-600 mt-1">{errors.addressLine1}</p>}
              </div>

              <div>
                <Label htmlFor="addressLine2" className="text-sm font-bold text-gray-700">
                  Address line 2
                </Label>
                <Input
                  id="addressLine2"
                  value={currentAddress.addressLine2}
                  onChange={(e) => setCurrentAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                  placeholder="Unit 1"
                  className="w-full"
                />
                {errors.addressLine2 && <p className="text-sm text-red-600 mt-1">{errors.addressLine2}</p>}
              </div>

              <div>
                <Label htmlFor="addressLine3" className="text-sm font-bold text-gray-700">
                  Address line 3
                </Label>
                <Input
                  id="addressLine3"
                  value={currentAddress.addressLine3}
                  onChange={(e) => setCurrentAddress(prev => ({ ...prev, addressLine3: e.target.value }))}
                  placeholder="Belfast"
                  className="w-full"
                />
                {errors.addressLine3 && <p className="text-sm text-red-600 mt-1">{errors.addressLine3}</p>}
              </div>

              <div>
                <Label htmlFor="townCity" className="text-sm font-bold text-gray-700">
                  Town/city *
                </Label>
                <Input
                  id="townCity"
                  value={currentAddress.townCity}
                  onChange={(e) => setCurrentAddress(prev => ({ ...prev, townCity: e.target.value }))}
                  placeholder="Belfast"
                  className="w-full"
                />
                {errors.townCity && <p className="text-sm text-red-600 mt-1">{errors.townCity}</p>}
              </div>

              <div>
                <Label htmlFor="county" className="text-sm font-bold text-gray-700">
                  County
                </Label>
                <Input
                  id="county"
                  value={currentAddress.county}
                  onChange={(e) => setCurrentAddress(prev => ({ ...prev, county: e.target.value }))}
                  placeholder="Belfast"
                  className="w-full"
                />
                {errors.county && <p className="text-sm text-red-600 mt-1">{errors.county}</p>}
              </div>

              <div>
                <Label htmlFor="country" className="text-sm font-bold text-gray-700">
                  Country *
                </Label>
                <Select value={currentAddress.country} onValueChange={(value) => setCurrentAddress(prev => ({ ...prev, country: value }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country}</p>}
              </div>

              <div>
                <Label htmlFor="postcode" className="text-sm font-bold text-gray-700">
                  Postcode *
                </Label>
                <Input
                  id="postcode"
                  value={currentAddress.postcode}
                  onChange={(e) => setCurrentAddress(prev => ({ ...prev, postcode: e.target.value }))}
                  placeholder="BT21 1AA"
                  className="w-full"
                />
                {errors.postcode && <p className="text-sm text-red-600 mt-1">{errors.postcode}</p>}
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

export default AccessNIFormStep3;
