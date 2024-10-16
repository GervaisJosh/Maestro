import React, { useState } from 'react';
import { Wine } from 'lucide-react';

const WineReviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, customer: 'John Doe', wine: 'Chateau Margaux 2015', rating: 95, comment: 'Exceptional wine, perfect balance and complexity.' },
    { id: 2, customer: 'Jane Smith', wine: 'Opus One 2018', rating: 92, comment: 'Excellent Napa blend, rich and full-bodied.' },
    { id: 3, customer: 'Bob Johnson', wine: 'Dom Perignon 2010', rating: 98, comment: 'The epitome of luxury champagne. Absolutely stunning.' },
  ]);

  const getRatingColor = (rating) => {
    if (rating >= 95) return 'text-green-500';
    if (rating >= 90) return 'text-blue-500';
    if (rating >= 85) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Wine Reviews</h1>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <Wine className="h-6 w-6 text-red-500 mr-2" />
                <div>
                  <h2 className="text-xl font-semibold">{review.wine}</h2>
                  <p className="text-gray-400">Reviewed by {review.customer}</p>
                </div>
              </div>
              <div className={`text-2xl font-bold ${getRatingColor(review.rating)}`}>
                {review.rating}
              </div>
            </div>
            <p className="text-gray-300">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineReviews;