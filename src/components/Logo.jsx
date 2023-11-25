import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      data-testid="logo"
      className="text-xl md:text-2xl font-semibold flex items-center"
    >
      🍔 <span className="hidden md:block logo">TEAM 100</span>
    </Link>
  );
};

export default Logo;
