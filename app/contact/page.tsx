'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div className="contact-page">
          <div className="contact-header">
            <h1>Contact Us</h1>
            <p>Get in touch with our management team</p>
          </div>

          {/* Image Slider */}
          <div className="image-slider">
            <Image
              src="/1.png"
              alt="Gallery Image 1"
              width={300}
              height={450}
            />
            <Image
              src="/2.png"
              alt="Gallery Image 2"
              width={300}
              height={450}
            />
            <Image
              src="/3.png"
              alt="Gallery Image 3"
              width={300}
              height={450}
            />
            <Image
              src="/4.png"
              alt="Gallery Image 4"
              width={300}
              height={450}
            />
            <Image
              src="/5.png"
              alt="Gallery Image 5"
              width={300}
              height={450}
            />
          </div>

          {/* Contact Information */}
          <div className="contact-info-section">
            <div className="contact-info-card">
              <h2>Office Hours</h2>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 10:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>

            <div className="contact-info-card">
              <h2>Contact Details</h2>
              <p>Email: <a href="mailto:management@hadi&co.au">management@hadi&co.au</a></p>
              <p>Phone: (+61) 987 654 32</p>
              <p>Address: 123 Building Street, Sydney, NSW 2000</p>
              <p><a href="/api" target="_blank" rel="noopener noreferrer" style={{ color: '#FF8F37', textDecoration: 'underline' }}>View our FAQ</a></p>
            </div>

            <div className="contact-info-card">
              <h2>Emergency Contact</h2>
              <p>24/7 Emergency Line: (+61) 987 654 31</p>
              <p>Security: (+61) 987 654 30</p>
              <p>Maintenance: (+61) 987 654 29</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 