import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CalendarProvider } from './contexts/CalendarContext';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import DevModeToggle from './components/DevModeToggle';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CustomerDashboard from './pages/customer/CustomerDashboard';
import RevenueInsights from './pages/RevenueInsights';
import Wines from './pages/Wines';
import WineInventoryAnalytics from './pages/WineInventoryAnalytics';
import OrderFulfillment from './pages/OrderFulfillment';
import CustomerInsights from './pages/CustomerInsights';
import CustomerSegmentation from './pages/CustomerSegmentation';
import Promotions from './pages/Promotions';
import AdminCalendar from './pages/AdminCalendar';
import Ratings from './pages/Ratings';
import Events from './pages/Events';
import AccountSettings from './pages/AccountSettings';
import MyWines from './pages/customer/MyWines';
import RateWines from './pages/customer/RateWines';
import OrderHistory from './pages/customer/OrderHistory';
import Recommendations from './pages/customer/Recommendations';
import Wishlist from './pages/customer/Wishlist';
import CustomerCalendar from './pages/customer/CustomerCalendar';
import Notifications from './pages/customer/Notifications';
import TasteCurationSurvey from './components/TasteCurationSurvey';

const AuthenticatedApp = ({ userRole, setUserRole }) => {
  const { user } = useAuth();
  const [showSurvey, setShowSurvey] = useState(true);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (showSurvey) {
    return <TasteCurationSurvey onComplete={() => setShowSurvey(false)} />;
  }

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <Sidebar userRole={userRole} />
      <div className="flex-1 p-10 ml-16">
        <DevModeToggle userRole={userRole} setUserRole={setUserRole} />
        <Routes>
          <Route path="/" element={userRole === 'admin' ? <Dashboard userRole={userRole} /> : <CustomerDashboard />} />
          <Route path="/revenue-insights" element={<RevenueInsights />} />
          <Route path="/wines" element={<Wines />} />
          <Route path="/wine-inventory-analytics" element={<WineInventoryAnalytics />} />
          <Route path="/order-fulfillment" element={<OrderFulfillment />} />
          <Route path="/customer-insights" element={<CustomerInsights />} />
          <Route path="/customer-segmentation" element={<CustomerSegmentation />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/admin-calendar" element={<AdminCalendar />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/events" element={<Events />} />
          <Route path="/account-settings" element={<AccountSettings userRole={userRole} />} />
          <Route path="/my-wines" element={<MyWines />} />
          <Route path="/rate-wines" element={<RateWines />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/customer-calendar" element={<CustomerCalendar />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  const [userRole, setUserRole] = useState('customer');

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CalendarProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route 
                path="/*" 
                element={
                  <AuthenticatedApp userRole={userRole} setUserRole={setUserRole} />
                } 
              />
            </Routes>
          </Router>
        </CalendarProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;