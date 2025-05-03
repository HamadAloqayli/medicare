import React from 'react';
import { Link } from 'react-router-dom';
import { ActivitySquare } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ActivitySquare className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold text-gray-800">
                MediCare
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Clinics
            </Link>
            <Link 
              to="/form" 
              className="ml-4 text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Appointment
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;