import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { center } = location.state;
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");

  const timeSlots = ["Morning", "Afternoon", "Evening"];

  const handleConfirmBooking = () => {
    const newBooking = {
      hospital: center["Hospital Name"],
      address: `${center.Address}, ${center.City}, ${center.State} - ${center["ZIP Code"]}`,
      date,
      slot,
    };
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existing));
    navigate("/my-bookings");
  };

  const today = new Date();
  const availableDates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{center["Hospital Name"]}</h2>

      <label htmlFor="date">Select Date:</label>
      <select id="date" onChange={(e) => setDate(e.target.value)} value={date}>
        <option value="">Select Date</option>
        {availableDates.map((d, index) => (
          <option key={index} value={d}>
            {d}
          </option>
        ))}
      </select>

      <div>
        <p>Select Time Slot:</p>
        <p>Today</p>
        <div style={{ display: "flex", gap: "1rem" }}>
          {timeSlots.map((t) => (
            <p
              key={t}
              data-testid={`slot-${t.toLowerCase()}`}
              onClick={() => setSlot(t)}
              style={{
                cursor: "pointer",
                fontWeight: slot === t ? "bold" : "normal",
                border: slot === t ? "2px solid #000" : "1px solid #ccc",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
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
