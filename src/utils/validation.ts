
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value.trim()) return `${fieldName} is required`;
  return null;
};

export const validateDate = (day: string, month: string, year: string): string | null => {
  if (!day || !month || !year) return 'Please enter a complete date';
  
  const dayNum = parseInt(day);
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);
  
  if (dayNum < 1 || dayNum > 31) return 'Day must be between 1 and 31';
  if (monthNum < 1 || monthNum > 12) return 'Month must be between 1 and 12';
  if (yearNum < 1900 || yearNum > new Date().getFullYear()) return 'Please enter a valid year';
  
  // Check if date is valid
  const date = new Date(yearNum, monthNum - 1, dayNum);
  if (date.getDate() !== dayNum || date.getMonth() !== monthNum - 1 || date.getFullYear() !== yearNum) {
    return 'Please enter a valid date';
  }
  
  return null;
};

export const validatePostcode = (postcode: string): string | null => {
  if (!postcode.trim()) return null; // Optional field
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  if (!postcodeRegex.test(postcode)) return 'Please enter a valid postcode';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return 'Phone number is required';
  const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
  if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
  return null;
};

export const validateNationalInsurance = (ni: string): string | null => {
  if (!ni.trim()) return null; // Optional based on form logic
  const niRegex = /^[A-Z]{2}\d{6}[A-Z]$/i;
  if (!niRegex.test(ni.replace(/\s/g, ''))) return 'Please enter a valid National Insurance number (e.g., AB123456C)';
  return null;
};
