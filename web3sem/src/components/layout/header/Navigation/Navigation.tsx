import React from "react";
import { navigationData } from "./navigation.data";
import { Link } from "react-router-dom";
const Navigation: React.FC = () => {
  return (
    navigationData &&
    navigationData.items.map((item) => (
      <Link to={item.link} key={item.link}>
        {item.name}
      </Link>
    ))
  );
};

export default Navigation;
