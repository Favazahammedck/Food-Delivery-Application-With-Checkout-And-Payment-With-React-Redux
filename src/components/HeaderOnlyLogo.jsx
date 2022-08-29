
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";


const HeaderOnlyLogo = () => {
 

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-orange-500 text-xl font-bold"> FOODLINE</p>
        </Link>

      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
      

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-orange-500 text-xl font-bold"> FOODLINE</p>
        </Link>

        
      </div>
    </header>
  );
};

export default HeaderOnlyLogo;
