// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// function ResultsPage() {
//   const [centers, setCenters] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const queryParams = new URLSearchParams(location.search);
//   const state = queryParams.get("state");
//   const city = queryParams.get("city");

//   useEffect(() => {
//     if (state && city) {
//       setIsLoading(true);
//       axios
//         .get(
//           `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
//         )
//         .then((res) => {
//           setCenters(res.data);
//           setIsLoading(false);
//         })
//         .catch((err) => {
//           console.error(err);
//           setIsLoading(false);
//         });
//     }
//   }, [state, city]);

//   const handleBook = (center) => {
//     navigate("/book", { state: { center } });
//   };

//   return (
//     <div>
//       <h1>
//         {centers.length} medical centers available in {city.toLowerCase()}
//       </h1>

//       {!isLoading &&
//         centers.length > 0 &&
//         centers.map((center, index) => (
//           <div key={index} className="center-card">
//             <h3>{center["Hospital Name"]}</h3>
//             <p>
//               {center.Address}, {center.City}, {center.State} -{" "}
//               {center["ZIP Code"]}
//             </p>
//             <p>Rating: {center["Hospital overall rating"]}</p>
//             <button onClick={() => handleBook(center)}>
//               Book FREE Center Visit
//             </button>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default ResultsPage;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ResultsPage() {
  const [centers, setCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openBookingIndex, setOpenBookingIndex] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    if (state && city) {
      setIsLoading(true);
      axios
        .get(
          `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
        )
        .then((res) => {
          setCenters(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  }, [state, city]);

  const handleToggleBooking = (index) => {
    setOpenBookingIndex((prev) => (prev === index ? null : index));
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleBookAppointment = (center) => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }

    const booking = {
      hospitalName: center["Hospital Name"],
      address: center.Address,
      state: center.State,
      city: center.City,
      date: selectedDate,
      time: selectedTime,
    };

    const existingBookings =
      JSON.parse(localStorage.getItem("appointments")) || [];
    localStorage.setItem(
      "appointments",
      JSON.stringify([...existingBookings, booking])
    );

    alert("Appointment booked successfully!");
    setSelectedDate("");
    setSelectedTime("");
    setOpenBookingIndex(null);
  };

  return (
    <div>
      <h1>
        {centers.length} medical centers available in {city?.toLowerCase()}
      </h1>

      {!isLoading &&
        centers.length > 0 &&
        centers.map((center, index) => (
          <div key={index} className="center-card" data-testid={`center-${index}`}>
            <h3>{center["Hospital Name"]}</h3>
            <p>
              {center.Address}, {center.City}, {center.State} -{" "}
              {center["ZIP Code"]}
            </p>
            <p>Rating: {center["Hospital overall rating"]}</p>
            <button onClick={() => handleToggleBooking(index)}>
              {openBookingIndex === index ? "Close Booking" : "Book FREE Center Visit"}
            </button>

            {openBookingIndex === index && (
              <div className="booking-section" data-testid="booking-section">
                <label>
                  Date:
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </label>
                <label>
                  Time:
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  >
                    <option value="">Select time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </label>
                <button onClick={() => handleBookAppointment(center)}>
                  Confirm Booking
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default ResultsPage;
