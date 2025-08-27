import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CareerDetailsPage from './pages/career-details';
import ProfileSetup from './pages/profile-setup';
import CareerDashboard from './pages/career-dashboard';
import ProfileManagement from './pages/profile-management';
import AIChatInterface from './pages/ai-chat-interface';
import LearningRoadmap from './pages/learning-roadmap';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIChatInterface />} />
        <Route path="/career-details" element={<CareerDetailsPage />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/career-dashboard" element={<CareerDashboard />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/ai-chat-interface" element={<AIChatInterface />} />
        <Route path="/learning-roadmap" element={<LearningRoadmap />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
