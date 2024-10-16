import React, { useState } from 'react';
import { Wine, Edit, Trash2 } from 'lucide-react';

const WineInventory = () => {
  const [wines, setWines] = useState([
    { id: 1, name: 'Chateau Margaux 2015', type: 'Red', region: 'Bordeaux', stock: 24, price: 599.99 },
    { id: 2, name: 'Opus One 2018', type: 'Red', region: 'Napa Valley', stock: 18, price: 399.99 },
    { id: 3, name: 'Dom Perignon 2010', type: 'Champagne', region: 'Champagne', stock: 36, price: 249.99 },
  ]);

  const handleEdit = (id) => {
    // Placeholder for edit functionality
    console.log('Edit wine with id:', id);
  };

  const handleDelete = (id) => {
    // Placeholder for delete functionality
    setWines(wines.filter(wine => wine.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Wine Inventory Management</h1>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {wines.map((wine) => (
              <tr key={wine.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Wine className="h-6 w-6 text-red-500 mr-2" />
                    <div className="text-sm font-medium">{wine.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{wine.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{wine.region}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{wine.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">${wine.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => handleEdit(wine.id)} className="text-blue-500 hover:text-blue-600 mr-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(wine.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={18} />
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

export default WineInventory;