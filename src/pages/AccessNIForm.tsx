
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
import { validateRequired, validateDate } from '@/utils/validation';

const AccessNIForm = () => {
  const navigate = useNavigate();
  const { formData, updateFormData } = useFormContext();
  const [localData, setLocalData] = useState({
    title: formData.title || '',
    surname: formData.surname || '',
    forename: formData.forename || '',
    middleNames: formData.middleNames || '',
    nameKnownBy: formData.nameKnownBy || '',
    allOtherSurnames: formData.allOtherSurnames || [''],
    allOtherForenames: formData.allOtherForenames || [''],
    dateOfBirth: formData.dateOfBirth || { day: '', month: '', year: '' }
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!localData.title) newErrors.title = 'Title is required';
    
    const surnameError = validateRequired(localData.surname, 'Surname');
    if (surnameError) newErrors.surname = surnameError;
    
    const forenameError = validateRequired(localData.forename, 'Forename');
    if (forenameError) newErrors.forename = forenameError;
    
    const dateError = validateDate(
      localData.dateOfBirth.day,
      localData.dateOfBirth.month,
      localData.dateOfBirth.year
    );
    if (dateError) newErrors.dateOfBirth = dateError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) {
      toast.error('Please fix the errors before proceeding');
      return;
    }
    
    updateFormData('title', localData.title);
    updateFormData('surname', localData.surname);
    updateFormData('forename', localData.forename);
    updateFormData('middleNames', localData.middleNames);
    updateFormData('nameKnownBy', localData.nameKnownBy);
    updateFormData('allOtherSurnames', localData.allOtherSurnames);
    updateFormData('allOtherForenames', localData.allOtherForenames);
    updateFormData('dateOfBirth', localData.dateOfBirth);
    
    navigate('/accessni-form-step2');
  };

  const addSurnameField = () => {
    setLocalData(prev => ({
      ...prev,
      allOtherSurnames: [...prev.allOtherSurnames, '']
    }));
  };

  const addForenameField = () => {
    setLocalData(prev => ({
      ...prev,
      allOtherForenames: [...prev.allOtherForenames, '']
    }));
  };

  const removeSurnameField = (index: number) => {
    setLocalData(prev => ({
      ...prev,
      allOtherSurnames: prev.allOtherSurnames.filter((_, i) => i !== index)
    }));
  };

  const removeForenameField = (index: number) => {
    setLocalData(prev => ({
      ...prev,
      allOtherForenames: prev.allOtherForenames.filter((_, i) => i !== index)
    }));
  };

  const updateSurnameField = (index: number, value: string) => {
    setLocalData(prev => ({
      ...prev,
      allOtherSurnames: prev.allOtherSurnames.map((name, i) => i === index ? value : name)
    }));
  };

  const updateForenameField = (index: number, value: string) => {
    setLocalData(prev => ({
      ...prev,
      allOtherForenames: prev.allOtherForenames.map((name, i) => i === index ? value : name)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar currentStep={1} totalSteps={13} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Applicant's personal details</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-sm font-bold text-gray-700">
                  Title *
                </Label>
                <Select value={localData.title} onValueChange={(value) => setLocalData(prev => ({ ...prev, title: value }))}>
                  <SelectTrigger className={`w-full ${errors.title ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Miss">Miss</SelectItem>
                    <SelectItem value="Ms">Ms</SelectItem>
                    <SelectItem value="Dr">Dr</SelectItem>
                  </SelectContent>
                </Select>
                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
              </div>

              <div>
                <Label htmlFor="surname" className="text-sm font-bold text-gray-700">
                  Surname *
                </Label>
                <Input
                  id="surname"
                  value={localData.surname}
                  onChange={(e) => setLocalData(prev => ({ ...prev, surname: e.target.value }))}
                  className={`w-full ${errors.surname ? 'border-red-500' : ''}`}
                  required
                />
                {errors.surname && <p className="text-sm text-red-600 mt-1">{errors.surname}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="forename" className="text-sm font-bold text-gray-700">
                  Forename *
                </Label>
                <Input
                  id="forename"
                  value={localData.forename}
                  onChange={(e) => setLocalData(prev => ({ ...prev, forename: e.target.value }))}
                  className={`w-full ${errors.forename ? 'border-red-500' : ''}`}
                  required
                />
                {errors.forename && <p className="text-sm text-red-600 mt-1">{errors.forename}</p>}
              </div>

              <div>
                <Label htmlFor="middleNames" className="text-sm font-bold text-gray-700">
                  Middle names (optional)
                </Label>
                <Input
                  id="middleNames"
                  value={localData.middleNames}
                  onChange={(e) => setLocalData(prev => ({ ...prev, middleNames: e.target.value }))}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="nameKnownBy" className="text-sm font-bold text-gray-700">
                Name you are commonly known by (optional)
              </Label>
              <Input
                id="nameKnownBy"
                value={localData.nameKnownBy}
                onChange={(e) => setLocalData(prev => ({ ...prev, nameKnownBy: e.target.value }))}
                className="w-full"
              />
            </div>

            <div>
              <Label className="text-sm font-bold text-gray-700 mb-2 block">
                Date of birth *
              </Label>
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div>
                  <Label htmlFor="day" className="text-xs font-bold text-gray-600">Day *</Label>
                  <Input
                    id="day"
                    value={localData.dateOfBirth.day}
                    onChange={(e) => setLocalData(prev => ({ 
                      ...prev, 
                      dateOfBirth: { ...prev.dateOfBirth, day: e.target.value }
                    }))}
                    placeholder="1"
                    maxLength={2}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="month" className="text-xs font-bold text-gray-600">Month *</Label>
                  <Input
                    id="month"
                    value={localData.dateOfBirth.month}
                    onChange={(e) => setLocalData(prev => ({ 
                      ...prev, 
                      dateOfBirth: { ...prev.dateOfBirth, month: e.target.value }
                    }))}
                    placeholder="12"
                    maxLength={2}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="year" className="text-xs font-bold text-gray-600">Year *</Label>
                  <Input
                    id="year"
                    value={localData.dateOfBirth.year}
                    onChange={(e) => setLocalData(prev => ({ 
                      ...prev, 
                      dateOfBirth: { ...prev.dateOfBirth, year: e.target.value }
                    }))}
                    placeholder="1990"
                    maxLength={4}
                    className="w-full"
                  />
                </div>
              </div>
              {errors.dateOfBirth && <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth}</p>}
            </div>

            <div>
              <Label className="text-sm font-bold text-gray-700 mb-2 block">
                All other surnames (optional)
              </Label>
              {localData.allOtherSurnames.map((surname, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={surname}
                    onChange={(e) => updateSurnameField(index, e.target.value)}
                    placeholder="Other surname"
                    className="flex-1"
                  />
                  {localData.allOtherSurnames.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeSurnameField(index)}
                      className="px-3"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSurnameField}
                className="mt-2"
              >
                Add another surname
              </Button>
            </div>

            <div>
              <Label className="text-sm font-bold text-gray-700 mb-2 block">
                All other forenames (optional)
              </Label>
              {localData.allOtherForenames.map((forename, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={forename}
                    onChange={(e) => updateForenameField(index, e.target.value)}
                    placeholder="Other forename"
                    className="flex-1"
                  />
                  {localData.allOtherForenames.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => removeForenameField(index)}
                      className="px-3"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addForenameField}
                className="mt-2"
              >
                Add another forename
              </Button>
            </div>

            <div className="flex justify-end pt-6">
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

export default AccessNIForm;
