import React from "react";
import Sidebar from "./sidebar";
import { WithChildren } from "@/helpers/reactHelper";
import Header from "./header";

const Layout = ({ children }: WithChildren) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <Header />
      <div className="bg-primaryBackground flex-1 p-4 text-white pt-20">
        {children}
      </div>
    </div>
  );
};

export default Layout;
