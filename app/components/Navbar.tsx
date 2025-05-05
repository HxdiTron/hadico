import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session) {
        // Fetch user profile from 'profiles' table
        const { data, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('email', session.user.email)
          .single();
        if (data && data.name) {
          setUserName(data.name ?? '');
        } else {
          setUserName(session.user.email ?? '');
        }
      } else {
        setUserName(null);
      }
    };
    checkSession();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkSession();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('staySignedIn');
      setTimeout(() => {
        router.replace('/');
      }, 200);
    } catch (error) {
      alert('Logout failed. Please try again.');
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link href="/" className="brand">
        Hadi<span className="brand-orange">&Co.</span>
      </Link>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div className="navLinks">
          <Link href="/notice-board">Notice Board</Link>
          <Link href="/maintenance">Maintenance Requests</Link>
          <Link href="/current-members">Current Members</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {isAuthenticated && userName && (
          <span style={{ fontWeight: 500, fontSize: '1.1rem', color: '#fff' }}>Welcome, {userName}</span>
        )}
        {!isAuthenticated && (
          <Link href="/login" className="login-btn">
            <i className="fas fa-user"></i>
            Owner's Login
          </Link>
        )}
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 