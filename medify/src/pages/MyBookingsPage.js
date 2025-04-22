import React, { useEffect, useState } from 'react';

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((b, i) => (
        <div key={i}>
          <h3>{b['Hospital Name']}</h3>
          <p>{b.Address}, {b.City}, {b.State}</p>
          <p>Date: {b.bookingDate} Time: {b.bookingTime}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookingsPage;
