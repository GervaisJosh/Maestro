import React from 'react';
import { Bell, Truck, Star, Gift } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, type: 'shipment', message: 'Your order of Chateau Margaux 2016 has been shipped!', date: '2023-06-10', icon: Truck },
    { id: 2, type: 'rating', message: 'Don\'t forget to rate the Opus One 2018 you recently enjoyed!', date: '2023-06-08', icon: Star },
    { id: 3, type: 'recommendation', message: 'New wines matching your taste profile are now available!', date: '2023-06-05', icon: Gift },
    { id: 4, type: 'shipment', message: 'Your Krug Grande Cuvée will be delivered tomorrow.', date: '2023-06-03', icon: Truck },
  ];

  const getIconColor = (type) => {
    switch (type) {
      case 'shipment':
        return 'text-blue-500';
      case 'rating':
        return 'text-yellow-500';
      case 'recommendation':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-gray-800 rounded-lg shadow-md p-4 flex items-start">
            <div className={`${getIconColor(notification.type)} mr-4 mt-1`}>
              <notification.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="mb-1">{notification.message}</p>
              <p className="text-sm text-gray-400">{notification.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;