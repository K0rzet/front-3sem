import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { HeaderContainer } from "./header-styles";
import { StyledButton } from "../../../ui/AntdStyledButton";

const Header: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const systemTheme = isSystemDark ? "dark" : "light";

  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">(systemTheme);
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
      <StyledButton onClick={handleAuthClick}>{isAuthenticated ? "Выйти" : "Войти"}</StyledButton>
      <StyledButton onClick={changeTheme}>{currentTheme === "dark" ? "Светлая тема" : "Темная тема"}</StyledButton>
    </HeaderContainer>
  );
};

export default Header;
