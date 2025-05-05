'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';

interface Profile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export default function CurrentMembers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, email, created_at')
          .order('created_at', { ascending: sortOrder === 'asc' });
        if (error) throw error;
        setProfiles(data || []);
      } catch (err) {
        setError('Failed to fetch members');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfiles();
  }, [sortOrder]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 mt-2">Current Members</h1>
            <div className="members-card">
              <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem'}}>
                <h2 style={{fontSize: '1.25rem', fontWeight: 700, color: '#222', margin: 0}}>Registered Users</h2>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <label htmlFor="sort" style={{color: '#444', fontSize: '1rem', fontWeight: 500}}>Sort by join date:</label>
                  <select
                    id="sort"
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value as 'desc' | 'asc')}
                    style={{border: '1px solid #ccc', borderRadius: 6, padding: '0.4rem 1.2rem 0.4rem 0.4rem', fontSize: '1rem', background: '#FFF1E3 ', color: '#222', 
                      fontWeight: 600, boxShadow: '0 1px 2px rgba(60, 60, 60, 0.04)'}}>
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                  </select>
                </div>
              </div>
              <div style={{overflowX: 'auto'}}>
                <table className="members-table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email ID</th>
                      <th>Joined On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={3} style={{textAlign: 'center', padding: '2.5rem 0', color: '#888'}}>Loading members...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={3} style={{textAlign: 'center', padding: '2.5rem 0', color: '#d32f2f'}}>{error}</td>
                      </tr>
                    ) : profiles.length === 0 ? (
                      <tr>
                        <td colSpan={3} style={{textAlign: 'center', padding: '2.5rem 0', color: '#888'}}>No members found</td>
                      </tr>
                    ) : (
                      profiles.map((profile, idx) => (
                        <tr key={profile.id}>
                          <td>{profile.name}</td>
                          <td>{profile.email}</td>
                          <td>{new Date(profile.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 