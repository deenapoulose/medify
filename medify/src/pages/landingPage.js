import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('https://meddata-backend.onrender.com/states')
        .then((res) => setStates(res.data))
        .catch((err) => console.error(err));
    }, []);
  
    useEffect(() => {
      if (selectedState) {
        axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
          .then((res) => setCities(res.data))
          .catch((err) => console.error(err));
      }
    }, [selectedState]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedState && selectedCity) {
        navigate(`/results?state=${selectedState}&city=${selectedCity}`);
      }
    };
  
    return (
      <div className="home-page">
        <nav className="navbar">
          <ul className="nav-links">
            <li>Find Doctors</li>
            <li>Hospitals</li>
            <li>Medicines</li>
          </ul>
        </nav>
        <section className="search-section">
          <form onSubmit={handleSubmit} className="search-form">
            <div id="state" className="dropdown">
              <label>State:</label>
              <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div id="city" className="dropdown">
              <label>City:</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="search-button">Search</button>
          </form>
        </section>
      </div>
    );
  };
  

export default LandingPage;
