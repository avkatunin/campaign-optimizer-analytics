
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";

const CtaSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleTryFreeClick = () => {
    window.open('https://app.vneshka.pro/', '_blank', 'noopener,noreferrer');
  };
  
  return (
    <section id="cta" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f4f7ff] via-[#e7dcff] to-[#ffdee2]"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 rounded-full bg-[#5201fe]/40 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-[#78e29e]/40 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      </div>
      
      <div className="container relative mx-auto px-4 md:px-8 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 md:p-16 border border-white/30 transform transition-all duration-500 hover:shadow-2xl">
            <div className="flex justify-center mb-10">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#5201fe] to-[#78e29e] text-white shadow-lg shadow-primary/20">
                <Sparkles className="w-12 h-12" />
              </div>
            </div>
            
            <h2 className="font-['Carter_One'] text-3xl md:text-5xl text-[#2a4b8d] mb-12 text-center leading-tight">
              <span className="inline-block bg-gradient-to-r from-[#5201fe] to-[#78e29e] text-transparent bg-clip-text">
                Начните отслеживать эффективность уже сегодня
              </span>
            </h2>
            
            <div className="mt-10 text-center">
              <div 
                className="relative inline-block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r from-[#5201fe] to-[#78e29e] rounded-full blur opacity-70 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
                <Button 
                  onClick={handleTryFreeClick}
                  className="relative bg-gradient-to-r from-[#5201fe] to-[#78e29e] hover:from-[#78e29e] hover:to-[#5201fe] text-white font-bold px-10 py-7 rounded-full shadow-lg transition-all duration-500 text-lg h-auto"
                >
                  Попробуйте бесплатно <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 0.9; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default CtaSection;

