import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import { asyncLogout } from '../states/auth/action';

function Navbar() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    dispatch(asyncLogout());
    setOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold">DevTalk</h1>

        <div className="flex items-center gap-6">
          {/* Threads */}
          <NavLink to="/" className={({ isActive }) => `relative px-1 pb-1 transition ${isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-indigo-500'}`}>
            {({ isActive }) => (
              <>
                Threads
                {isActive && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-600 rounded"></span>}
              </>
            )}
          </NavLink>

          {/* Leaderboard */}
          <NavLink to="/leaderboard" className={({ isActive }) => `relative px-1 pb-1 transition ${isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-indigo-500'}`}>
            {({ isActive }) => (
              <>
                Leaderboards
                {isActive && <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-indigo-600 rounded"></span>}
              </>
            )}
          </NavLink>

          {/* BELUM LOGIN */}
          {!authUser && (
            <NavLink to="/login" className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-500 transition">
              Login
            </NavLink>
          )}

          {/* SUDAH LOGIN */}
          {authUser && (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar */}
              <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-full overflow-hidden hover:ring-2 hover:ring-indigo-500 transition">
                <img src={authUser.avatar} alt="avatar" className="w-full h-full object-cover" />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-lg border overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{authUser.name}</p>
                    <p className="text-sm text-gray-500">{authUser.email}</p>
                  </div>

                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 font-medium hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 transition">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
