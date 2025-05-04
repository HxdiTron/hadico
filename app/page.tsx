// app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import WelcomeMessage from './components/WelcomeMessage';
import Notification from './components/Notification';

export default function HomePage() {
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

  const ManagementName = process.env.NEXT_PUBLIC_Management_Name || 'Hadi&Co.';

  return (
    <div className="container">
      <WelcomeMessage />
      <Notification 
        message="Please login first to access the Notice Board"
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      <nav className="navbar">
        <Link href="/" className="brand">
          Hadi<span className="brand-orange">&Co.</span>
        </Link>
        <div className="navLinks">
          <a href="/notice-board" onClick={handleNoticeClick}>Notice Board</a>
          <Link href="/contact">Contact Us</Link>
          <Link href="/login" className="login-btn">
            <i className="fas fa-user"></i>
            Owner's Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero relative h-[900px]">
        <Image
          src="/building.jpg"
          alt={`${ManagementName} Building`}
          fill
          className="object-cover"
          priority
          quality={100}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="hero-content">
          <h1 className="hero-title">STRATA MANAGEMENT</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="main">
        {/* Welcome Section */}
        <section className="about-us-section">
          <div className="about-us-container">
            <div className="about-us-header">
              <h2>Welcome to {ManagementName}</h2>
              <p>Discover the luxury and comfort that defines our community</p>
            </div>
            
            <div className="about-us-content">
              <div className="about-us-card">
                <div className="about-us-icon">🏢</div>
                <h3>Our Building</h3>
                <p>{ManagementName} stands as a testament to modern architecture and luxury living. With 50 floors of premium residences, our building offers unparalleled views of Sydney's iconic skyline.</p>
              </div>
              
              <div className="about-us-card">
                <div className="about-us-icon">👥</div>
                <h3>Our Community</h3>
                <p>We foster a vibrant, diverse community where neighbors become friends. Our residents enjoy regular social events, wellness programs, and exclusive member benefits.</p>
              </div>
              
              <div className="about-us-card">
                <div className="about-us-icon">🌟</div>
                <h3>Our Values</h3>
                <p>At {ManagementName}, we believe in sustainability, security, and exceptional service. Our dedicated staff works tirelessly to ensure your comfort and satisfaction.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="contactInfo">
          <div>Contact us:</div>
          <div>Email: <a href="mailto:management@hadi&co.au">management@hadi&co.au</a></div>
          <div>Phone: (+61) 987 654 3</div>
        </div>
        <div className="officeHours">
          Office Hours:<br />
          Monday – Friday<br />
          9am – 5pm
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Hadi&Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
}