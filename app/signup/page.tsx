'use client';

import React, { useState } from "react";
import "../globals.css";
import Logo from "../components/Logo";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from '../../lib/supabaseClient';

const Signup: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.fullName
          }
        }
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        if (data.user && !data.user.confirmed_at) {
          setVerificationSent(true);
        }
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
          <h1>Sign Up</h1>
          <p>Create your account</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && verificationSent && (
          <div className="success-message">
            Signup successful! <br/>A verification email has been sent, verify your email before logging in.<br />

          </div>
        )}
        {success && !verificationSent && (
          <div className="success-message">
            Signup successful! Redirecting to login page...
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          <button
            type="submit"
            className="login-button"
            disabled={isLoading || success}
          >
            {isLoading ? 'Signing up...' : success ? 'Redirecting...' : 'Sign Up'}
          </button>
        </form>
        <p className="register-link">
          Already have an account?{' '}
          <Link href="/login" className="register-link-text">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup; 