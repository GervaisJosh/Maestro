import React from 'react';
import { Wine, Star } from 'lucide-react';

const Recommendations = () => {
  const recommendedWines = [
    { id: 1, name: 'Chateau Margaux 2016', type: 'Red', region: 'Bordeaux', rating: 98 },
    { id: 2, name: 'Opus One 2019', type: 'Red', region: 'Napa Valley', rating: 97 },
    { id: 3, name: 'Dom Perignon 2012', type: 'Champagne', region: 'Champagne', rating: 96 },
    { id: 4, name: 'Sassicaia 2018', type: 'Red', region: 'Tuscany', rating: 95 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Recommended Wines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendedWines.map((wine) => (
          <div key={wine.id} className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Wine className="h-8 w-8 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold">{wine.name}</h2>
            </div>
            <p className="text-gray-400 mb-2">{wine.type} | {wine.region}</p>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="font-bold mr-1">{wine.rating}</span>
              <span className="text-sm text-gray-400">/ 100</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;