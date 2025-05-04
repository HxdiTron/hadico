import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="contactInfo">
        <div>Contact us:</div>
        <div>Email: <a href="mailto:management@hadi&co.au">management@hadi&co.au</a></div>
        <div>Phone: (+61) 987 654 32</div>
      </div>
      <div className="officeHours">
        Office Hours:<br />
        Monday – Friday<br />
        9am – 5pm
      </div>
      <div className="copyright">
        © 2025 Hadi&Co. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 