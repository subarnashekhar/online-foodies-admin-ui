import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Menubar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token) {
      setIsLoggedIn(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          setUser(null);
        }
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    // Check auth status on component mount
    checkAuthStatus();

    // Listen for storage changes (when user logs in/out)
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuthStatus();
      }
    };

    // Also listen for custom events that might be dispatched
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <button className="btn btn-primary" id="sidebarToggle" onClick={toggleSidebar}>
          <i className='bi bi-list'></i>
        </button>

        {isLoggedIn ? (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '0px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <span style={{ 
              fontSize: '14px', 
              color: '#333',
              fontWeight: '500'
            }}>
              {user?.name || 'User'}
            </span>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={() => navigate('/login')} style={{
            position: 'absolute',
            top: '10px',
            right: '0px'
          }}>
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

export default Menubar;