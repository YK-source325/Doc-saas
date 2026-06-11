import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Dashboard from "./pages/Dashboard";
import Targhe from "./pages/Targhe";
import ChiSiamo from "./pages/ChiSiamo";
import Media from "./pages/Media";
import Trailer from "./pages/Trailer";
import Login from "./pages/Login";
import Registrati from "./pages/Registrati";
import Partner from "./pages/Partner";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/places/:id" element={<PlaceDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/targhe" element={<Targhe />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/media" element={<Media />} />
            <Route path="/trailer" element={<Trailer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrati" element={<Registrati />} />
            <Route
              path="/partner"
              element={
                <ProtectedRoute roles={["partner", "developer"]}>
                  <Partner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["developer"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
