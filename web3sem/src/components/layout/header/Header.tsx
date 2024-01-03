import React from "react";
import Navigation from "./Navigation/Navigation";
import { useAuth } from "../../../contexts/AuthContext";
import './header.css'
const Header: React.FC = () => {
  const { isAuthenticated, login, logout } = useAuth();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
    }
  };
  return (
    <div className="header-container">
      <Navigation />
      <button onClick={handleAuthClick}>
        {isAuthenticated ? "Выйти" : "Войти"}
      </button>
    </div>
  );
};

export default Header;
