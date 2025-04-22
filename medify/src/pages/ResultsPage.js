import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResultsPage() {
  const [centers, setCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    if (state && city) {
      setIsLoading(true);
      axios
        .get(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`)
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

  const handleBook = (center) => {
    navigate("/book", { state: { center } });
  };

  return (
    <div>
      <h1>
        {centers.length} medical centers available in {city?.toLowerCase()}
      </h1>

      {!isLoading && centers.map((center, index) => (
        <div key={index} className="center-card">
          <h3>{center["Hospital Name"]}</h3>
          <p>
            {center.Address}, {center.City}, {center.State} - {center["ZIP Code"]}
          </p>
          <p>Rating: {center["Hospital overall rating"]}</p>
          <button onClick={() => handleBook(center)}>
            Book FREE Center Visit
          </button>
        </div>
      ))}
    </div>
  );
}

export default ResultsPage;