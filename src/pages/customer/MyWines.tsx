import React, { useState } from 'react';
import { Wine } from 'lucide-react';

const MyWines = () => {
  const [wines, setWines] = useState([
    { id: 1, name: 'Chateau Margaux 2015', type: 'Red', region: 'Bordeaux', rating: 95, notes: 'Exceptional balance and complexity' },
    { id: 2, name: 'Opus One 2018', type: 'Red', region: 'Napa Valley', rating: 92, notes: 'Rich and full-bodied' },
    { id: 3, name: 'Dom Perignon 2010', type: 'Champagne', region: 'Champagne', rating: 98, notes: 'Luxurious and refined' },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Wines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wines.map((wine) => (
          <div key={wine.id} className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Wine className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold">{wine.name}</h2>
            </div>
            <p className="text-gray-400 mb-2">{wine.type} | {wine.region}</p>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 font-bold mr-2">{wine.rating}</span>
              <span className="text-sm text-gray-400">Your Rating</span>
            </div>
            <p className="text-sm">{wine.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWines;