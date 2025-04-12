import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { center } = location.state;
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  const timeSlots = ['Morning', 'Afternoon', 'Evening'];

  const handleBook = () => {
    const booking = {
      hospital: center['Hospital Name'],
      address: center.Address,
      date,
      slot,
    };
    const existing = JSON.parse(localStorage.getItem('bookings')) || [];
    existing.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existing));
    navigate('/my-bookings');
  };

  const today = new Date();
  const nextWeek = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  return (
    <div>
      <h2>{center['Hospital Name']}</h2>
      <label>Select Date:</label>
      <select value={date} onChange={(e) => setDate(e.target.value)}>
        <option value=''>Select</option>
        {nextWeek.map((d) => <option key={d} value={d}>{d}</option>)}
      </select>

      <div>
        <p>Today</p>
        {timeSlots.map((t) => (
          <p key={t} onClick={() => setSlot(t)} style={{ cursor: 'pointer', fontWeight: slot === t ? 'bold' : 'normal' }}>{t}</p>
        ))}
      </div>

      <button onClick={handleBook}>Confirm Booking</button>
    </div>
  );
}

export default BookingPage;
