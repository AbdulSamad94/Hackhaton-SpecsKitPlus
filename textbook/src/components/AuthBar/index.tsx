import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export default function AuthBar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    // Fetch session from Next.js API
    fetch('/api/auth/session', { credentials: 'include', signal })
      .then(res => res.json())
      .then(data => {
        if (!signal.aborted && data.session && data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
            console.error(err);
        }
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/sign-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include',
      });
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="navbar__item">
        <div className="avatar__loading" style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0e0e0' }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="navbar__item">
        <a href="/login" className="button button--primary">
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="navbar__item dropdown dropdown--hoverable">
      <button className="navbar__link" style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}>
        {user.image ? (
          <img src={user.image} alt={user.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#4299e1',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>
        )}
      </button>
      <ul className="dropdown__menu">
        <li>
          <a className="dropdown__link" href="/profile">
            Profile
          </a>
        </li>
        <li>
          <button
            className="dropdown__link"
            onClick={handleLogout}
            style={{ border: 'none', background: 'transparent', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
