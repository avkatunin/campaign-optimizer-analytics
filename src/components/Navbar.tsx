import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleStartClick = () => {
    window.open('https://app.vneshka.pro/', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-2" : "bg-transparent py-4"}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            className="text-3xl font-['Carter_One'] text-[#5201fe] font-bold tracking-tight"
          >
            ВнешкаPRO
          </a>
          <Button 
            variant="default" 
            size="default" 
            className="bg-gradient-to-r from-[#5201fe] to-[#2a4b8d] text-white hover:from-[#5201fe]/90 hover:to-[#2a4b8d]/90 transition-all"
            onClick={handleStartClick}
          >
            Начать
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
