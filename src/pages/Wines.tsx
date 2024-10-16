import React, { useState, useEffect } from 'react';
import { Wine, Edit, Trash2, Plus } from 'lucide-react';
import { getWines, addWine, updateWine, deleteWine, Wine as WineType } from '../api/wines';
import { useAuth } from '../contexts/AuthContext';

const Wines = () => {
  const [wines, setWines] = useState<WineType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentWine, setCurrentWine] = useState<WineType | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchWines();
  }, []);

  const fetchWines = async () => {
    try {
      const data = await getWines();
      setWines(data);
    } catch (err) {
      console.error('Error fetching wines:', err);
      setError('Failed to load wines');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (wine: WineType) => {
    setCurrentWine(wine);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this wine?')) {
      try {
        const success = await deleteWine(id);
        if (success) {
          setWines(wines.filter(wine => wine.id !== id));
        } else {
          setError('Failed to delete wine');
        }
      } catch (err) {
        console.error('Error deleting wine:', err);
        setError('Failed to delete wine');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentWine) return;

    try {
      if (currentWine.id) {
        const updatedWine = await updateWine(currentWine.id, currentWine);
        if (updatedWine) {
          setWines(wines.map(wine => wine.id === currentWine.id ? updatedWine : wine));
        }
      } else {
        const newWine = await addWine(currentWine);
        if (newWine) {
          setWines([...wines, newWine]);
        }
      }
      setShowModal(false);
    } catch (err) {
      console.error('Error saving wine:', err);
      setError('Failed to save wine');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Wine Inventory Management</h1>
        <button
          onClick={() => {
            setCurrentWine({} as WineType);
            setShowModal(true);
          }}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Wine
        </button>
      </div>
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Varietal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vintage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm">{wine.varietal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{wine.region}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{wine.vintage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">${wine.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{wine.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button onClick={() => handleEdit(wine)} className="text-blue-500 hover:text-blue-600 mr-2">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => wine.id && handleDelete(wine.id)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{currentWine?.id ? 'Edit Wine' : 'Add New Wine'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={currentWine?.name || ''}
                  onChange={(e) => setCurrentWine({...currentWine, name: e.target.value} as WineType)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="varietal">Varietal</label>
                <input
                  type="text"
                  id="varietal"
                  value={currentWine?.varietal || ''}
                  onChange={(e) => setCurrentWine({...currentWine, varietal: e.target.value} as WineType)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="region">Region</label>
                <input
                  type="text"
                  id="region"
                  value={currentWine?.region || ''}
                  onChange={(e) => setCurrentWine({...currentWine, region: e.target.value} as WineType)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="vintage">Vintage</label>
                <input
                  type="number"
                  id="vintage"
                  value={currentWine?.vintage || ''}
                  onChange={(e) => setCurrentWine({...currentWine, vintage: parseInt(e.target.value)} as WineType)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={currentWine?.price || ''}
                  onChange={(e) => setCurrentWine({...currentWine, price: parseFloat(e.target.value)} as WineType)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  value={currentWine?.stock || ''}
                  onChange={(e) => setCurrentWine({...currentWine, stock: parseInt(e.target.value)} as WineType)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wines;