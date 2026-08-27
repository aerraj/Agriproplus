import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./screens/Home"));
const Auth = lazy(() => import("./screens/Auth"));
const CropRecommendation = lazy(() => import("./screens/CropRecommendation"));
const Schemes = lazy(() => import("./screens/Schemes"));
const Knowledge = lazy(() => import("./screens/Knowledge"));
const Support = lazy(() => import("./screens/Support"));
const Legal = lazy(() => import("./screens/Legal"));
const NotFound = lazy(() => import("./screens/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const authPage = pathname === "/login" || pathname === "/signup";
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div className="route-loader"><span /><p>Reading the field…</p></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route path="/crops" element={<CropRecommendation />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/news" element={<Navigate to="/knowledge" replace />} />
          <Route path="/library" element={<Navigate to="/knowledge" replace />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!authPage && <Footer />}
    </>
  );
}
