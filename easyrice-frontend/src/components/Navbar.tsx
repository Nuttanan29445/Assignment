import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const links = [
    {
      label: "History",
      path: "/",
    },
    {
      label: "Create Inspection",
      path: "/create",
    },
  ];

  const renderLinks = links.map((link) => {
    const isActive = location.pathname === link.path;
    return (
      <Link
        to={link.path}
        key={link.label}
        className={`font-semibold text-white ${
          isActive ? "font-bold border-b-2 border-white" : ""
        }`}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className="flex gap-3 p-3 bg-[#5F6F65] items-center w-full absolute">
      <img src={Logo} alt="logo" className="w-14" />
      {renderLinks}
    </div>
  );
};

export default Navbar;
