import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routerData } from "./utils/router-storage/router.data";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

function App() {
  useEffect(() => {
    const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = isSystemDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);
  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#007bff" />
      </Helmet>
      <Router>
        <AuthProvider>
          <Layout>
            <div>
              <Routes>
                {routerData.items.map((item) => (
                  <Route path={item.link} Component={item.component}>
                    {item.name}
                  </Route>
                ))}
              </Routes>
            </div>
          </Layout>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
