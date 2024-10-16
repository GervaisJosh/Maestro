import React, { useState } from 'react';
import { Package, Download } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([
    { id: 1, date: '2023-05-15', items: 'Chateau Margaux 2015 (2)', total: 1199.98, status: 'Delivered' },
    { id: 2, date: '2023-04-22', items: 'Opus One 2018 (1), Dom Perignon 2010 (1)', total: 649.98, status: 'Delivered' },
    { id: 3, date: '2023-03-10', items: 'Sassicaia 2017 (3)', total: 899.97, status: 'Delivered' },
  ]);

  const handleDownloadInvoice = (orderId) => {
    // Placeholder for invoice download functionality
    console.log(`Downloading invoice for order ${orderId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Order History</h1>
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">#{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                <td className="px-6 py-4 text-sm">{order.items}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDownloadInvoice(order.id)}
                    className="text-green-500 hover:text-green-400"
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;