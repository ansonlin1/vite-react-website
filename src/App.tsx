import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/layout/Layout";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const EventDetails = lazy(() => import("./pages/EventDetailsPage"));
const RsvpPage = lazy(() => import("./pages/RsvpPage"));
const RegistryPage = lazy(() => import("./pages/RegistryPage"));
const MusicRequestsPage = lazy(() => import("./pages/MusicRequestPage"));

// Loading fallback component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/details" element={<EventDetails />} />
              <Route path="/rsvp" element={<RsvpPage />} />
              <Route path="/registry" element={<RegistryPage />} />
              <Route path="/music" element={<MusicRequestsPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
