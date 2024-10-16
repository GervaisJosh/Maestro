import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wine, DollarSign, FileText, Calendar, Star, Home, BarChart2, Package, Users, MessageSquare, Clipboard, Settings, TrendingUp, Target, Gift, Heart, Bell, Box, Glass } from 'lucide-react';

const Sidebar = ({ userRole }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const adminMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: TrendingUp, label: 'Revenue Insights', path: '/revenue-insights' },
    { icon: Wine, label: 'Wine Inventory', path: '/wines' },
    { icon: BarChart2, label: 'Inventory Analytics', path: '/wine-inventory-analytics' },
    { icon: Package, label: 'Order Fulfillment', path: '/order-fulfillment' },
    { icon: Users, label: 'Customer Insights', path: '/customer-insights' },
    { icon: Target, label: 'Customer Segmentation', path: '/customer-segmentation' },
    { icon: Gift, label: 'Promotions', path: '/promotions' },
    { icon: Calendar, label: 'Calendar', path: '/admin-calendar' },
    { icon: MessageSquare, label: 'Wine Reviews', path: '/ratings' },
    { icon: Clipboard, label: 'Events', path: '/events' },
    { icon: Settings, label: 'Settings', path: '/account-settings' },
  ];

  const customerMenuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Wine, label: 'My Wines', path: '/my-wines' },
    { icon: Star, label: 'Rate Wines', path: '/rate-wines' },
    { icon: FileText, label: 'Order History', path: '/order-history' },
    { icon: Gift, label: 'Recommendations', path: '/recommendations' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: Calendar, label: 'Calendar', path: '/customer-calendar' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/account-settings' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : customerMenuItems;

  return (
    <div 
      className={`bg-gray-900 text-white fixed inset-y-0 left-0 transition-all duration-300 ease-in-out z-50 flex flex-col justify-center ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="py-6 space-y-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center py-4 px-6 transition duration-200 hover:bg-gray-800 hover:text-green-500 ${
              location.pathname === item.path ? 'bg-gray-800 text-green-500' : ''
            }`}
          >
            <div className="flex items-center justify-center w-8">
              <item.icon className="h-6 w-6" />
            </div>
            <span className={`ml-4 transition-all duration-200 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
