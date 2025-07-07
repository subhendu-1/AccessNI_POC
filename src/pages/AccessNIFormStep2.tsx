import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormContext } from '@/contexts/FormContext';
import { toast } from 'sonner';
import { validateRequired, validateEmail, validatePhone, validateNationalInsurance } from '@/utils/validation';

const AccessNIFormStep2 = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const [gender, setGender] = useState(formData.gender || '');
  const [townCity, setTownCity] = useState(formData.townCity || '');
  const [country, setCountry] = useState(formData.country || '');
  const [nationalInsurance, setNationalInsurance] = useState(formData.nationalInsurance ? 'yes' : 'no');
  const [nationalInsuranceNumber, setNationalInsuranceNumber] = useState(formData.nationalInsurance || '');
  const [nationalInsuranceReason, setNationalInsuranceReason] = useState(formData.nationalInsuranceReason || '');
  const [drivingLicence, setDrivingLicence] = useState(formData.drivingLicence ? 'yes' : 'no');
  const [drivingLicenceNumber, setDrivingLicenceNumber] = useState(formData.drivingLicenceNumber || '');
  const [passport, setPassport] = useState(formData.passport ? 'yes' : 'no');
  const [passportNumber, setPassportNumber] = useState(formData.passportNumber || '');
  const [countryOfIssue, setCountryOfIssue] = useState(formData.countryOfIssue || '');
  const [nationality, setNationality] = useState(formData.nationality || '');
  const [contactNumber, setContactNumber] = useState(formData.contactNumber || '');
  const [contactEmail, setContactEmail] = useState(formData.contactEmail || '');

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!gender) newErrors.gender = 'Gender is required';
    if (!townCity.trim()) newErrors.townCity = 'Town/city is required';
    if (!country) newErrors.country = 'Country is required';
    if (!nationality) newErrors.nationality = 'Nationality is required';
    
    const phoneError = validatePhone(contactNumber);
    if (phoneError) newErrors.contactNumber = phoneError;
    
    const emailError = validateEmail(contactEmail);
    if (emailError) newErrors.contactEmail = emailError;
    
    if (nationalInsurance === 'yes' && !nationalInsuranceNumber.trim()) {
      newErrors.nationalInsuranceNumber = 'National Insurance number is required';
    } else if (nationalInsuranceNumber.trim()) {
      const niError = validateNationalInsurance(nationalInsuranceNumber);
      if (niError) newErrors.nationalInsuranceNumber = niError;
    }
    
    if (nationalInsurance === 'no' && !nationalInsuranceReason.trim()) {
      newErrors.nationalInsuranceReason = 'Please provide a reason';
    }
    
    if (drivingLicence === 'yes' && !drivingLicenceNumber.trim()) {
      newErrors.drivingLicenceNumber = 'Driving licence number is required';
    }
    
    if (passport === 'yes') {
      if (!passportNumber.trim()) newErrors.passportNumber = 'Passport number is required';
      if (!countryOfIssue) newErrors.countryOfIssue = 'Country of issue is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before proceeding');
      return;
    }
    
    updateFormData('gender', gender);
    updateFormData('townCity', townCity);
    updateFormData('country', country);
    updateFormData('nationalInsurance', nationalInsurance === 'yes' ? nationalInsuranceNumber : '');
    updateFormData('nationalInsuranceReason', nationalInsuranceReason);
    updateFormData('drivingLicence', drivingLicence === 'yes' ? 'yes' : '');
    updateFormData('drivingLicenceNumber', drivingLicenceNumber);
    updateFormData('passport', passport === 'yes' ? 'yes' : '');
    updateFormData('passportNumber', passportNumber);
    updateFormData('countryOfIssue', countryOfIssue);
    updateFormData('nationality', nationality);
    updateFormData('contactNumber', contactNumber);
    updateFormData('contactEmail', contactEmail);
    
    navigate('/accessni-form-step3');
  };

  const handleBack = () => {
    navigate('/accessni-form');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) navigate('/accessni-form');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={2} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Additional details</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Gender */}
            <div className="space-y-4">
              <Label className="text-sm font-bold text-gray-700">
                Gender *
              </Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Female
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Other
                  </Label>
                </div>
              </RadioGroup>
              {errors.gender && <p className="text-sm text-red-600 mt-1">{errors.gender}</p>}
            </div>

            {/* Town/City */}
            <div className="space-y-4">
              <Label htmlFor="townCity" className="text-sm font-bold text-gray-700">
                Town/city *
              </Label>
              <Input
                id="townCity"
                value={townCity}
                onChange={(e) => setTownCity(e.target.value)}
                placeholder="Enter town/city"
                className={`w-full ${errors.townCity ? 'border-red-500' : ''}`}
              />
              {errors.townCity && <p className="text-sm text-red-600 mt-1">{errors.townCity}</p>}
            </div>

            {/* Country */}
            <div className="space-y-4">
              <Label htmlFor="country" className="text-sm font-bold text-gray-700">
                Country *
              </Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className={`w-full ${errors.country ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Northern Ireland">Northern Ireland</SelectItem>
                  <SelectItem value="England">England</SelectItem>
                  <SelectItem value="Scotland">Scotland</SelectItem>
                  <SelectItem value="Wales">Wales</SelectItem>
                  <SelectItem value="Ireland">Ireland</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country}</p>}
            </div>

            {/* National Insurance Number */}
            <div className="space-y-4">
              <Label className="text-sm font-bold text-gray-700">
                Do you have a valid National Insurance number? *
              </Label>
              <RadioGroup
                value={nationalInsurance}
                onValueChange={setNationalInsurance}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="ni-yes" />
                  <Label htmlFor="ni-yes" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="ni-no" />
                  <Label htmlFor="ni-no" className="text-sm font-bold text-gray-700 cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {nationalInsurance === 'yes' && (
              <div className="space-y-4">
                <Label htmlFor="nationalInsuranceNumber" className="text-sm font-bold text-gray-700">
                  National Insurance number *
                </Label>
                <Input
                  id="nationalInsuranceNumber"
                  value={nationalInsuranceNumber}
                  onChange={(e) => setNationalInsuranceNumber(e.target.value)}
                  placeholder="Enter National Insurance number"
                  className={`w-full ${errors.nationalInsuranceNumber ? 'border-red-500' : ''}`}
                />
                {errors.nationalInsuranceNumber && <p className="text-sm text-red-600 mt-1">{errors.nationalInsuranceNumber}</p>}
              </div>
            )}

            {nationalInsurance === 'no' && (
              <div className="space-y-4">
                <Label htmlFor="nationalInsuranceReason" className="text-sm font-bold text-gray-700">
                  Reason for not having a National Insurance number *
                </Label>
                <Input
                  id="nationalInsuranceReason"
                  value={nationalInsuranceReason}
                  onChange={(e) => setNationalInsuranceReason(e.target.value)}
                  placeholder="Enter reason"
                  className={`w-full ${errors.nationalInsuranceReason ? 'border-red-500' : ''}`}
                />
                {errors.nationalInsuranceReason && <p className="text-sm text-red-600 mt-1">{errors.nationalInsuranceReason}</p>}
              </div>
            )}

            {/* Driving Licence */}
            <div className="space-y-4">
              <Label className="text-sm font-bold text-gray-700">
                Do you hold a valid driving licence? *
              </Label>
              <RadioGroup
                value={drivingLicence}
                onValueChange={setDrivingLicence}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="driving-licence-yes" />
                  <Label htmlFor="driving-licence-yes" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="driving-licence-no" />
                  <Label htmlFor="driving-licence-no" className="text-sm font-bold text-gray-700 cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {drivingLicence === 'yes' && (
              <div className="space-y-4">
                <Label htmlFor="drivingLicenceNumber" className="text-sm font-bold text-gray-700">
                  Driving licence number *
                </Label>
                <Input
                  id="drivingLicenceNumber"
                  value={drivingLicenceNumber}
                  onChange={(e) => setDrivingLicenceNumber(e.target.value)}
                  placeholder="Enter driving licence number"
                  className={`w-full ${errors.drivingLicenceNumber ? 'border-red-500' : ''}`}
                />
                {errors.drivingLicenceNumber && <p className="text-sm text-red-600 mt-1">{errors.drivingLicenceNumber}</p>}
              </div>
            )}

            {/* Passport */}
            <div className="space-y-4">
              <Label className="text-sm font-bold text-gray-700">
                Do you hold a valid passport? *
              </Label>
              <RadioGroup
                value={passport}
                onValueChange={setPassport}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="passport-yes" />
                  <Label htmlFor="passport-yes" className="text-sm font-bold text-gray-700 cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="passport-no" />
                  <Label htmlFor="passport-no" className="text-sm font-bold text-gray-700 cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {passport === 'yes' && (
              <div className="space-y-4">
                <Label htmlFor="passportNumber" className="text-sm font-bold text-gray-700">
                  Passport number *
                </Label>
                <Input
                  id="passportNumber"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="Enter passport number"
                  className={`w-full ${errors.passportNumber ? 'border-red-500' : ''}`}
                />
                {errors.passportNumber && <p className="text-sm text-red-600 mt-1">{errors.passportNumber}</p>}

                <Label htmlFor="countryOfIssue" className="text-sm font-bold text-gray-700">
                  Country of issue *
                </Label>
                <Select value={countryOfIssue} onValueChange={setCountryOfIssue}>
                  <SelectTrigger className={`w-full ${errors.countryOfIssue ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Ireland">Ireland</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    {/* Add more countries as needed */}
                  </SelectContent>
                </Select>
                {errors.countryOfIssue && <p className="text-sm text-red-600 mt-1">{errors.countryOfIssue}</p>}
              </div>
            )}

            {/* Nationality */}
            <div className="space-y-4">
              <Label htmlFor="nationality" className="text-sm font-bold text-gray-700">
                Nationality *
              </Label>
              <Input
                id="nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="Enter nationality"
                className={`w-full ${errors.nationality ? 'border-red-500' : ''}`}
              />
              {errors.nationality && <p className="text-sm text-red-600 mt-1">{errors.nationality}</p>}
            </div>

            {/* Contact Number */}
            <div className="space-y-4">
              <Label htmlFor="contactNumber" className="text-sm font-bold text-gray-700">
                Contact number *
              </Label>
              <Input
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter contact number"
                className={`w-full ${errors.contactNumber ? 'border-red-500' : ''}`}
              />
              {errors.contactNumber && <p className="text-sm text-red-600 mt-1">{errors.contactNumber}</p>}
            </div>

            {/* Contact Email Address */}
            <div className="space-y-4">
              <Label htmlFor="contactEmail" className="text-sm font-bold text-gray-700">
                Contact email address *
              </Label>
              <Input
                id="contactEmail"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="Enter email address"
                className={`w-full ${errors.contactEmail ? 'border-red-500' : ''}`}
              />
              {errors.contactEmail && <p className="text-sm text-red-600 mt-1">{errors.contactEmail}</p>}
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

export default AccessNIFormStep2;
