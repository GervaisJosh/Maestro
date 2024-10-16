import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wine, Star, ShoppingCart, Calendar, Gift, Heart, TrendingUp, Percent, DollarSign, Package, Users, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = ({ userRole }) => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 5500 },
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, wineRevenue: 30000 },
    { month: 'Feb', revenue: 52000, wineRevenue: 35000 },
    { month: 'Mar', revenue: 48000, wineRevenue: 32000 },
    { month: 'Apr', revenue: 61000, wineRevenue: 40000 },
    { month: 'May', revenue: 55000, wineRevenue: 37000 },
    { month: 'Jun', revenue: 67000, wineRevenue: 45000 },
  ];

  const revenueBreakdown = [
    { name: 'Wine Sales', value: 65 },
    { name: 'Events', value: 20 },
    { name: 'Memberships', value: 15 },
  ];

  const winesTastedData = [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 8 },
    { month: 'Mar', count: 12 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 15 },
    { month: 'Jun', count: 18 },
  ];

  const favoriteVarietals = [
    { name: 'Cabernet Sauvignon', count: 10 },
    { name: 'Chardonnay', count: 8 },
    { name: 'Pinot Noir', count: 7 },
    { name: 'Merlot', count: 5 },
    { name: 'Sauvignon Blanc', count: 4 },
  ];

  const adminWidgets = [
    { title: 'Total Revenue', value: '$328,000', icon: DollarSign, color: 'bg-green-500', size: 'col-span-1', path: '/revenue-insights' },
    { title: 'Wine Inventory', value: '1,234 bottles', icon: Wine, color: 'bg-red-500', size: 'col-span-1', path: '/wines' },
    { title: 'Pending Orders', value: '23', icon: Package, color: 'bg-yellow-500', size: 'col-span-1', path: '/order-fulfillment' },
    { title: 'Active Customers', value: '567', icon: Users, color: 'bg-blue-500', size: 'col-span-1', path: '/customer-segmentation' },
    { title: 'Monthly Revenue Trend', chart: 'lineChart', size: 'col-span-2 row-span-2', path: '/wine-inventory-analytics' },
    { title: 'Top Selling Wines', list: ['Chateau Margaux 2015', 'Opus One 2018', 'Dom Perignon 2010'], icon: TrendingUp, size: 'col-span-1 row-span-2', path: '/wine-inventory-analytics' },
    { title: 'Revenue Breakdown', chart: 'barChart', size: 'col-span-2 row-span-2', path: '/revenue-insights' },
    { title: 'Avg Customer Rating', value: '96', icon: Star, color: 'bg-purple-500', size: 'col-span-1', path: '/customer-insights' },
    { title: 'Upcoming Events', value: '3', icon: Calendar, color: 'bg-indigo-500', size: 'col-span-1', path: '/admin-calendar' },
  ];

  const customerWidgets = [
    { title: 'Wines Tasted', value: '15', icon: Wine, color: 'bg-red-500', size: 'col-span-1', path: '/my-wines' },
    { title: 'Average Rating', value: '94', icon: Star, color: 'bg-yellow-500', size: 'col-span-1', path: '/rate-wines' },
    { title: 'Upcoming Deliveries', value: '2', icon: ShoppingCart, color: 'bg-blue-500', size: 'col-span-1', path: '/order-history' },
    { title: 'Next Event', value: 'Jun 15', icon: Calendar, color: 'bg-green-500', size: 'col-span-1', path: '/customer-calendar' },
    { title: 'Wines Tasted', chart: 'lineChart', size: 'col-span-2 row-span-2', path: '/my-wines' },
    { title: 'Your Top Rated Wines', list: ['Chateau Margaux 2015', 'Opus One 2018', 'Dom Perignon 2010'], icon: TrendingUp, size: 'col-span-2 row-span-2', path: '/my-wines' },
    { title: 'Favorite Varietals', chart: 'barChart', size: 'col-span-2 row-span-2', path: '/my-wines' },
    { title: 'Membership Tier', value: 'Premier Cru', icon: Gift, color: 'bg-purple-500', size: 'col-span-1', path: '/account-settings' },
    { title: 'Wishlist Items', value: '8', icon: Heart, color: 'bg-pink-500', size: 'col-span-1', path: '/wishlist' },
    { title: 'Reward Points', value: '2,500', icon: Percent, color: 'bg-indigo-500', size: 'col-span-2', path: '/my-wines' },
  ];

  const widgets = userRole === 'admin' ? adminWidgets : customerWidgets;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold mb-6">
        {userRole === 'admin' ? 'Admin Dashboard' : 'Welcome to Your Wine Dashboard'}
      </h1>
      
      <div className="grid grid-cols-4 gap-6">
        {widgets.map((widget, index) => (
          <div 
            key={index} 
            className={`bg-gray-800 rounded-lg shadow-md p-6 ${widget.size} cursor-pointer hover:bg-gray-700 transition-colors duration-200`}
            onClick={() => handleCardClick(widget.path)}
          >
            <h2 className="text-xl font-semibold mb-4">{widget.title}</h2>
            {widget.value && (
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold">{widget.value}</p>
                {widget.icon && <widget.icon className={`h-10 w-10 ${widget.color} rounded-full p-2`} />}
              </div>
            )}
            {widget.list && (
              <ul className="list-disc list-inside">
                {widget.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {widget.chart === 'lineChart' && (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={userRole === 'admin' ? monthlyRevenue : winesTastedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={userRole === 'admin' ? 'month' : 'month'} />
                  <YAxis />
                  <Tooltip />
                  {userRole === 'admin' ? (
                    <>
                      <Line type="monotone" dataKey="revenue" stroke="#10B981" name="Total Revenue" />
                      <Line type="monotone" dataKey="wineRevenue" stroke="#3B82F6" name="Wine Revenue" />
                    </>
                  ) : (
                    <Line type="monotone" dataKey="count" stroke="#10B981" name="Wines Tasted" />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
            {widget.chart === 'barChart' && (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={userRole === 'admin' ? revenueBreakdown : favoriteVarietals}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey={userRole === 'admin' ? 'value' : 'count'} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;