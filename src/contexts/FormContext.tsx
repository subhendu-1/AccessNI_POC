
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Address {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  townCity: string;
  county?: string;
  country: string;
  postcode?: string;
  livedFromDay: string;
  livedFromMonth: string;
  livedFromYear: string;
  livedToDay: string;
  livedToMonth: string;
  livedToYear: string;
}

interface FormData {
  // Step 1 - Personal Details
  title: string;
  surname: string;
  forename: string;
  middleNames: string;
  nameKnownBy: string;
  allOtherSurnames: string[];
  allOtherForenames: string[];
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  
  // Step 2 - Additional Details
  gender: string;
  townCity: string;
  country: string;
  nationalInsurance: string;
  nationalInsuranceReason: string;
  drivingLicence: string;
  drivingLicenceNumber: string;
  passport: string;
  passportNumber: string;
  countryOfIssue: string;
  nationality: string;
  contactNumber: string;
  contactEmail: string;
  
  // Step 3 - Current Address
  currentAddress: {
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    townCity: string;
    county?: string;
    country: string;
    postcode?: string;
    livedSince: {
      day: string;
      month: string;
      year: string;
    };
  };
  
  // Step 5 - Address History
  previousAddresses: Address[];
  
  // Step 6 - Delivery Details
  paperCertificate: boolean;
  sendToCurrentAddress: boolean;
  deliveryAddress: {
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    townCity: string;
    county?: string;
    country: string;
    postcode?: string;
  };

  // Step 8 - Document Selection
  selectedDocuments: string[];
  visaShareCode: string;

  // Step 10 - Declarations
  declarations?: {
    declaration1: boolean;
    declaration2: boolean;
    declaration3: boolean;
    declaration4: boolean;
    declaration5: boolean;
    declaration6: boolean;
    declaration7: boolean;
  };

  // Step 11 - Cardholder Address
  cardholderAddressSame?: boolean;
  cardholderAddress?: {
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    townCity: string;
    county?: string;
    country: string;
    postcode?: string;
  };
}

interface FormContextType {
  formData: FormData;
  updateFormData: (section: keyof FormData, data: Partial<FormData[keyof FormData]>) => void;
  addPreviousAddress: (address: Address) => void;
  removePreviousAddress: (id: string) => void;
  updatePreviousAddress: (id: string, address: Address) => void;
}

const defaultFormData: FormData = {
  title: '',
  surname: '',
  forename: '',
  middleNames: '',
  nameKnownBy: '',
  allOtherSurnames: [''],
  allOtherForenames: [''],
  dateOfBirth: { day: '', month: '', year: '' },
  gender: '',
  townCity: '',
  country: '',
  nationalInsurance: '',
  nationalInsuranceReason: '',
  drivingLicence: '',
  drivingLicenceNumber: '',
  passport: '',
  passportNumber: '',
  countryOfIssue: '',
  nationality: '',
  contactNumber: '',
  contactEmail: '',
  currentAddress: {
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    townCity: '',
    county: '',
    country: '',
    postcode: '',
    livedSince: { day: '', month: '', year: '' }
  },
  previousAddresses: [],
  paperCertificate: false,
  sendToCurrentAddress: true,
  deliveryAddress: {
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    townCity: '',
    county: '',
    country: '',
    postcode: ''
  },
  selectedDocuments: [],
  visaShareCode: '',
  declarations: {
    declaration1: false,
    declaration2: false,
    declaration3: false,
    declaration4: false,
    declaration5: false,
    declaration6: false,
    declaration7: false
  },
  cardholderAddressSame: true,
  cardholderAddress: {
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    townCity: '',
    county: '',
    country: '',
    postcode: ''
  }
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' && !Array.isArray(prev[section]) 
        ? { ...prev[section], ...data }
        : data
    }));
  };

  const addPreviousAddress = (address: Address) => {
    setFormData(prev => ({
      ...prev,
      previousAddresses: [...prev.previousAddresses, address]
    }));
  };

  const removePreviousAddress = (id: string) => {
    setFormData(prev => ({
      ...prev,
      previousAddresses: prev.previousAddresses.filter(addr => addr.id !== id)
    }));
  };

  const updatePreviousAddress = (id: string, address: Address) => {
    setFormData(prev => ({
      ...prev,
      previousAddresses: prev.previousAddresses.map(addr => 
        addr.id === id ? address : addr
      )
    }));
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      addPreviousAddress,
      removePreviousAddress,
      updatePreviousAddress
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
