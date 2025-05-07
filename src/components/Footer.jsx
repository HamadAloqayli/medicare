import React from "react";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-md py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              رفيق الصحة © جميع الحقوق محفوظة {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-gray-600 text-sm flex items-center">
              صنع بـ <Heart className="h-4 w-4 text-red-500 mx-1" /> لرعاية أفضل
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
