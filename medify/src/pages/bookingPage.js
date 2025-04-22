import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookingPage() {
  const { state } = useLocation();
  const center = state?.center;
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const handleBooking = () => {
    const booking = {
      ...center,
      bookingDate: selectedDate,
      bookingTime: selectedTime,
    };

    const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
    existing.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existing));
    navigate('/my-bookings');
  };

  return (
    <div>
      <h1>Book Appointment</h1>
      <h3>{center?.['Hospital Name']}</h3>
      <p>Today</p>

      <label>Date: </label>
      <select onChange={(e) => setSelectedDate(e.target.value)}>
        <option>Select Date</option>
        {dates.map((d, i) => (
          <option key={i} value={d}>{d}</option>
        ))}
      </select>

      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>

      <label>Time: </label>
      <select onChange={(e) => setSelectedTime(e.target.value)}>
        <option>Select Time</option>
        <option>10:00 AM</option>
        <option>2:00 PM</option>
        <option>6:00 PM</option>
      </select>

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default BookingPage;