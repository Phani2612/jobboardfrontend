import React from 'react';
import '../App.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

function HighlightAboutUs() {
  return (
    <div className='aboutmain' >
        <div className="highlight-about-us">
      <h2>About Us</h2>
      <p className="highlighted-text">
        I am an aspiring MERN stack developer with over 7 months of experience.
        I am passionate about creating scalable and efficient web applications
        using modern technologies. I am eager to contribute to real MERN
        projects and further enhance my skills.
      </p>
    </div>


<div className="back-to-home-button-container">
<Link to="/home" className="back-to-home-button">
  Back to Home
</Link>
</div>
    </div>
  );
}

export default HighlightAboutUs;
