
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
import { validateDate, validateRequired } from '@/utils/validation';

const AccessNIFormStep5 = () => {
  const navigate = useNavigate();
  const { formData, addPreviousAddress, removePreviousAddress, updatePreviousAddress } = useFormContext();
  
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    townCity: '',
    county: '',
    country: 'United Kingdom',
    postcode: '',
    livedFromDay: '',
    livedFromMonth: '',
    livedFromYear: '',
    livedToDay: '',
    livedToMonth: '',
    livedToYear: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateNewAddress = () => {
    const newErrors: Record<string, string> = {};
    
    const addressLine1Error = validateRequired(newAddress.addressLine1, 'Address line 1');
    if (addressLine1Error) newErrors.addressLine1 = addressLine1Error;

    const townCityError = validateRequired(newAddress.townCity, 'Town/city');
    if (townCityError) newErrors.townCity = townCityError;

    const countryError = validateRequired(newAddress.country, 'Country');
    if (countryError) newErrors.country = countryError;

    const fromDateError = validateDate(newAddress.livedFromDay, newAddress.livedFromMonth, newAddress.livedFromYear);
    if (fromDateError) newErrors.livedFromDate = fromDateError;

    const toDateError = validateDate(newAddress.livedToDay, newAddress.livedToMonth, newAddress.livedToYear);
    if (toDateError) newErrors.livedToDate = toDateError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAddress = () => {
    if (validateNewAddress()) {
      const addressWithId = {
        ...newAddress,
        id: Date.now().toString()
      };
      addPreviousAddress(addressWithId);
      setNewAddress({
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        townCity: '',
        county: '',
        country: 'United Kingdom',
        postcode: '',
        livedFromDay: '',
        livedFromMonth: '',
        livedFromYear: '',
        livedToDay: '',
        livedToMonth: '',
        livedToYear: ''
      });
      setShowAddAddress(false);
      setErrors({});
      toast.success('Address added successfully');
    } else {
      toast.error('Please fix the errors before adding the address');
    }
  };

  const handleNext = () => {
    navigate('/accessni-form-step6');
  };

  const handleBack = () => {
    navigate('/accessni-form-step4');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) navigate('/accessni-form');
    else if (step === 2) navigate('/accessni-form-step2');
    else if (step === 3) navigate('/accessni-form-step3');
    else if (step === 4) navigate('/accessni-form-step4');
    else if (step === 6) navigate('/accessni-form-step6');
  };

  const handleFindAddress = () => {
    if (newAddress.postcode.trim()) {
      setNewAddress(prev => ({
        ...prev,
        addressLine1: '2 The Boulevard',
        townCity: 'BELFAST',
        postcode: 'BT7 3LN'
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={5} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg text-gray-700">Applicant's address history</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <p className="text-sm text-gray-700">
              You will need to provide your continuous address history for the last five years if you have lived at your current address for less than five years.
            </p>

            {/* Current Address Display */}
            {formData.currentAddress && formData.currentAddress.addressLine1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Current Address</h3>
                <div className="p-4 border border-gray-200 rounded-lg bg-blue-50">
                  <div className="text-sm">
                    <div><strong>Address:</strong> {formData.currentAddress.addressLine1}</div>
                    {formData.currentAddress.addressLine2 && <div>{formData.currentAddress.addressLine2}</div>}
                    {formData.currentAddress.addressLine3 && <div>{formData.currentAddress.addressLine3}</div>}
                    <div>{formData.currentAddress.townCity}, {formData.currentAddress.country}</div>
                    {formData.currentAddress.postcode && <div>{formData.currentAddress.postcode}</div>}
                    <div><strong>Lived since:</strong> {formData.currentAddress.livedSince?.day}/{formData.currentAddress.livedSince?.month}/{formData.currentAddress.livedSince?.year}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Previous addresses */}
            {formData.previousAddresses && formData.previousAddresses.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Previous Addresses</h3>
                {formData.previousAddresses.map((address, index) => (
                  <div key={address.id || index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Address:</strong> {address.addressLine1}
                        {address.addressLine2 && `, ${address.addressLine2}`}
                        {address.addressLine3 && `, ${address.addressLine3}`}
                        <br />{address.townCity}, {address.country}
                        {/* {address.postcode && <br />{address.postcode}} */}
                      </div>
                      <div>
                        <strong>Period:</strong> {address.livedFromDay}/{address.livedFromMonth}/{address.livedFromYear} - {address.livedToDay}/{address.livedToMonth}/{address.livedToYear}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removePreviousAddress(address.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add new address section */}
            {!showAddAddress ? (
              <div className="text-center">
                <Button 
                  onClick={() => setShowAddAddress(true)}
                  className="bg-[#00703C] hover:bg-[#005a30] text-white px-8 py-2"
                >
                  Add Previous Address
                </Button>
              </div>
            ) : (
              <div className="space-y-6 border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900">Add Previous Address</h3>
                
                <div>
                  <Label className="text-sm font-bold text-gray-700 mb-2 block">
                    Search for postcode
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    To find your address, enter a valid postcode in United Kingdom
                  </p>
                  
                  <div className="flex space-x-2 max-w-md">
                    <Input
                      value={newAddress.postcode}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, postcode: e.target.value }))}
                      placeholder="BT7 3LN"
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
                    <Label htmlFor="addressLine1" className="text-sm font-bold text-gray-700">
                      Address line 1 *
                    </Label>
                    <Input
                      id="addressLine1"
                      value={newAddress.addressLine1}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
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
                      value={newAddress.addressLine2}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="addressLine3" className="text-sm font-bold text-gray-700">
                      Address line 3 (optional)
                    </Label>
                    <Input
                      id="addressLine3"
                      value={newAddress.addressLine3}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine3: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="townCity" className="text-sm font-bold text-gray-700">
                      Town/city *
                    </Label>
                    <Input
                      id="townCity"
                      value={newAddress.townCity}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, townCity: e.target.value }))}
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
                      value={newAddress.county}
                      onChange={(e) => setNewAddress(prev => ({ ...prev, county: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country" className="text-sm font-bold text-gray-700">
                      Country *
                    </Label>
                    <Select 
                      value={newAddress.country} 
                      onValueChange={(value) => setNewAddress(prev => ({ ...prev, country: value }))}
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
                </div>

                {/* Date ranges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">
                      Lived at this address from *
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs font-bold text-gray-600">Day</Label>
                        <Input
                          value={newAddress.livedFromDay}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, livedFromDay: e.target.value }))}
                          placeholder="1"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-600">Month</Label>
                        <Input
                          value={newAddress.livedFromMonth}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, livedFromMonth: e.target.value }))}
                          placeholder="12"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-600">Year</Label>
                        <Input
                          value={newAddress.livedFromYear}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, livedFromYear: e.target.value }))}
                          placeholder="2020"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    {errors.livedFromDate && <p className="text-red-600 text-sm mt-1">{errors.livedFromDate}</p>}
                  </div>

                  <div>
                    <Label className="text-sm font-bold text-gray-700 mb-2 block">
                      Lived at this address to *
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs font-bold text-gray-600">Day</Label>
                        <Input
                          value={newAddress.livedToDay}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, livedToDay: e.target.value }))}
                          placeholder="1"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-600">Month</Label>
                        <Input
                          value={newAddress.livedToMonth}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, livedToMonth: e.target.value }))}
                          placeholder="12"
                          maxLength={2}
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-bold text-gray-600">Year</Label>
                        <Input
                          value={newAddress.livedToYear}
                          onChange={(e) => setNewAddress(prev => ({ ...prev, livedToYear: e.target.value }))}
                          placeholder="2024"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    {errors.livedToDate && <p className="text-red-600 text-sm mt-1">{errors.livedToDate}</p>}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button 
                    onClick={handleAddAddress}
                    className="bg-[#00703C] hover:bg-[#005a30] text-white px-8 py-2"
                  >
                    Add Address
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowAddAddress(false);
                      setErrors({});
                    }}
                    className="px-8 py-2"
                  >
                    Cancel
                  </Button>
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

export default AccessNIFormStep5;
