 



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostBusiness.css';

const PostBusiness = () => {
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login', { state: { redirectTo: '/postbusiness' } });
      return;
    }

    setBusinessName(localStorage.getItem('businessName') || '');
    setBusinessDescription(localStorage.getItem('businessDescription') || '');
    const storedFile = localStorage.getItem('businessFile');
    if (storedFile) setFile({ name: storedFile });
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (businessName.length < 10) {
      alert('Business Name must be at least 10 characters long.');
      return;
    }
    if (businessDescription.trim().split(/\s+/).length < 10) {
      alert('Business Description must be at least 10 words.');
      return;
    }

    localStorage.setItem('businessName', businessName);
    localStorage.setItem('businessDescription', businessDescription);
    if (file) localStorage.setItem('businessFile', file.name);

    navigate('/businessman');
  };

  return (
    <div className="BMan-container1">
      <form onSubmit={handleSubmit} className="business-info1">
        <h2>Post Your Business</h2>

        <label>Business Name:</label>
        <textarea
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />

        <label>Business Description:</label>
        <textarea
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          required
        />

        <label>Business Plan (PDF/JPEG/JPG/PNG):</label>
        <input
          type="file"
          accept=".pdf,.jpeg,.jpg,.png"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <p>{file.name}</p>}

        <button className="next-btn1" type="submit">
          Next
        </button>
      </form>
    </div>
  );
};

export default PostBusiness;
