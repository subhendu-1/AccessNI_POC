import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StepProgressBar from '@/components/StepProgressBar';
import { useFormContext } from '@/contexts/FormContext';

const AccessNIFormStep5Add = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { formData, addPreviousAddress, updatePreviousAddress } = useFormContext();
  
  const [localFormData, setLocalFormData] = useState({
    postcode: '',
    selectedAddress: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    townCity: '',
    county: '',
    country: 'United Kingdom',
    postcodeField: '',
    livedFromDay: '',
    livedFromMonth: '',
    livedFromYear: '',
    livedToDay: '',
    livedToMonth: '',
    livedToYear: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [addressFound, setAddressFound] = useState(false);

  useEffect(() => {
    if (editId) {
      const addressToEdit = formData.previousAddresses.find(addr => addr.id === editId);
      if (addressToEdit) {
        setLocalFormData({
          postcode: '',
          selectedAddress: '',
          addressLine1: addressToEdit.addressLine1,
          addressLine2: addressToEdit.addressLine2 || '',
          addressLine3: addressToEdit.addressLine3 || '',
          townCity: addressToEdit.townCity,
          county: addressToEdit.county || '',
          country: addressToEdit.country,
          postcodeField: addressToEdit.postcode || '',
          livedFromDay: addressToEdit.livedFromDay,
          livedFromMonth: addressToEdit.livedFromMonth,
          livedFromYear: addressToEdit.livedFromYear,
          livedToDay: addressToEdit.livedToDay,
          livedToMonth: addressToEdit.livedToMonth,
          livedToYear: addressToEdit.livedToYear
        });
      }
    }
  }, [editId, formData.previousAddresses]);

  const handleFindAddress = () => {
    if (localFormData.postcode.trim()) {
      setAddressFound(true);
      setLocalFormData(prev => ({
        ...prev,
        selectedAddress: '2 The Boulevard, BELFAST BT7 3LN'
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localFormData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address line 1 is required';
    }

    if (!localFormData.townCity.trim()) {
      newErrors.townCity = 'Town/city is required';
    }

    if (!localFormData.country) {
      newErrors.country = 'Country is required';
    }

    // Validate From date
    if (!localFormData.livedFromDay.trim()) {
      newErrors.livedFromDay = 'Day is required';
    }
    if (!localFormData.livedFromMonth.trim()) {
      newErrors.livedFromMonth = 'Month is required';
    }
    if (!localFormData.livedFromYear.trim()) {
      newErrors.livedFromYear = 'Year is required';
    }

    // Validate To date
    if (!localFormData.livedToDay.trim()) {
      newErrors.livedToDay = 'Day is required';
    }
    if (!localFormData.livedToMonth.trim()) {
      newErrors.livedToMonth = 'Month is required';
    }
    if (!localFormData.livedToYear.trim()) {
      newErrors.livedToYear = 'Year is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = () => {
    if (validateForm()) {
      const addressData = {
        id: editId || Date.now().toString(),
        addressLine1: localFormData.addressLine1,
        addressLine2: localFormData.addressLine2,
        addressLine3: localFormData.addressLine3,
        townCity: localFormData.townCity,
        county: localFormData.county,
        country: localFormData.country,
        postcode: localFormData.postcodeField,
        livedFromDay: localFormData.livedFromDay,
        livedFromMonth: localFormData.livedFromMonth,
        livedFromYear: localFormData.livedFromYear,
        livedToDay: localFormData.livedToDay,
        livedToMonth: localFormData.livedToMonth,
        livedToYear: localFormData.livedToYear
      };

      if (editId) {
        updatePreviousAddress(editId, addressData);
      } else {
        addPreviousAddress(addressData);
      }
      
      navigate('/accessni-form-step5');
    }
  };

  const handleCancel = () => {
    navigate('/accessni-form-step5');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) {
      navigate('/accessni-form');
    } else if (step === 2) {
      navigate('/accessni-form-step2');
    } else if (step === 3) {
      navigate('/accessni-form-step3');
    } else if (step === 4) {
      navigate('/accessni-form-step4');
    } else if (step === 5) {
      navigate('/accessni-form-step5');
    }
  };

  const countryOptions = ['United Kingdom', 'Ireland', 'United States', 'Canada', 'Australia', 'Other'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#005EA5] shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-white text-xl font-bold">AccessNI</span>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="/accessni-home" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                AccessNI home
              </a>
              <a href="/my-applications" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                My applications
              </a>
              <a href="/account" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                Account
              </a>
              <span className="text-white text-sm font-medium">John Doe</span>
              <a href="/logout" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                Log out
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={5} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg text-gray-700">{editId ? 'Edit previous address' : 'Add previous address'}</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Search for postcode */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-bold text-gray-700 mb-2 block">
                  Search for postcode
                </Label>
                <p className="text-sm text-gray-600 mb-4">
                  To find your address, enter a valid postcode in United Kingdom
                </p>
                
                <div className="flex space-x-2 max-w-md">
                  <Input
                    value={localFormData.postcode}
                    onChange={(e) => setLocalFormData(prev => ({ ...prev, postcode: e.target.value }))}
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

              {addressFound && (
                <div>
                  <Label className="text-sm font-bold text-gray-700 mb-2 block">
                    Select address
                  </Label>
                  <Select 
                    value={localFormData.selectedAddress} 
                    onValueChange={(value) => {
                      setLocalFormData(prev => ({ 
                        ...prev, 
                        selectedAddress: value,
                        addressLine1: '2 The Boulevard',
                        townCity: 'BELFAST',
                        postcodeField: 'BT7 3LN'
                      }));
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select address" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2 The Boulevard, BELFAST BT7 3LN">2 The Boulevard, BELFAST BT7 3LN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Manual Address Entry */}
            <div className="space-y-4">
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
                    value={localFormData.addressLine1}
                    onChange={(e) => setLocalFormData(prev => ({ ...prev, addressLine1: e.target.value }))}
                    placeholder="2 The Boulevard"
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
                    value={localFormData.addressLine2}
                    onChange={(e) => setLocalFormData(prev => ({ ...prev, addressLine2: e.target.value }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="addressLine3" className="text-sm font-bold text-gray-700">
                    Address line 3 (optional)
                  </Label>
                  <Input
                    id="addressLine3"
                    value={localFormData.addressLine3}
                    onChange={(e) => setLocalFormData(prev => ({ ...prev, addressLine3: e.target.value }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="townCity" className="text-sm font-bold text-gray-700">
                    Town/city *
                  </Label>
                  <Input
                    id="townCity"
                    value={localFormData.townCity}
                    onChange={(e) => setLocalFormData(prev => ({ ...prev, townCity: e.target.value }))}
                    placeholder="BELFAST"
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
                    value={localFormData.county}
                    onChange={(e) => setLocalFormData(prev => ({ ...prev, county: e.target.value }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="country" className="text-sm font-bold text-gray-700">
                    Country *
                  </Label>
                  <Select value={localFormData.country} onValueChange={(value) => setLocalFormData(prev => ({ ...prev, country: value }))}>
                    <SelectTrigger className="w-full md:w-1/2">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOptions.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
                </div>

                <div>
                  <Label htmlFor="postcodeField" className="text-sm font-bold text-gray-700">
                    Postcode (optional)
                  </Label>
                  <Input
                    id="postcodeField"
                    value={localFormData.postcodeField}
                    onChange={(e) => setLocalFormData(prev => ({ ...prev, postcodeField: e.target.value }))}
                    placeholder="BT7 3LN"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Date Ranges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-bold text-gray-700 mb-2 block">
                  Lived at this address from *
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="fromDay" className="text-xs font-bold text-gray-600">Day</Label>
                    <Input
                      id="fromDay"
                      value={localFormData.livedFromDay}
                      onChange={(e) => setLocalFormData(prev => ({ ...prev, livedFromDay: e.target.value }))}
                      placeholder="1"
                      maxLength={2}
                      className="w-full"
                    />
                    {errors.livedFromDay && <p className="text-red-600 text-xs mt-1">{errors.livedFromDay}</p>}
                  </div>
                  <div>
                    <Label htmlFor="fromMonth" className="text-xs font-bold text-gray-600">Month</Label>
                    <Input
                      id="fromMonth"
                      value={localFormData.livedFromMonth}
                      onChange={(e) => setLocalFormData(prev => ({ ...prev, livedFromMonth: e.target.value }))}
                      placeholder="5"
                      maxLength={2}
                      className="w-full"
                    />
                    {errors.livedFromMonth && <p className="text-red-600 text-xs mt-1">{errors.livedFromMonth}</p>}
                  </div>
                  <div>
                    <Label htmlFor="fromYear" className="text-xs font-bold text-gray-600">Year</Label>
                    <Input
                      id="fromYear"
                      value={localFormData.livedFromYear}
                      onChange={(e) => setLocalFormData(prev => ({ ...prev, livedFromYear: e.target.value }))}
                      placeholder="2016"
                      maxLength={4}
                      className="w-full"
                    />
                    {errors.livedFromYear && <p className="text-red-600 text-xs mt-1">{errors.livedFromYear}</p>}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-bold text-gray-700 mb-2 block">
                  Lived at this address to *
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="toDay" className="text-xs font-bold text-gray-600">Day</Label>
                    <Input
                      id="toDay"
                      value={localFormData.livedToDay}
                      onChange={(e) => setLocalFormData(prev => ({ ...prev, livedToDay: e.target.value }))}
                      placeholder="1"
                      maxLength={2}
                      className="w-full"
                    />
                    {errors.livedToDay && <p className="text-red-600 text-xs mt-1">{errors.livedToDay}</p>}
                  </div>
                  <div>
                    <Label htmlFor="toMonth" className="text-xs font-bold text-gray-600">Month</Label>
                    <Input
                      id="toMonth"
                      value={localFormData.livedToMonth}
                      onChange={(e) => setLocalFormData(prev => ({ ...prev, livedToMonth: e.target.value }))}
                      placeholder="12"
                      maxLength={2}
                      className="w-full"
                    />
                    {errors.livedToMonth && <p className="text-red-600 text-xs mt-1">{errors.livedToMonth}</p>}
                  </div>
                  <div>
                    <Label htmlFor="toYear" className="text-xs font-bold text-gray-600">Year</Label>
                    <Input
                      id="toYear"
                      value={localFormData.livedToYear}
                      onChange={(e) => setLocalFormData(prev => ({ ...prev, livedToYear: e.target.value }))}
                      placeholder="2024"
                      maxLength={4}
                      className="w-full"
                    />
                    {errors.livedToYear && <p className="text-red-600 text-xs mt-1">{errors.livedToYear}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-8 py-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAdd}
                className="bg-[#00703C] hover:bg-[#005a30] text-white px-8 py-2"
              >
                {editId ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center space-x-6 text-sm text-blue-600">
            <a href="/crown-copyright" className="hover:text-blue-800 transition-colors underline">
              © Crown copyright (opens in a new tab)
            </a>
            <a href="/terms-and-conditions" className="hover:text-blue-800 transition-colors underline">
              Terms and conditions (opens in a new tab)
            </a>
            <a href="/privacy" className="hover:text-blue-800 transition-colors underline">
              Privacy (opens in a new tab)
            </a>
            <a href="/cookies" className="hover:text-blue-800 transition-colors underline">
              Cookies (opens in a new tab)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AccessNIFormStep5Add;
