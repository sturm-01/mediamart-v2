import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { MessageSquare, Phone } from 'lucide-react';
import RequestModal from './RequestModal';

const Header = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="bg-black text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-white">M</span>
                <span className="text-red-500">media mart</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/construction"
                className={`text-sm font-medium transition-colors hover:text-red-500 ${
                  isActive('/construction') ? 'text-red-500' : 'text-white'
                }`}
              >
                НАРУЖНАЯ РЕКЛАМА
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors hover:text-red-500 ${
                  isActive('/about') ? 'text-red-500' : 'text-white'
                }`}
              >
                О НАС
              </Link>
              <Link
                to="/partner"
                className={`text-sm font-medium transition-colors hover:text-red-500 ${
                  isActive('/partner') ? 'text-red-500' : 'text-white'
                }`}
              >
                КЛИЕНТЫ
              </Link>
              <Button
                onClick={() => setIsRequestModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
              >
                Заявка
              </Button>
            </nav>

            {/* Contact */}
            <div className="flex items-center space-x-4">
              <a
                href="https://wa.me/77779200200"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageSquare size={20} />
                <span className="hidden sm:inline text-sm">+7 777 9 200 200</span>
              </a>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden mt-4 flex flex-wrap gap-4">
            <Link
              to="/construction"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/construction') ? 'text-red-500' : 'text-white'
              }`}
            >
              НАРУЖНАЯ РЕКЛАМА
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/about') ? 'text-red-500' : 'text-white'
              }`}
            >
              О НАС
            </Link>
            <Link
              to="/partner"
              className={`text-sm font-medium transition-colors hover:text-red-500 ${
                isActive('/partner') ? 'text-red-500' : 'text-white'
              }`}
            >
              КЛИЕНТЫ
            </Link>
          </nav>
        </div>
      </header>

      <RequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </>
  );
};

export default Header;