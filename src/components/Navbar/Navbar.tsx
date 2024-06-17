import { FaLinkedin, FaMedium } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      {/* <h1 className="text-2xl font-bold text-white">Video</h1> */}
      <img src="/FULL_LOGO_COLOR.png" alt="logo" className="h-10" />
      {/* <input type="text" /> */}
      <div className="flex items-center gap-4">
        <a href="https://www.linkedin.com/in/avinashratnam/">
          <FaLinkedin className="text-4xl text-slate-800 hover:text-gray-400 hover:cursor-pointer" />
        </a>
        <a href="https://avinashkratnam.medium.com/">
          <FaMedium className="text-4xl text-slate-800 hover:text-gray-400 hover:cursor-pointer" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
