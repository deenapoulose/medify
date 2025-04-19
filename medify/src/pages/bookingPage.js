import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { center } = location.state;
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');

  const timeSlots = ['Morning', 'Afternoon', 'Evening'];
  const handleConfirmBooking = () => {
    const newBooking = {
      hospital: center['Hospital Name'],
      address: `${center.Address}, ${center.City}, ${center.State} - ${center['ZIP Code']}`,
      date: date,
      slot: slot,
    };
  
    const existing = JSON.parse(localStorage.getItem('myBookings')) || [];
    existing.push(newBooking);
    localStorage.setItem('myBookings', JSON.stringify(existing));
  
    navigate('/my-bookings');
  };
  

  const today = new Date();
  const availableDates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  return (
    <div>
      <h2>{center['Hospital Name']}</h2>

      <label>Select Date:</label>
      <select onChange={(e) => setDate(e.target.value)} value={date}>
        <option value="">Select Date</option>
        {availableDates.map((d, index) => (
          <option key={index} value={d}>{d}</option>
        ))}
      </select>

      <div>
      <p>Select Time Slot:</p>
<div>
  {timeSlots.map((t) => (
    <p
      key={t}
      onClick={() => setSlot(t)}
      style={{
        cursor: 'pointer',
        fontWeight: slot === t ? 'bold' : 'normal',
      }}
    >
      {t}
    </p>
  ))}
</div>

      </div>

      {date && slot && (
        <button onClick={handleConfirmBooking}>Confirm Booking</button>
      )}
    </div>
  );
}

export default BookingPage;
