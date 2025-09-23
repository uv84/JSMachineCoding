import { Github, Languages, Search, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";

function Navbar() {
  const NavList = ["Learn", "Reference", "Community", "Blog"];
  const { toggleTheme } = useTheme();

  return (
    <nav className="w-full h-16 border-black-50 border-2 relative">
      <div className="absolute top-4 flex justify-between w-full">
        <div>Logo</div>
        <div className="relative w-72">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-900">
            <Search size={20} />
          </span>
          <input
            className="border-amber-900 border-2 rounded-2xl w-full h-10 pl-10"
            type="text"
            placeholder="Search"
          />
        </div>
        <ul className="flex justify-evenly px-3 gap-6">
          {NavList.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
        <div className="flex justify-between px-3 gap-6">
          <Sun onClick={toggleTheme} className="cursor-pointer" />
          <Languages />
          <Github />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;