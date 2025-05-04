'use client';

import React, { useState, useEffect } from "react";
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Notification from '../components/Notification';
import { useRouter } from 'next/navigation';

interface MaintenanceRequest {
  id: string;
  name: string;
  unitNumber: string;
  issueType: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  date: string;
}

const Maintenance: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    unitNumber: '',
    issueType: '',
    description: ''
  });
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user's maintenance requests from localStorage
  useEffect(() => {
    const savedRequests = localStorage.getItem('maintenanceRequests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      setShowNotification(true);
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.unitNumber || !formData.issueType || !formData.description) {
      setError('Please fill in all fields');
      return;
    }

    // Create new request
    const newRequest: MaintenanceRequest = {
      id: Date.now().toString(),
      name: formData.name,
      unitNumber: formData.unitNumber,
      issueType: formData.issueType,
      description: formData.description,
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };

    // Update requests list
    const updatedRequests = [...requests, newRequest];
    setRequests(updatedRequests);
    localStorage.setItem('maintenanceRequests', JSON.stringify(updatedRequests));

    // Show success message and reset form
    setSuccess(true);
    setFormData({
      name: '',
      unitNumber: '',
      issueType: '',
      description: ''
    });

    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="maintenance-container">
      <Notification
        message="Please login to access the Maintenance page."
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
      {isAuthenticated && (
        <>
          <Navbar />
          <main className="maintenance-content">
            <h1>Maintenance Request</h1>
            <div className="maintenance-grid">
              <div className="maintenance-form-container modern-form">
                <h2 className="form-title">Submit a Request</h2>
                {success && (
                  <div className="success-message">
                    Maintenance request submitted successfully!
                  </div>
                )}
                {error && (
                  <div className="error-message">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="maintenance-form">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="unitNumber">Unit Number</label>
                    <input
                      type="text"
                      id="unitNumber"
                      name="unitNumber"
                      value={formData.unitNumber}
                      onChange={handleChange}
                      required
                      placeholder="e.g. A-12"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="issueType">Issue Type</label>
                    <select
                      id="issueType"
                      name="issueType"
                      value={formData.issueType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select an issue type</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="heating">Heating/Cooling</option>
                      <option value="appliance">Appliance</option>
                      <option value="structural">Structural</option>
                      <option value="pest">Pest Control</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Issue Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Please describe the issue in detail..."
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">
                    Submit Request
                  </button>
                </form>
              </div>

              <div className="requests-history modern-requests">
                <h2>Your Maintenance Requests</h2>
                {requests.length === 0 ? (
                  <div className="no-requests-illustration">
                    <p className="no-requests">No maintenance requests submitted yet.<br/>Your requests will appear here.</p>
                  </div>
                ) : (
                  <div className="requests-list">
                    {requests.map((request) => (
                      <div key={request.id} className="request-card modern-card">
                        <div className="request-header">
                          <div className="request-header-left">
                            <span className="request-date">{request.date}</span>
                          </div>
                          <span className={`request-status modern-status ${request.status.toLowerCase()}`}>
                            {request.status}
                          </span>
                        </div>
                        <div className="request-details">
                          <p><strong>Unit:</strong> {request.unitNumber}</p>
                          <p><strong>Issue:</strong> {request.issueType.charAt(0).toUpperCase() + request.issueType.slice(1)}</p>
                          <p><strong>Description:</strong> {request.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Maintenance; 