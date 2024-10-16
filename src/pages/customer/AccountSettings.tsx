import React, { useState } from 'react';
import { User, Mail, Lock, CreditCard, Crown, Send } from 'lucide-react';

const AccountSettings = ({ userRole }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    password: '********',
    paymentMethod: '**** **** **** 1234',
    membershipTier: 'Premier Cru Membership',
  });

  const [feedback, setFeedback] = useState({
    category: '',
    rating: '',
    comment: '',
  });

  const membershipTiers = [
    { name: 'First Growth Membership', price: 150 },
    { name: 'Premier Cru Membership', price: 300 },
    { name: 'Grand Cru Membership', price: 750 },
    { name: 'Monopole Membership', price: 1000 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (update user details)
    console.log('User details updated:', user);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    console.log('Feedback submitted:', feedback);
    // Reset feedback form
    setFeedback({ category: '', rating: '', comment: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Account Settings</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            <User className="inline-block mr-2" size={18} />
            Name
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            <Mail className="inline-block mr-2" size={18} />
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            <Lock className="inline-block mr-2" size={18} />
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {userRole === 'customer' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="paymentMethod">
                <CreditCard className="inline-block mr-2" size={18} />
                Payment Method
              </label>
              <input
                type="text"
                id="paymentMethod"
                value={user.paymentMethod}
                onChange={(e) => setUser({ ...user, paymentMethod: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                <Crown className="inline-block mr-2" size={18} />
                Membership Tier
              </label>
              <div className="grid grid-cols-2 gap-4">
                {membershipTiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      user.membershipTier === tier.name ? 'border-green-500 bg-green-500 bg-opacity-20' : 'border-gray-600'
                    }`}
                    onClick={() => setUser({ ...user, membershipTier: tier.name })}
                  >
                    <h3 className="font-semibold">{tier.name}</h3>
                    <p className="text-sm text-gray-400">${tier.price}/month</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Save Changes
        </button>
      </form>

      {userRole === 'customer' && (
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Feedback & Suggestions</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={feedback.category}
                onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a category</option>
                <option value="wine">Wine Selection</option>
                <option value="delivery">Delivery Experience</option>
                <option value="customer_service">Customer Service</option>
                <option value="website">Website/App</option>
                <option value="events">Wine Events</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="rating">
                Rating
              </label>
              <select
                id="rating"
                value={feedback.rating}
                onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a rating</option>
                <option value="5">Excellent</option>
                <option value="4">Good</option>
                <option value="3">Average</option>
                <option value="2">Below Average</option>
                <option value="1">Poor</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="comment">
                Your Feedback
              </label>
              <textarea
                id="comment"
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={4}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              <Send className="mr-2" size={18} />
              Submit Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;