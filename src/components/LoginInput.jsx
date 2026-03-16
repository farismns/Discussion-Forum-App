import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncLogin } from '../states/auth/action';

function LoginInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading('Signing in...');

    try {
      await dispatch(asyncLogin({ email, password }));

      toast.success('Welcome back!', { id: loadingToast });
      navigate('/', { replace: true });
    } catch {
      toast.error('Invalid Email or Password', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sm:px-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Sign in to your account</h2>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Email
            </label>

            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-gray-100">
              Password
            </label>

            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-3 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" disabled={loading} className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-500 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginInput;
