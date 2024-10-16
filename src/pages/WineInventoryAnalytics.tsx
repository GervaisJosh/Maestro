import React from 'react';
import { Wine, TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const WineInventoryAnalytics = () => {
  // Dummy data - replace with actual data from your API in the future
  const inventoryData = [
    { name: 'Red', value: 500 },
    { name: 'White', value: 300 },
    { name: 'Rosé', value: 150 },
    { name: 'Sparkling', value: 200 },
  ];

  const salesTrendData = [
    { month: 'Jan', sales: 150 },
    { month: 'Feb', sales: 180 },
    { month: 'Mar', sales: 200 },
    { month: 'Apr', sales: 220 },
    { month: 'May', sales: 250 },
    { month: 'Jun', sales: 280 },
  ];

  const topSellingWines = [
    { name: 'Chateau Margaux 2015', sales: 50 },
    { name: 'Opus One 2018', sales: 45 },
    { name: 'Dom Perignon 2010', sales: 40 },
    { name: 'Sassicaia 2017', sales: 35 },
    { name: 'Screaming Eagle 2019', sales: 30 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Wine Inventory Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Total Inventory</h2>
            <Wine className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-3xl font-bold">1,150</p>
          <p className="text-sm text-gray-400 mt-2">bottles</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Monthly Sales</h2>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-3xl font-bold">280</p>
          <p className="text-sm text-green-500 mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Low Stock Alert</h2>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-3xl font-bold">5</p>
          <p className="text-sm text-gray-400 mt-2">wines below threshold</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Inventory Value</h2>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold">$2.5M</p>
          <p className="text-sm text-gray-400 mt-2">total value</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-md p-6 col-span-full">
          <h2 className="text-xl font-semibold mb-4">Top Selling Wines</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">Wine</th>
                  <th className="py-2">Sales</th>
                  <th className="py-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topSellingWines.map((wine, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-2">{wine.name}</td>
                    <td className="py-2">{wine.sales}</td>
                    <td className="py-2">
                      <BarChart2 className="h-5 w-5 text-green-500 inline-block mr-2" />
                      <span className="text-green-500">+5%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineInventoryAnalytics;