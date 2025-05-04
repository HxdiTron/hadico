import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
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
    await supabase.auth.signOut();
    localStorage.removeItem('staySignedIn');
    router.replace('/login');
  };

  return (
    <nav className="navbar">
      <Link href="/" className="brand">
        Hadi<span className="brand-orange">&Co.</span>
      </Link>
      <div className="navLinks">
        {/* <Link href="/">Home</Link> */}
        <Link href="/notice-board">Notice Board</Link>
        <Link href="/maintenance">Maintenance</Link>
        <Link href="/contact">Contact Us</Link>
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