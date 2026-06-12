import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Privacy from "./pages/Privacy";
import Dashboard from "./pages/Dashboard";
import Targhe from "./pages/Targhe";
import ChiSiamo from "./pages/ChiSiamo";
import Media from "./pages/Media";
import Trailer from "./pages/Trailer";
import Accesso from "./pages/Accesso";
import Account from "./pages/Account";
import Abbonamenti from "./pages/Abbonamenti";
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
            <Route path="/places" element={<Navigate to="/strutture" replace />} />
            <Route path="/strutture" element={<Places />} />
            <Route path="/strutture/:id" element={<PlaceDetail />} />
            <Route path="/places/:id" element={<PlaceDetail />} />
            <Route path="/mappa" element={<Places defaultView="map" />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/targhe" element={<Targhe />} />
            <Route path="/abbonamenti" element={<Abbonamenti />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/media" element={<Media />} />
            <Route path="/trailer" element={<Trailer />} />
            <Route path="/accesso" element={<Accesso />} />
            <Route path="/login" element={<Navigate to="/accesso" replace />} />
            <Route path="/registrati" element={<Navigate to="/accesso" replace />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute roles={["user", "partner", "developer"]}>
                  <Account />
                </ProtectedRoute>
              }
            />
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
