
import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#005EA5] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="text-white text-xl font-bold">
                nidirect
              </a>
            </div>
            <nav className="flex items-center space-x-8">
              <a href="/services" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                Services
              </a>
              <a href="/about" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                About
              </a>
              <a href="/help" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                Help
              </a>
              <a href="/contact" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                Contact us
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Skip link for accessibility */}
      <a href="#main-content" className="govuk-skip-link">
        Skip to main content
      </a>

      {/* Main content */}
      <main id="main-content" className="flex-1">
        <div className="min-h-[calc(100vh-4rem)] flex">
          {/* Left side - Content */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#005EA5] to-[#003d73] text-white p-12 flex-col justify-center">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Access your nidirect account
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Sign in to securely use online government services in Northern Ireland.
              </p>
              
              {/* Info notification */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Secure Access
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Your account gives you access to all nidirect online services. 
                  Keep your login details secure and never share them with others.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Mobile heading */}
              <div className="lg:hidden mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Access your nidirect account
                </h1>
                <p className="text-gray-600 text-lg">
                  Sign in to securely use online government services in Northern Ireland.
                </p>
              </div>

              {/* Login card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="lg:hidden mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">Secure Access:</span> Your account gives you access to all nidirect online services. Keep your login details secure.
                    </p>
                  </div>
                </div>

                <LoginForm />

                {/* Additional links */}
                <div className="mt-6 space-y-3 text-center">
                  <div>
                    <a href="/forgot-password" className="text-[#005EA5] hover:text-[#003d73] text-sm font-medium transition-colors">
                      Forgotten your password?
                    </a>
                  </div>
                  <div>
                    <a href="/manage-account" className="text-[#005EA5] hover:text-[#003d73] text-sm font-medium transition-colors">
                      Manage account details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-600">
            <a href="/cookies" className="hover:text-gray-900 transition-colors">
              Cookies
            </a>
            <span className="text-gray-300">|</span>
            <a href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <span className="text-gray-300">|</span>
            <a href="/accessibility" className="hover:text-gray-900 transition-colors">
              Accessibility
            </a>
            <span className="text-gray-300">|</span>
            <a href="/terms" className="hover:text-gray-900 transition-colors">
              Terms & Conditions
            </a>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            © 2024 Northern Ireland Executive. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;