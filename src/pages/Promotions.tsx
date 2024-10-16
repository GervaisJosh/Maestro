import React from 'react';
import { Gift, Calendar, Users } from 'lucide-react';

const Promotions = () => {
  const promotions = [
    { id: 1, name: 'Summer Wine Festival', discount: '20% off', startDate: '2023-07-01', endDate: '2023-07-31', targetGroup: 'All Customers' },
    { id: 2, name: 'Luxury Wine Collection', discount: '15% off', startDate: '2023-08-15', endDate: '2023-09-15', targetGroup: 'Premium Members' },
    { id: 3, name: 'New Customer Welcome', discount: '10% off first order', startDate: '2023-06-01', endDate: '2023-12-31', targetGroup: 'New Customers' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Promotions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{promo.name}</h2>
              <Gift className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-500 mb-4">{promo.discount}</p>
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-gray-400" />
              <span>{promo.startDate} to {promo.endDate}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-gray-400" />
              <span>{promo.targetGroup}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;