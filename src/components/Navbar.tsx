import React from 'react';
import { Link } from 'react-router-dom';
import { Guitar as Hospital } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Hospital className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">Hospital Queue System</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/patient"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Patient Portal
            </Link>
            <Link
              to="/staff"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;