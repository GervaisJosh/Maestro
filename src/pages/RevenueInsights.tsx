import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

const RevenueInsights = () => {
  // This is dummy data. In the future, this will be fetched from your API
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Revenue Insights</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-3xl font-bold">$328,000</p>
          <p className="text-sm text-gray-400 mt-2">Last 6 months</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Revenue Growth</h2>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">+12.5%</p>
          <p className="text-sm text-gray-400 mt-2">Compared to previous period</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Peak Revenue Day</h2>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">June 15</p>
          <p className="text-sm text-gray-400 mt-2">$12,500 in sales</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" name="Total Revenue" />
              <Line type="monotone" dataKey="wineRevenue" stroke="#3B82F6" name="Wine Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueInsights;