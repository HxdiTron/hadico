import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Notification from './Notification';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);

  const handleNoticeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const userData = localStorage.getItem('userData');
    const staySignedIn = localStorage.getItem('staySignedIn') === 'true';
    const sessionExpiry = localStorage.getItem('sessionExpiry');
    
    // Check if user is logged in and session is valid
    if (userData && staySignedIn && sessionExpiry) {
      const expiryDate = new Date(sessionExpiry);
      if (expiryDate > new Date()) {
        router.push('/notice-board');
        return;
      }
      // If session expired, clear the data
      localStorage.removeItem('userData');
      localStorage.removeItem('staySignedIn');
      localStorage.removeItem('sessionExpiry');
    }
    
    // If we get here, either user is not logged in or session expired
    setShowNotification(true);
  };

  return (
    <>
      <Notification 
        message="Please login to access the Notice Board. Tip: Enable 'Stay signed in' to avoid frequent logins."
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <nav className="navbar">
        <Link href="/" className="brand">
          Hadi<span className="brand-orange">&Co.</span>
        </Link>
        <div className="navLinks">
          <Link href="/">Home</Link>
          <a href="/notice-board" onClick={handleNoticeClick}>Notice Board</a>
          <Link href="/contact">Contact Us</Link>
          <Link href="/login" className="login-btn">
            <i className="fas fa-user"></i>
            Owner's Login
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 