import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, CreditCard, Crown, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile, updateUserProfile } from '../api/users';
import { useNavigate } from 'react-router-dom';

const AccountSettings = ({ userRole }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    wine_tier: 1,
    preferences: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserProfile(user.id);
        setProfile(userData);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to update your profile');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateUserProfile(user.id, profile);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error updating user profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
      setError('Failed to sign out');
    }
  };

  const membershipTiers = [
    { name: 'First Growth Membership', price: 150 },
    { name: 'Premier Cru Membership', price: 300 },
    { name: 'Grand Cru Membership', price: 750 },
    { name: 'Monopole Membership', price: 1000 },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

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
            value={profile.first_name}
            onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
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
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
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
            placeholder="********"
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="paymentMethod">
            <CreditCard className="inline-block mr-2" size={18} />
            Payment Method
          </label>
          <input
            type="text"
            id="paymentMethod"
            placeholder="**** **** **** 1234"
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
                  profile.wine_tier === tier.price ? 'border-green-500 bg-green-500 bg-opacity-20' : 'border-gray-600'
                }`}
                onClick={() => setProfile({ ...profile, wine_tier: tier.price })}
              >
                <h3 className="font-semibold">{tier.name}</h3>
                <p className="text-sm text-gray-400">${tier.price}/month</p>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Save Changes
        </button>
      </form>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center"
      >
        <Send className="mr-2" size={18} />
        Logout
      </button>
    </div>
  );
};

export default AccountSettings;