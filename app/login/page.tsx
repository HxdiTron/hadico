import ProtectedRoute from '../components/ProtectedRoute';'use client';

import React, { useState, useEffect, Suspense } from "react";
import "../globals.css";
import Logo from "../components/Logo";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from '../../lib/supabaseClient';

const Login: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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



  useEffect(() => {
    // If redirected from Google sign-in, show success message and redirect
    if (searchParams.get('googleSuccess') === 'true') {
      setSuccess(true);
      setTimeout(() => {
        router.push('/notice-board');
      }, 2000);
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setSuccess(false);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      if (error) {
        setError(error.message || 'Login failed');
        setShowDevMessage(true);
      } else {
        setSuccess(true);
        // Store session data
        if (formData.staySignedIn) {
          localStorage.setItem('staySignedIn', 'true');
        }
        // Show transition message, then redirect
        setTimeout(() => {
          router.push('/notice-board');
        }, 2000);
      }
    } catch (err) {
      setError('An error occurred during login');
      setShowDevMessage(true);
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

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setError(error.message);
    setIsLoading(false);
    // On success, Supabase will redirect back to the app. We handle the message in useEffect above.
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
        
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email" 
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
        <div style={{ margin: '1.5rem 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <img src="/google.webp" alt="Google" style={{ width: 20, height: 20, marginRight: 10 }} />
            Sign in with Google
          </button>
        </div>
        <p className="register-link">
          Don't have an account?{' '}
          <Link href="/signup" className="register-link-text">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

function LoginPageWithSuspense() {
  return (
    <Suspense fallback={null}>
      <Login />
    </Suspense>
  );
}

export default LoginPageWithSuspense; 