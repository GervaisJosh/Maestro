import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wine, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signUp, signInWithGoogle } from '../api/supabaseQueries';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('customer');
  const [restaurantName, setRestaurantName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { user } = await signUp(email, password, username, accountType, restaurantName);
      if (user) {
        setUser(user);
        navigate('/');
      } else {
        throw new Error('Failed to sign up');
      }
    } catch (err) {
      console.error('Detailed Sign-Up Error:', err);
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await signInWithGoogle();
      if (error) throw error;
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No redirect URL returned from signInWithGoogle');
        setError('An error occurred during Google Sign-In. Please try again.');
      }
    } catch (err) {
      console.error('Detailed Google Sign-In Error:', err);
      if (err instanceof Error) {
        setError(`Failed to sign in with Google: ${err.message}`);
      } else {
        setError('An unexpected error occurred during Google Sign-In. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="px-8 py-6 mt-4 text-left bg-gray-800 shadow-lg rounded-lg w-96">
        <div className="flex items-center justify-center mb-4">
          <Wine className="h-10 w-10 text-green-500 mr-2" />
          <h3 className="text-2xl font-bold text-center text-white">Maestro</h3>
        </div>
        <h4 className="text-xl font-semibold text-center text-white mb-4">Create an account</h4>
        <form onSubmit={handleSignUp}>
          <div className="mt-4">
            <div>
              <label className="block text-white" htmlFor="username">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-700 text-white"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-white" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-700 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-white">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-700 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-white">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-700 text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-white">Account Type</label>
              <select
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-700 text-white"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="customer">Customer</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>
            {accountType === 'restaurant' && (
              <div className="mt-4">
                <label className="block text-white">Restaurant Name</label>
                <input
                  type="text"
                  placeholder="Restaurant Name"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 bg-gray-700 text-white"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center justify-center"
                disabled={loading}
              >
                <LogIn className="mr-2" size={18} />
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </div>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full px-6 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center justify-center"
          disabled={loading}
        >
          <LogIn className="mr-2" size={18} />
          Sign up with Google
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-500 hover:underline">Already have an account?</Link>
        </div>
        {error && <p className="mt-4 text-xs text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;