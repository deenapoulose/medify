import React, { useState, useEffect } from "react";

function MyBookings() {
  const stored = localStorage.getItem("bookings"); // changed from 'myBookings'

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("myBookings"); // Use a consistent key
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((b, i) => (
        <div key={i}>
          <h3>{b.hospital}</h3>
          <p>{b.address}</p>
          <p>{b.date}</p>
          <p>{b.slot}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
