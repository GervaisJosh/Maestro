import React, { useState } from 'react';
import { Wine, Search, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Chateau Lafite Rothschild 2016', type: 'Red', region: 'Bordeaux' },
    { id: 2, name: 'Krug Grande Cuvée', type: 'Champagne', region: 'Champagne' },
    { id: 3, name: 'Screaming Eagle Cabernet Sauvignon 2019', type: 'Red', region: 'Napa Valley' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(wine => wine.id !== id));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to search the wine database
    console.log('Searching for:', searchTerm);
    // For now, we'll just log the search term
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">My Top 10 Wines to Try</h1>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for wines..."
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="absolute right-2 top-2">
            <Search className="h-6 w-6 text-gray-400" />
          </button>
        </div>
      </form>

      {wishlist.length === 0 ? (
        <p className="text-gray-400">Your wishlist is empty. Start adding wines you'd like to try!</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((wine, index) => (
            <div key={wine.id} className="bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-green-500 mr-4">#{index + 1}</span>
                <Wine className="h-8 w-8 text-red-500 mr-4" />
                <div>
                  <h2 className="text-xl font-semibold">{wine.name}</h2>
                  <p className="text-gray-400">{wine.type} | {wine.region}</p>
                </div>
              </div>
              <button onClick={() => removeFromWishlist(wine.id)} className="text-gray-400 hover:text-red-500">
                <Trash2 className="h-6 w-6" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;