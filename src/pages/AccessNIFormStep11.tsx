
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from 'sonner';
import { validateRequired } from '@/utils/validation';

const AccessNIFormStep11 = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  
  const [cardholderAddressSame, setCardholderAddressSame] = useState(
    formData.cardholderAddressSame !== undefined ? (formData.cardholderAddressSame ? 'yes' : 'no') : ''
  );
  
  const [cardholderAddress, setCardholderAddress] = useState({
    addressLine1: formData.cardholderAddress?.addressLine1 || '',
    addressLine2: formData.cardholderAddress?.addressLine2 || '',
    addressLine3: formData.cardholderAddress?.addressLine3 || '',
    townCity: formData.cardholderAddress?.townCity || '',
    county: formData.cardholderAddress?.county || '',
    country: formData.cardholderAddress?.country || 'United Kingdom',
    postcode: formData.cardholderAddress?.postcode || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cardholderAddressSame === 'yes' && formData.currentAddress) {
      setCardholderAddress({
        addressLine1: formData.currentAddress.addressLine1 || '',
        addressLine2: formData.currentAddress.addressLine2 || '',
        addressLine3: formData.currentAddress.addressLine3 || '',
        townCity: formData.currentAddress.townCity || '',
        county: formData.currentAddress.county || '',
        country: formData.currentAddress.country || 'United Kingdom',
        postcode: formData.currentAddress.postcode || ''
      });
    }
  }, [cardholderAddressSame, formData.currentAddress]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const addressSameError = validateRequired(cardholderAddressSame, 'Address selection');
    if (addressSameError) {
      newErrors.cardholderAddressSame = addressSameError;
    }

    if (cardholderAddressSame === 'no') {
      const addressLine1Error = validateRequired(cardholderAddress.addressLine1, 'Address line 1');
      if (addressLine1Error) newErrors.addressLine1 = addressLine1Error;

      const townCityError = validateRequired(cardholderAddress.townCity, 'Town/city');
      if (townCityError) newErrors.townCity = townCityError;

      const countryError = validateRequired(cardholderAddress.country, 'Country');
      if (countryError) newErrors.country = countryError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      updateFormData('cardholderAddressSame', cardholderAddressSame === 'yes');
      updateFormData('cardholderAddress', cardholderAddress);
      navigate('/accessni-form-step12');
    } else {
      toast.error('Please fix the errors before proceeding');
    }
  };

  const handleBack = () => {
    navigate('/accessni-form-step10');
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
  };

  const handleFindAddress = () => {
    if (cardholderAddress.postcode.trim()) {
      setCardholderAddress(prev => ({
        ...prev,
        addressLine1: '8 LANYON PLACE',
        townCity: 'BELFAST',
        postcode: 'BT1 3LP'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={11} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Cardholder address</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-sm font-bold text-gray-700">
                Is your card billing address the same as your current address? *
              </Label>
              
              <RadioGroup 
                value={cardholderAddressSame} 
                onValueChange={setCardholderAddressSame}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes" className="text-sm font-medium text-gray-700">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no" className="text-sm font-medium text-gray-700">No</Label>
                </div>
              </RadioGroup>
              {errors.cardholderAddressSame && <p className="text-red-600 text-sm mt-1">{errors.cardholderAddressSame}</p>}
            </div>

            {cardholderAddressSame === 'no' && (
              <div className="space-y-6 border-t pt-6">
                <div>
                  <Label className="text-sm font-bold text-gray-700 mb-2 block">
                    Search for postcode
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    To find your address, enter a valid postcode in United Kingdom
                  </p>
                  
                  <div className="flex space-x-2 max-w-md">
                    <Input
                      value={cardholderAddress.postcode}
                      onChange={(e) => setCardholderAddress(prev => ({ ...prev, postcode: e.target.value }))}
                      placeholder="BT1 3LP"
                      className="flex-1"
                    />
                    <Button 
                      type="button"
                      onClick={handleFindAddress}
                      className="bg-[#00703C] hover:bg-[#005a30] text-white px-6"
                    >
                      Find address
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  If you don't live in the UK, or if you can't find your address, enter your address below
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="addressLine1" className="text-sm font-bold text-gray-700">
                      Address line 1 *
                    </Label>
                    <Input
                      id="addressLine1"
                      value={cardholderAddress.addressLine1}
                      onChange={(e) => setCardholderAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                      className="w-full"
                    />
                    {errors.addressLine1 && <p className="text-red-600 text-sm mt-1">{errors.addressLine1}</p>}
                  </div>

                  <div>
                    <Label htmlFor="addressLine2" className="text-sm font-bold text-gray-700">
                      Address line 2 (optional)
                    </Label>
                    <Input
                      id="addressLine2"
                      value={cardholderAddress.addressLine2}
                      onChange={(e) => setCardholderAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="addressLine3" className="text-sm font-bold text-gray-700">
                      Address line 3 (optional)
                    </Label>
                    <Input
                      id="addressLine3"
                      value={cardholderAddress.addressLine3}
                      onChange={(e) => setCardholderAddress(prev => ({ ...prev, addressLine3: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="townCity" className="text-sm font-bold text-gray-700">
                      Town/city *
                    </Label>
                    <Input
                      id="townCity"
                      value={cardholderAddress.townCity}
                      onChange={(e) => setCardholderAddress(prev => ({ ...prev, townCity: e.target.value }))}
                      className="w-full"
                    />
                    {errors.townCity && <p className="text-red-600 text-sm mt-1">{errors.townCity}</p>}
                  </div>

                  <div>
                    <Label htmlFor="county" className="text-sm font-bold text-gray-700">
                      County (optional)
                    </Label>
                    <Input
                      id="county"
                      value={cardholderAddress.county}
                      onChange={(e) => setCardholderAddress(prev => ({ ...prev, county: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country" className="text-sm font-bold text-gray-700">
                      Country *
                    </Label>
                    <Select 
                      value={cardholderAddress.country} 
                      onValueChange={(value) => setCardholderAddress(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger className="w-full md:w-1/2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
                  </div>

                  <div>
                    <Label htmlFor="postcode" className="text-sm font-bold text-gray-700">
                      Postcode (optional)
                    </Label>
                    <Input
                      id="postcode"
                      value={cardholderAddress.postcode}
                      onChange={(e) => setCardholderAddress(prev => ({ ...prev, postcode: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

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

export default AccessNIFormStep11;
