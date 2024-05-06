import React, { useState } from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import Axios from 'axios'
import Server_URL from './MyUrl';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);

    Axios.post(`${Server_URL}/message`,formData).then(function(output)
{
    console.log(output)
   
}).catch(function(error)
{
    console.error(error)
})
      window.location.pathname = '/contact'
  };

  return (
      <div>
        <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>

<div className="back-to-home-button-container">
<Link to="/home" className="back-to-home-button">
  Back to Home
</Link>
</div>
      </div>
  );
}

export default Contact;
