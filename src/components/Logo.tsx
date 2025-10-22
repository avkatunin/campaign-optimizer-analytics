import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="font-display text-xl font-bold flex items-center gap-2"
    >
      <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        ВнешкаПРО
      </div>
    </Link>
  );
};

export default Logo;
