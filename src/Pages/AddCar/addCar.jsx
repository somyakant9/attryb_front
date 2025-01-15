import React, { useState } from "react";
import stylesCar from "./addCar.module.css";
import axios from "axios";

function AddCarDetails() {
  // State to store form data
  const [carDetails, setCarDetails] = useState({
    carImage: "",
    title: "",
    kmsDriven: "",
    majorScratches: false,
    originalPaint: true,
    accidentsReported: 0,
    previousBuyers: 0,
    registrationPlace: "",
  });

  // Handle change for title and image
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image") {
      setCarDetails((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else if (type === "checkbox") {
      setCarDetails((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setCarDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("authToken");
    try {
      console.log(carDetails);
      const response = await axios.post(
        "https://attryb-back.onrender.com/api/inventory",
        {
          ...carDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.status === 201) {
        alert("Car added successfully!");
        // Reset form after submission
        setCarDetails({
          carImage: "",
          title: "",
          kmsDriven: "",
          majorScratches: false,
          originalPaint: true,
          accidentsReported: 0,
          previousBuyers: 0,
          registrationPlace: "",
        });
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Error adding car. Please try again.");
    }
  };

  return (
    <div className={stylesCar.formContainer}>
      <h2>Add Second-Hand Car Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Car Image URL:</label>
          <input
            type="file"
            name="carImage"
            value={carDetails.carImage}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={carDetails.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>KMs Driven:</label>
          <input
            type="number"
            name="kmsDriven"
            value={carDetails.kmsDriven}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Major Scratches:</label>
          <input
            type="checkbox"
            name="majorScratches"
            checked={carDetails.majorScratches}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Original Paint:</label>
          <input
            type="checkbox"
            name="originalPaint"
            checked={carDetails.originalPaint}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Accidents Reported:</label>
          <input
            type="number"
            name="accidentsReported"
            value={carDetails.accidentsReported}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Previous Buyers:</label>
          <input
            type="number"
            name="previousBuyers"
            value={carDetails.previousBuyers}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Registration Place:</label>
          <input
            type="text"
            name="registrationPlace"
            value={carDetails.registrationPlace}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddCarDetails;
