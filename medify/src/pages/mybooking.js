

// import React from 'react';
// function MyBookings() {
//     const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  
//     return (
//       <div>
//         <h1>My Bookings</h1>
//         {bookings.length === 0 ? <p>No bookings found.</p> : (
//           {bookings.map((booking, index) => (
//             <div key={index}>
//               <h3>{booking.hospital}</h3>
//               <p>{booking.address}</p>
//               <p>{booking.date} | {booking.slot}</p>
//             </div>
//           ))}
          
//           // bookings.map((booking, i) => (
//           //   <div key={i}>
//           //     <h3>{booking.hospital}</h3>
//           //     <p>{booking.address}</p>
//           //     <p>Date: {booking.date}</p>
//           //     <p>Time: {booking.slot}</p>
//           //   </div>
//           // ))
//         )}
//       </div>
//     );
//   }
  
//   export default MyBookings;
import React from 'react';

function MyBookings() {
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

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
