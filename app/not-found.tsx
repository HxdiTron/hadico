'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="error-container">
        <div className="error-content">
          <h1>404</h1>
          <h2>Page Not Found L</h2>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <Link href="/" className="back-home">
            Back to Home
          </Link>
        </div>
        <div className="error-image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="building-icon">
            <rect x="60" y="40" width="80" height="140" fill="#1a1a1a"/>
            <rect x="70" y="50" width="20" height="20" fill="#FF8F37"/>
            <rect x="110" y="50" width="20" height="20" fill="#FF8F37"/>
            <rect x="70" y="80" width="20" height="20" fill="#FF8F37"/>
            <rect x="110" y="80" width="20" height="20" fill="#FF8F37"/>
            <rect x="70" y="110" width="20" height="20" fill="#FF8F37"/>
            <rect x="110" y="110" width="20" height="20" fill="#FF8F37"/>
            <rect x="85" y="150" width="30" height="30" fill="#FF8F37"/>
          </svg>
        </div>
      </div>
    </div>
  );
} 