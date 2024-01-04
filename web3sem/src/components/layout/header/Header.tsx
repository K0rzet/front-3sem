import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { HeaderContainer } from "./header-styles";
import styled from "styled-components";
import { Button } from "antd";
const StyledButton = styled(Button)`
  &.ant-btn-default {
    background-color: rgba(255, 255, 255, 0);
    color: inherit;
    border: inherit 1px solid;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: red;
      color: inherit;
      border: inherit 1px solid;
    }
  }
  &:not(:disabled):not(.ant-btn-disabled):hover {
    color: inherit;
    border-color: inherit;
  }
`;
const Header: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const isSystemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const systemTheme = isSystemDark ? "dark" : "light";

  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">(
    systemTheme
  );
  const changeTheme = () => {
    const currentMode = document.documentElement.getAttribute("data-theme");
    const newMode = currentMode === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newMode);
    setCurrentTheme(newMode);
    localStorage.setItem("theme", newMode);
  };
  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };
  return (
    <HeaderContainer width="1280px">
      <Navigation />
      <StyledButton onClick={handleAuthClick}>
        {isAuthenticated ? "Выйти" : "Войти"}
      </StyledButton>
      <StyledButton onClick={changeTheme}>
        {currentTheme === "dark" ? "Светлая тема" : "Темная тема"}
      </StyledButton>
    </HeaderContainer>
  );
};

export default Header;
