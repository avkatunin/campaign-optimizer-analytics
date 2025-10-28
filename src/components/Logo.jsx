import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link
      to="/"
      className="font-display text-xl font-bold flex items-center gap-2"
    >
      <div className="text-2xl font-bold bg-gradient-primary text-blue-600">
        ВнешкаПРО
      </div>
    </Link>
    <Link
      to="https://t.me/vneshkapro" 
      target="_blank" rel="noreferrer"
      className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary"
    >
      <span class="text-sm font-medium">Связаться с нами</span>
    </Link>
    </div>
    
  );
};

export default Logo;
