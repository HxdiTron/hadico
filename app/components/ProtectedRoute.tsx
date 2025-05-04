'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Notification from './Notification';
import { supabase } from '../../lib/supabaseClient';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsAuthenticated(false);
        setShowNotification(true);
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Notification
        message={
          <span>
            Please log in to access this page.{' '}
            <button
              style={{
                background: '#FF8F37',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '0.3rem 1rem',
                marginLeft: '1rem',
                cursor: 'pointer',
                fontWeight: 500
              }}
              onClick={() => router.push('/login')}
            >
              Go to Login
            </button>
          </span>
        }
        isVisible={showNotification && !isAuthenticated}
        onClose={() => setShowNotification(false)}
      />
      {isAuthenticated ? children : null}
    </>
  );
};

export default ProtectedRoute; 