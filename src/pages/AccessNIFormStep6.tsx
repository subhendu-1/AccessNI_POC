
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormContext } from '@/contexts/FormContext';
import { validateRequired } from '@/utils/validation';

const AccessNIFormStep6 = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  const [localData, setLocalData] = useState({
    paperCertificate: formData.paperCertificate,
    sendToCurrentAddress: formData.sendToCurrentAddress ? 'yes' : 'no',
    postcode: '',
    selectedAddress: '',
    ...formData.deliveryAddress
  });
  const [addressFound, setAddressFound] = useState(false);

  const handleFindAddress = () => {
    if (localData.postcode.trim()) {
      setAddressFound(true);
      setLocalData(prev => ({
        ...prev,
        selectedAddress: '8 LANYON PLACE, BELFAST BT1 3LP',
        addressLine1: '8 LANYON PLACE',
        townCity: 'BELFAST',
        postcode: 'BT1 3LP'
      }));
    }
  };

  const handleNext = () => {
    // Update form context
    updateFormData('paperCertificate', localData.paperCertificate);
    updateFormData('sendToCurrentAddress', localData.sendToCurrentAddress === 'yes');
    updateFormData('deliveryAddress', {
      addressLine1: localData.addressLine1,
      addressLine2: localData.addressLine2,
      addressLine3: localData.addressLine3,
      townCity: localData.townCity,
      county: localData.county,
      country: localData.country,
      postcode: localData.postcode
    });
    
    navigate('/accessni-form-step7');
  };

  const handleBack = () => {
    navigate('/accessni-form-step5');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) navigate('/accessni-form');
    else if (step === 2) navigate('/accessni-form-step2');
    else if (step === 3) navigate('/accessni-form-step3');
    else if (step === 4) navigate('/accessni-form-step4');
    else if (step === 5) navigate('/accessni-form-step5');
  };

  // Auto-populate with current address when "No" is selected
  const handleAddressOptionChange = (value: string) => {
    setLocalData(prev => ({ ...prev, sendToCurrentAddress: value }));
    if (value === 'no') {
      setLocalData(prev => ({
        ...prev,
        addressLine1: formData.currentAddress.addressLine1 || '8 LANYON PLACE',
        addressLine2: formData.currentAddress.addressLine2 || '',
        addressLine3: formData.currentAddress.addressLine3 || '',
        townCity: formData.currentAddress.townCity || 'BELFAST',
        county: formData.currentAddress.county || 'NORTHERN IRELAND',
        country: formData.currentAddress.country || 'United Kingdom',
        postcode: formData.currentAddress.postcode || 'BT1 3LP'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={6} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Delivery details</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <p className="text-sm text-gray-700">
              If there is no information to disclose, you will be sent a digital AccessNI certificate.
            </p>
            
            <p className="text-sm text-gray-700">
              If information is to be disclosed, you will receive a paper certificate by post.
            </p>

            {/* Paper Certificate Option */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="paperCertificate"
                  checked={localData.paperCertificate}
                  onCheckedChange={(checked) => 
                    setLocalData(prev => ({ ...prev, paperCertificate: checked as boolean }))
                  }
                />
                <div>
                  <Label htmlFor="paperCertificate" className="text-sm font-bold text-gray-700">
                    If you need a paper certificate check the box below. Paper certificates take longer to deliver. (optional)
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    This option is only available if you live in the UK.
                  </p>
                </div>
              </div>
            </div>

            {/* Address Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-bold text-gray-700">
                If applicable, do you want the paper certificate sent to your current address?
              </Label>
              
              <RadioGroup 
                value={localData.sendToCurrentAddress} 
                onValueChange={handleAddressOptionChange}
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
            </div>

            {/* Address Entry (shown when No is selected) */}
            {localData.sendToCurrentAddress === 'no' && (
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
                      value={localData.postcode}
                      onChange={(e) => setLocalData(prev => ({ ...prev, postcode: e.target.value }))}
                      placeholder="BT1 3LP"
                      className="flex-1"
                    />
                    <Button 
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
                    <Label htmlFor="deliveryLine1" className="text-sm font-bold text-gray-700">
                      Address line 1
                    </Label>
                    <Input
                      id="deliveryLine1"
                      value={localData.addressLine1}
                      onChange={(e) => setLocalData(prev => ({ ...prev, addressLine1: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryLine2" className="text-sm font-bold text-gray-700">
                      Address line 2 (optional)
                    </Label>
                    <Input
                      id="deliveryLine2"
                      value={localData.addressLine2}
                      onChange={(e) => setLocalData(prev => ({ ...prev, addressLine2: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryLine3" className="text-sm font-bold text-gray-700">
                      Address line 3 (optional)
                    </Label>
                    <Input
                      id="deliveryLine3"
                      value={localData.addressLine3}
                      onChange={(e) => setLocalData(prev => ({ ...prev, addressLine3: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryTownCity" className="text-sm font-bold text-gray-700">
                      Town/city
                    </Label>
                    <Input
                      id="deliveryTownCity"
                      value={localData.townCity}
                      onChange={(e) => setLocalData(prev => ({ ...prev, townCity: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryCounty" className="text-sm font-bold text-gray-700">
                      County (optional)
                    </Label>
                    <Input
                      id="deliveryCounty"
                      value={localData.county}
                      onChange={(e) => setLocalData(prev => ({ ...prev, county: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deliveryCountry" className="text-sm font-bold text-gray-700">
                      Country
                    </Label>
                    <Select 
                      value={localData.country} 
                      onValueChange={(value) => setLocalData(prev => ({ ...prev, country: value }))}
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
                  </div>

                  <div>
                    <Label htmlFor="deliveryPostcode" className="text-sm font-bold text-gray-700">
                      Postcode (optional)
                    </Label>
                    <Input
                      id="deliveryPostcode"
                      value={localData.postcode}
                      onChange={(e) => setLocalData(prev => ({ ...prev, postcode: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

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

export default AccessNIFormStep6;
