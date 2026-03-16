import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegister } from '../states/auth/action';

function RegisterInput() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ================= VALIDATION =================
    if (!form.fullName || !form.email || !form.password) {
      toast.error('Please fill all fields');
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Password does not match');
      return;
    }

    // ================= LOADING =================
    const loadingToast = toast.loading('Creating account...');

    try {
      await dispatch(
        asyncRegister({
          name: form.fullName,
          email: form.email,
          password: form.password,
        }),
      );

      toast.success('Account created successfully!', { id: loadingToast });

      navigate('/login', { replace: true });
    } catch {
      toast.error('Failed to register. Email may already be used.', {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 sm:px-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="fullName" type="text" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" />

          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" />

          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" />

          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full border p-2 rounded dark:bg-gray-700 dark:border-gray-600" />

          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterInput;
