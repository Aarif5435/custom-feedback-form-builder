import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/asset/likeLogo.png";
import AccountMenu from "./AccountMenu";

type NavBarType = {
  leftContent?: ReactNode;
  rightContent?: ReactNode; 
};

const Navbar: React.FC<NavBarType> = ({ leftContent, rightContent }) => {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0, 
        zIndex: 1000,
      }}
      className="bg-white border-b-2 shadow-md -p-1 flex"
    >
      <div className="container flex justify-start items-center">
        {leftContent || (
          <>
            <div className="w-fit">
              <Image width={64} height={64} src={Logo} alt={"no image found"} />
            </div>
            <div className="text-2xl font-bold text-black-600">
              USER FEEDBACK
            </div>
          </>
        )}
      </div>
      <div className="container gap-6 justify-end flex items-center">
        {rightContent}
        <AccountMenu/>
      </div>
    </nav>
  );
};

export default Navbar;
