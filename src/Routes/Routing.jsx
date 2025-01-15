import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/signup";
import Login from "../Pages/login";
// import PrivateRoute from "../Components/PrivateRoute";
import AddCarDetails from "../Pages/AddCar/addCar";
import CarsGrid from "../Pages/inventory";
import CarTable from "../Pages/oem";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addCar" element={<AddCarDetails />} />
      <Route path="/showCars" element={<CarsGrid />} />
      <Route path="/oem" element={< CarTable/>} />
    </Routes>
  );
}
