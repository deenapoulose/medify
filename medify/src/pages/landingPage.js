import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();
 console.log('Landing page')
  useEffect(() => {
    axios.get('https://meddata-backend.onrender.com/states')
      .then(res => setStates(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
        .then(res => setCities(res.data))
        .catch(console.error);
    }
  }, [selectedState]);

  const handleSearch = () => {
    navigate(`/results?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <div>
      <h1>Find Medical Centers</h1>
      <div id="state">
        <select onChange={e => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
      </div>

      <div id="city">
        <select onChange={e => setSelectedCity(e.target.value)}>
          <option value="">Select City</option>
          {cities.map((c, i) => <option key={i} value={c}>{c}</option>)}
        </select>
      </div>

      <button id="searchBtn" onClick={handleSearch} type="submit">Search</button>
    </div>
  );
}

export default LandingPage;
