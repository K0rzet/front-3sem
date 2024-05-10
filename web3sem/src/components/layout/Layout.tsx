import React, { PropsWithChildren } from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
