
import React from 'react';
import { Monitor, Check } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-40 left-1/4 w-64 h-64 rounded-full bg-[#D6BCFA]/40 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#9b87f5]/30 blur-3xl"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM1MjAxZmUiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTRNMTQgMTRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTQiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-10 z-10">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          {/* Text content - Left side */}
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 md:p-10 border border-[#E5DEFF]">
              <h2 className="font-arial-black text-2xl md:text-3xl font-bold mb-8 text-[#6E59A5]">
                Всё просто:
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full p-1.5 text-white mt-1 flex-shrink-0">
                    <span className="block font-bold text-sm">1</span>
                  </div>
                  <p className="text-lg text-gray-800">
                    Вы хотите запустить рекламу товара у блогера.
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full p-1.5 text-white mt-1 flex-shrink-0">
                    <span className="block font-bold text-sm">2</span>
                  </div>
                  <p className="text-lg text-gray-800">
                    Мы выдаём вам специальную ссылку, совместимую со всеми маркетплейсами.
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full p-1.5 text-white mt-1 flex-shrink-0">
                    <span className="block font-bold text-sm">3</span>
                  </div>
                  <p className="text-lg text-gray-800">
                    Блогер размещает эту ссылку в посте.
                  </p>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full p-1.5 text-white mt-1 flex-shrink-0">
                    <span className="block font-bold text-sm">4</span>
                  </div>
                  <p className="text-lg text-gray-800">
                    А вы видите реальные переходы на свой товар — в одном месте.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image container - Right side */}
          <div className="md:w-1/2 order-1 md:order-2">
            <div className="relative shadow-xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
              <div className="bg-[#1A1F2C] rounded-t-xl px-3 py-2 flex justify-between items-center">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-[#1A1F2C] px-2 pb-2">
                <div className="bg-[#F1F0FB] rounded-b-xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/0c1ee21c-5938-485a-8cb1-a238f1c98905.png" 
                    alt="Панель управления ВнешкаPRO" 
                    className="w-full h-full object-contain scale-100"
                  />
                </div>
              </div>
              <div className="h-4 w-16 bg-[#1A1F2C] mx-auto -mt-1 rounded-b-lg shadow-md"></div>
              <div className="h-0.5 w-24 bg-[#6E59A5] mx-auto rounded-full shadow-md"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

