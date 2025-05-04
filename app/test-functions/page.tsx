'use client';

import React, { useState } from 'react';

export default function TestFunctions() {
  const [feeResult, setFeeResult] = useState<any>(null);
  const [maintenanceResult, setMaintenanceResult] = useState<any>(null);
  const [votingResult, setVotingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testFeeCalculation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/calculate-fees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitSize: 100,
          unitType: 'apartment',
          hasParking: true,
          hasStorage: false
        })
      });
      const data = await response.json();
      setFeeResult(data);
    } catch (err) {
      setError('Error testing fee calculation');
    } finally {
      setLoading(false);
    }
  };

  const testMaintenancePrioritization = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/prioritize-maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issueType: 'urgent',
          description: 'Leaking roof',
          location: 'Unit 101',
          reportedBy: 'John Doe',
          timestamp: new Date().toISOString()
        })
      });
      const data = await response.json();
      setMaintenanceResult(data);
    } catch (err) {
      setError('Error testing maintenance prioritization');
    } finally {
      setLoading(false);
    }
  };

  const testVotingPower = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/calculate-voting-power', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitEntitlement: 100,
          totalEntitlements: 1000,
          isOwnerOccupied: true,
          hasOutstandingFees: false
        })
      });
      const data = await response.json();
      setVotingResult(data);
    } catch (err) {
      setError('Error testing voting power calculation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Test Edge Functions</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* Fee Calculation Test */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">1. Test Fee Calculation</h2>
          <button
            onClick={testFeeCalculation}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Testing...' : 'Test Fee Calculation'}
          </button>
          {feeResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(feeResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Maintenance Prioritization Test */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">2. Test Maintenance Prioritization</h2>
          <button
            onClick={testMaintenancePrioritization}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Testing...' : 'Test Maintenance Prioritization'}
          </button>
          {maintenanceResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(maintenanceResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Voting Power Test */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">3. Test Voting Power Calculation</h2>
          <button
            onClick={testVotingPower}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Testing...' : 'Test Voting Power Calculation'}
          </button>
          {votingResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <pre className="whitespace-pre-wrap">
                {JSON.stringify(votingResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 