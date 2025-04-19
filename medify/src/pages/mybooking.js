import React, { useState, useEffect } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('myBookings'); // Use a consistent key
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking, index) => (
          <div key={index}>
            <h3>{booking.hospital}</h3>
            <p>{booking.address}</p>
            <p>{booking.date} | {booking.slot}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
