import React from "react";
import { navigationData } from "./navigation.data";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none; /* Убирает подчеркивание */
  font-weight: bold; /* Жирный шрифт */
  margin: 0 15px; /* Отступы между ссылками */

  &:hover {
    color: #c6c6c6;
  }
`;

const Navigation: React.FC = () => {
  return (
    navigationData &&
    navigationData.items.map((item) => (
      <StyledLink to={item.link} key={item.link}>
        {item.name}
      </StyledLink>
    ))
  );
};

export default Navigation;
