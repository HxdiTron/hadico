'use client';

import React, { useState, useEffect } from "react";
import "../globals.css";
import Logo from "../components/Logo";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    staySignedIn: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showDevMessage, setShowDevMessage] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  // Get environment variables with fallbacks
  const adminUser = process.env.NEXT_PUBLIC_ADMIN_USER || 'admin';
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password123';

  // Make welcome message disappear after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Make dev message disappear after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDevMessage(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Check if user is already logged in with stay signed in
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const staySignedIn = localStorage.getItem('staySignedIn');
    if (userData && staySignedIn === 'true') {
      router.replace('/notice-board');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data and session info
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('staySignedIn', formData.staySignedIn.toString());
        
        // Set session expiry to 30 days if stay signed in is checked
        if (formData.staySignedIn) {
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30);
          localStorage.setItem('sessionExpiry', expiryDate.toISOString());
        }

        setSuccess(true);
        // Use window.location for navigation
        setTimeout(() => {
          window.location.href = '/notice-board';
        }, 1000);
      } else {
        setError(data.error || 'Login failed');
        setShowDevMessage(true); // Show dev message again on login failure
      }
    } catch (err) {
      setError('An error occurred during login');
      setShowDevMessage(true); // Show dev message again on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  return (
    <div className="login-container">
      <Link href="/" className="logo-container">
        <Logo />
      </Link>
      <div className="login-image">
        <Image
          src="/image.png"
          alt="Background"
          fill
          className="login-image"
          priority
          quality={100}
          sizes="(max-width: 1024px) 100vw, 40vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="login-image-overlay"></div>
      </div>
      <div className="login-form">
          <div className="login-header">
            <h1>Welcome Back Resident!</h1>
            <p>Please enter your login details</p>
          </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Login successful! Redirecting to Notice Board...</div>}
        {showDevMessage && (
          <div className="dev-message">
            <p>
              Login Details
              <button 
                className="close-button" 
                onClick={() => setShowDevMessage(false)}
              >
                ×
              </button>
            </p>
            <p>User ID: {adminUser}</p>
            <p>Password: {adminPassword}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>User ID</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your user ID" 
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password" 
            required
          />

          <div className="login-options">
            <div>
              <input 
                type="checkbox" 
                id="stay-signed-in" 
                name="staySignedIn"
                checked={formData.staySignedIn}
                onChange={handleChange}
              />
              <label htmlFor="stay-signed-in">Stay signed in</label>
            </div>
            <a href="#">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isLoading || success}
          >
            {isLoading ? 'Logging in...' : success ? 'Redirecting...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 