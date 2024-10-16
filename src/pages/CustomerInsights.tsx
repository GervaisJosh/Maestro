import React, { useState } from 'react';
import { User, Star, DollarSign, Wine, MessageSquare, Crown } from 'lucide-react';

const CustomerInsights = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', totalSpent: 2499.95, avgRating: 4.5, favoriteWine: 'Chateau Margaux', membershipTier: 'Premier Growth Membership' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', totalSpent: 1899.97, avgRating: 4.8, favoriteWine: 'Opus One', membershipTier: 'Grand Cru Membership' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', totalSpent: 3299.93, avgRating: 4.2, favoriteWine: 'Dom Perignon', membershipTier: 'Monopole Membership' },
  ]);

  // ... (keep existing feedback state)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Customer Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <User className="h-10 w-10 text-green-500 mr-3" />
              <div>
                <h2 className="text-xl font-semibold">{customer.name}</h2>
                <p className="text-gray-400">{customer.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Total Spent: ${customer.totalSpent.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Avg. Rating: {customer.avgRating.toFixed(1)}</span>
              </div>
              <div className="flex items-center">
                <Wine className="h-5 w-5 text-red-500 mr-2" />
                <span>Favorite Wine: {customer.favoriteWine}</span>
              </div>
              <div className="flex items-center">
                <Crown className="h-5 w-5 text-purple-500 mr-2" />
                <span>Membership: {customer.membershipTier}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ... (keep existing feedback section) */}
    </div>
  );
};

export default CustomerInsights;