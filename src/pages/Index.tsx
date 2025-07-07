
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to AccessNI</h1>
            <p className="text-lg text-gray-700">
              AccessNI helps employers make safer recruitment decisions by providing criminal record checks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Disclosure</h2>
                <p className="text-gray-700 mb-4">
                  A Basic disclosure shows unspent convictions and conditional cautions.
                </p>
                <Button 
                  onClick={() => navigate('/accessni-form')}
                  className="bg-[#00703C] hover:bg-[#005a30] text-white w-full"
                >
                  Apply for Basic Disclosure
                </Button>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Enhanced Disclosure</h2>
                <p className="text-gray-700 mb-4">
                  An Enhanced disclosure shows spent and unspent convictions, cautions, reprimands and final warnings.
                </p>
                <Button 
                  variant="outline"
                  className="w-full"
                  disabled
                >
                  Coming Soon
                </Button>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-700">
                If you need assistance with your application, please contact our support team or visit our help section.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
