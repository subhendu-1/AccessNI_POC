
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import StepProgressBar from '@/components/StepProgressBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFormContext } from '@/contexts/FormContext';

const AccessNIFormStep7 = () => {
  const navigate = useNavigate();
  const { formData } = useFormContext();

  const handleNext = () => {
    navigate('/accessni-form-step8');
  };

  const handleBack = () => {
    navigate('/accessni-form-step6');
  };

  const handleStepClick = (step: number) => {
    if (step === 1) navigate('/accessni-form');
    else if (step === 2) navigate('/accessni-form-step2');
    else if (step === 3) navigate('/accessni-form-step3');
    else if (step === 4) navigate('/accessni-form-step4');
    else if (step === 5) navigate('/accessni-form-step5');
    else if (step === 6) navigate('/accessni-form-step6');
  };

  const formatDate = (day: string, month: string, year: string) => {
    if (!day || !month || !year) return '';
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  };

  const formatAddress = (address: any) => {
    if (!address) return '';
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.addressLine3,
      address.townCity,
      address.county,
      address.postcode
    ].filter(Boolean);
    return parts.join(', ').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepProgressBar 
          currentStep={7} 
          totalSteps={13} 
          onStepClick={handleStepClick}
        />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Basic (No RB) disclosure</h1>
          <h2 className="text-lg font-bold text-gray-700">Summary</h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-8">
            <p className="text-sm text-gray-700">
              Please review the details you have entered. If you need to change any of these details, please use the 'Back' button.
            </p>

            {/* Applicant's Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Applicant's details</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold w-1/3">Title</TableCell>
                    <TableCell>{formData.title || 'Mr'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Surname</TableCell>
                    <TableCell>{formData.surname || 'Lanka'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Forename</TableCell>
                    <TableCell>{formData.forename || 'Rajani'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Middle names (if applicable)</TableCell>
                    <TableCell>{formData.middleNames || 'Test one'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Name usually known by (if applicable)</TableCell>
                    <TableCell>{formData.nameKnownBy || 'Kanth'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">All other Surnames (if applicable)</TableCell>
                    <TableCell>{formData.allOtherSurnames.filter(Boolean).join(', ') || 'Lanka one'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">All other Forenames (if applicable)</TableCell>
                    <TableCell>{formData.allOtherForenames.filter(Boolean).join(', ') || 'Rajani Kanth'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Date of birth</TableCell>
                    <TableCell>{formatDate(formData.dateOfBirth.day, formData.dateOfBirth.month, formData.dateOfBirth.year) || '01/01/2000'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">I am a Parent/Guardian completing an application for a person under 16 who lives at my address.</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Does the middle name come from the NIDA?</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Applicant's Details Continued */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Applicant's details continued</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold w-1/3">Gender</TableCell>
                    <TableCell>{formData.gender || 'Male'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Town/city</TableCell>
                    <TableCell>{formData.townCity || 'Belfast'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Country</TableCell>
                    <TableCell>{formData.country || 'Northern Ireland'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Additional Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Applicant's details continued</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold w-1/3">Do you have a valid National Insurance number?</TableCell>
                    <TableCell>{formData.nationalInsurance ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">National Insurance number</TableCell>
                    <TableCell>{formData.nationalInsurance || ''}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Reason for not having a National Insurance number</TableCell>
                    <TableCell>{formData.nationalInsuranceReason || 'Non-UK national'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Do you hold a valid driving licence?</TableCell>
                    <TableCell>{formData.drivingLicence ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Driving licence number</TableCell>
                    <TableCell>{formData.drivingLicenceNumber || ''}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Do you hold a valid passport?</TableCell>
                    <TableCell>{formData.passport ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Passport number</TableCell>
                    <TableCell>{formData.passportNumber || ''}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Country of issue</TableCell>
                    <TableCell>{formData.countryOfIssue || 'United Kingdom'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Nationality</TableCell>
                    <TableCell>{formData.nationality || 'British'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Contact number</TableCell>
                    <TableCell>{formData.contactNumber || '07454232342'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Contact email address</TableCell>
                    <TableCell>{formData.contactEmail || 'v.test_f@version1.com'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Current Address */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Applicant's current address</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold w-1/3">Current address</TableCell>
                    <TableCell>{formatAddress(formData.currentAddress) || '8 LANYON PLACE, BELFAST, NORTHERN IRELAND, BT1 3LP'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Lived at this address since</TableCell>
                    <TableCell>{formatDate(formData.currentAddress.livedSince.day, formData.currentAddress.livedSince.month, formData.currentAddress.livedSince.year) || '01/12/2024'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Address History */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Applicant's address history</h3>
              {formData.previousAddresses.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Address</TableHead>
                      <TableHead className="font-bold">Lived at this address from</TableHead>
                      <TableHead className="font-bold">Lived at this address to</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.previousAddresses.map((address, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatAddress(address)}</TableCell>
                        <TableCell>{formatDate(address.livedFromDay, address.livedFromMonth, address.livedFromYear)}</TableCell>
                        <TableCell>{formatDate(address.livedToDay, address.livedToMonth, address.livedToYear)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>2 The Boulevard, BELFAST, United Kingdom, BT7 3LN</TableCell>
                      <TableCell>01/05/2016</TableCell>
                      <TableCell>01/12/2024</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>

            {/* Delivery Address */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Applicant's delivery address</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold w-1/3">If you need a paper certificate check the box below. Paper certificates take longer to deliver.</TableCell>
                    <TableCell>{formData.paperCertificate ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">If applicable, do you want the paper certificate sent to your current address?</TableCell>
                    <TableCell>{formData.sendToCurrentAddress ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Delivery address</TableCell>
                    <TableCell>
                      {formData.sendToCurrentAddress 
                        ? formatAddress(formData.currentAddress) || '8 LANYON PLACE, BELFAST, NORTHERN IRELAND, BT1 3LP'
                        : formatAddress(formData.deliveryAddress) || '8 LANYON PLACE, BELFAST, NORTHERN IRELAND, BT1 3LP'
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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

export default AccessNIFormStep7;
