import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useWeb5Contex } from "@/context/web5";

const Header = () => {
  const { did } = useWeb5Contex();

  return (
    <nav className="absolute bg-black z-10 w-full px-10 flex flex-col justify-center h-20">
      <div className="flex items-center justify-end">
        <UserCircleIcon className="w-10 h-10" />
        <h1>Moganesan</h1>
      </div>
    </nav>
  );
};

export default Header;
