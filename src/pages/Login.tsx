import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Wine } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signIn, signInWithGoogle, resendConfirmationEmail } from '../api/supabaseQueries';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowResendConfirmation(false);

    try {
      const { user } = await signIn(email, password);
      setUser(user);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.message) {
        setError(`Login failed: ${err.message}`);
      } else if (err.error_description) {
        setError(`Login failed: ${err.error_description}`);
      } else {
        setError('An unexpected error occurred during login. Please try again.');
      }
      if (err.status === 400) {
        setShowResendConfirmation(true);
      }
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
        throw new Error('No redirect URL returned from signInWithGoogle');
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      setError(`Failed to sign in with Google: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    try {
      await resendConfirmationEmail(email);
      setError('Confirmation email resent. Please check your inbox.');
      setShowResendConfirmation(false);
    } catch (err: any) {
      console.error('Error resending confirmation email:', err);
      setError(`Failed to resend confirmation email: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="px-8 py-6 mt-4 text-left bg-gray-800 shadow-lg rounded-lg w-96">
        <div className="flex items-center justify-center mb-4">
          <Wine className="h-10 w-10 text-green-500 mr-2" />
          <h3 className="text-2xl font-bold text-center text-white">Maestro</h3>
        </div>
        <h4 className="text-xl font-semibold text-center text-white mb-4">Login to your account</h4>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <div>
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
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center"
                disabled={loading}
              >
                <LogIn className="mr-2" size={18} />
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
            </div>
          </div>
        </form>
        <button
          onClick={handleGoogleSignIn}
          className="w-full px-6 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center justify-center"
          disabled={loading}
        >
          <LogIn className="mr-2" size={18} />
          Sign in with Google
        </button>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">Don't have an account? Sign up</Link>
        </div>
        {error && <p className="mt-4 text-xs text-red-500 text-center">{error}</p>}
        {showResendConfirmation && (
          <button
            onClick={handleResendConfirmation}
            className="w-full px-6 py-2 mt-4 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
          >
            Resend Confirmation Email
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;