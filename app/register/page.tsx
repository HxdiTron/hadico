'use client';

import React, { useState } from "react";
import "../globals.css";
import Logo from "../components/Logo";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    unitNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          unitNumber: formData.unitNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      // Show success message
      setSuccess(true);
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setLoading(false);
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
          width={1272}
          height={1115}
          className="login-image"
          priority
          quality={100}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="login-image-overlay"></div>
      </div>
      <div className="login-form">
        <div className="login-header">
          <h1>Create Your Account</h1>
          <p>Please fill in your details to register</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Registration successful! Redirecting to login...</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="unitNumber">Unit Number</label>
            <input
              id="unitNumber"
              type="text"
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleChange}
              placeholder="Enter your unit number" 
              required
            />
          </div>

          <div className="form-group">
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
          </div>

          <div className="form-group">
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
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading || success}
          >
            {loading ? 'Registering...' : success ? 'Registration Complete!' : 'Register'}
          </button>
        </form>
        <p className="register-link">
          Already have an account?{' '}
          <Link href="/login" className="register-link-text">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 