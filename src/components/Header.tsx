
import React from 'react';

const Header = () => {
  return (
    <>
      {/* nidirect Header */}
      <header className="bg-[#0066CC] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <span className="text-white text-lg font-bold">nidirect</span>
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
              <span className="text-white text-sm font-medium">Subhendu Adak</span>
              <a href="/logout" className="text-white hover:text-gray-200 text-sm font-medium transition-colors">
                Log out
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      {/* AccessNI Sub-header */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3">
            <h1 className="text-2xl font-bold text-[#0066CC]">AccessNI</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
