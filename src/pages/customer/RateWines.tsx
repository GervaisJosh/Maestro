import React, { useState, useEffect } from 'react';
import { Wine, Star } from 'lucide-react';
import { fetchWines, addWineRating } from '../../api/supabaseQueries';
import { useAuth } from '../../contexts/AuthContext';

const RateWines = () => {
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchWineData();
  }, []);

  const fetchWineData = async () => {
    try {
      const data = await fetchWines();
      setWines(data.map(wine => ({ ...wine, rating: '', notes: '', submitted: false })));
    } catch (err) {
      console.error('Error fetching wines:', err);
      setError('Failed to load wines. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRating = (id, rating) => {
    setWines(wines.map(wine => 
      wine.id === id ? { ...wine, rating: rating } : wine
    ));
  };

  const handleNotes = (id, notes) => {
    setWines(wines.map(wine => 
      wine.id === id ? { ...wine, notes: notes } : wine
    ));
  };

  const handleSubmit = async (id) => {
    if (!user) {
      setError('You must be logged in to submit a rating.');
      return;
    }
    const wine = wines.find(w => w.id === id);
    try {
      await addWineRating({
        user_id: user.id,
        wine_id: id,
        rating: parseInt(wine.rating),
        review: wine.notes
      });
      setWines(wines.map(w => 
        w.id === id ? { ...w, submitted: true } : w
      ));
    } catch (err) {
      console.error('Error submitting rating:', err);
      setError('Failed to submit rating. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Rate Your Wines</h1>
      {loading && <p>Loading wines...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="space-y-6">
          {wines.map((wine) => (
            <div key={wine.id} className="bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Wine className="h-8 w-8 text-red-500 mr-3" />
                  <div>
                    <h2 className="text-xl font-semibold">{wine.name}</h2>
                    <p className="text-gray-400">{wine.varietal} | {wine.region}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={wine.rating}
                    onChange={(e) => handleRating(wine.id, e.target.value)}
                    className="w-16 px-2 py-1 bg-gray-700 rounded-md text-right"
                    placeholder="0-100"
                    disabled={wine.submitted}
                  />
                  <span className="ml-2 text-gray-400">/100</span>
                </div>
              </div>
              <textarea
                className="w-full bg-gray-700 rounded-md p-2 mt-2"
                placeholder="Add your tasting notes..."
                rows={3}
                value={wine.notes}
                onChange={(e) => handleNotes(wine.id, e.target.value)}
                disabled={wine.submitted}
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleSubmit(wine.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                  disabled={wine.submitted}
                >
                  {wine.submitted ? 'Review Submitted' : 'Submit Review'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RateWines;