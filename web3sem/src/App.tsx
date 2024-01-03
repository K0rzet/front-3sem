import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { routerData } from "./utils/router-storage/router.data";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
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
  );
}

export default App;
