import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Pages/signup";
import Login from "../Pages/login";
// import PrivateRoute from "../Components/PrivateRoute";
import AddCarDetails from "../Pages/AddCar/addCar";
import CarsGrid from "../Pages/inventory";
import CarTable from "../Pages/oem";
import PrivateRoute from "../Components/PrivateRoute";

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addCar" element={<PrivateRoute><AddCarDetails /></PrivateRoute>} />
      <Route path="/showCars" element={<PrivateRoute><CarsGrid /></PrivateRoute>} />
      <Route path="/oem" element={<PrivateRoute>< CarTable/></PrivateRoute>} />
    </Routes>
  );
}
