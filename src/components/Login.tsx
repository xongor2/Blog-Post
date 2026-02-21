import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 p-8"
      >
        <div className="mb-8 text-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter mb-2 block">BLOG.</Link>
          <h2 className="text-xl font-medium text-stone-600">Welcome back</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-stone-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900/5 focus:border-stone-900 transition-all"
              placeholder="Enter your name"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/10"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-stone-400">
          Just enter any name to start blogging.
        </p>
      </motion.div>
    </div>
  );
}
