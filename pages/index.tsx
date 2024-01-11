// pages/index.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError(null);

      // Validate form data
      if (!formData.email || !formData.message) {
        setError('Please fill in all required fields.');
        return;
      }else if(!formData.name ) {
        setError('Your name is required.');
        return;
      }

      // Send data to serverless function
      const response = await axios.post('/api/sendEmail', formData);

      if (response.data.success) {
        alert('Email sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError('Failed to send email.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Internal server error.');
    }
  };

  return (
    <div >
      <div className='header'>
        <h1 className='title'>Contact Form</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} pattern="[a-zA-Z]*" />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Message:
          <textarea className='message'  name="message" value={formData.message} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default Home;
