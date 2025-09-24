
import React from 'react';
import { Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-[#2a4b8d] text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center font-montserrat text-lg text-white/70 mb-6">
            <a 
              href="https://t.me/VneshkaProBot" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/80 hover:text-[#78e29e] transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Send size={24} className="text-[#78e29e] opacity-70 mr-2" />
              <span className="text-white/90 hover:text-white/70 transition-opacity duration-300">
                Свяжитесь с нами в Telegram
              </span>
            </a>
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-white font-['Carter_One']">
            <span className="text-[#78e29e]">Внешка</span>PRO
          </h2>
          
          <div className="text-center font-montserrat text-sm text-white/70">
            <p>&copy; {currentYear} ВнешкаPRO. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
