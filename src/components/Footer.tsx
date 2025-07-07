
import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
