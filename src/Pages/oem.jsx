import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #f4f4f4;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f1f1f1;
  }
`;

const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const CarTable = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch car data from the API
    const token = sessionStorage.getItem("authToken");
    axios
      .get("https://attryb-back.onrender.com/api/oem",{
       
        headers:{
            Authorization:`Bearer ${token}`
        }
      }) // Adjust the API endpoint accordingly
      .then((response) => {
        console.log(response)
        setCars(response.data.data.oemSpecs); // Assuming the API response contains an 'inventory' field
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, []);

  return (
    <Container>
      <Title>Car Inventory</Title>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Model</TableHeader>
            <TableHeader>Year</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Mileage</TableHeader>
            <TableHeader>BHP</TableHeader>
            <TableHeader>Max Speed</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {cars.length === 0 ? (
            <TableRow>
              <TableData colSpan="8">No car listings available</TableData>
            </TableRow>
          ) : (
            cars.map((car,index) => (
              <TableRow key={car._id}>
                <TableData>{index+1}</TableData>
                <TableData>{car.model}</TableData>
                <TableData>{car.year}</TableData>
                <TableData>{car.listPrice}</TableData>
                <TableData>{car.mileage}</TableData>
                <TableData>{car.powerBHP}</TableData>
                <TableData>{car.maxSpeed}</TableData>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default CarTable;
