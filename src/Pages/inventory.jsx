import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 15px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const DetailItem = styled.p`
  margin: 5px 0;
  color: #555;

  span {
    font-weight: bold;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1.2rem;
  text-align: center;
`;

const Loader = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: #555;
`;

const DivEle = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

// Component
const CarsGrid = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(
          "https://attryb-back.onrender.com/api/inventory",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace with your API endpoint
        // console.log(response);
        setCars(response.data.data.inventory);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch car data. Please try again.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDelete= async (id)=>{
    try {
        const token = sessionStorage.getItem("authToken");
         await axios.delete(
          `https://attryb-back.onrender.com/api/inventory/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
        // console.log(response);
        setLoading(false);
      } catch (err) {
        setError("Failed delete the data. Please try again.");
        setLoading(false);
      }
  };

  if (loading) return <Loader>Loading cars...</Loader>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  console.log("Hi");
  return (
    <Container>
      <h1>Car Inventory</h1>
      <Grid>
        {cars.map((car) => (
          <Card key={car._id}>
            <Image src={car.carImage} alt={car.title} />
            <Details>
              <Title>{car.title}</Title>
              <DetailItem>
                <span>Kms Driven:</span> {car.kmsDriven}
              </DetailItem>
              <DetailItem>
                <span>Major Scratches:</span>{" "}
                {car.majorScratches ? "Yes" : "No"}
              </DetailItem>
              <DetailItem>
                <span>Original Paint:</span> {car.originalPaint ? "Yes" : "No"}
              </DetailItem>
              <DetailItem>
                <span>Accidents Reported:</span> {car.accidentsReported}
              </DetailItem>
              <DetailItem>
                <span>Previous Buyers:</span> {car.previousBuyers}
              </DetailItem>
              <DetailItem>
                <span>Registration Place:</span> {car.registrationPlace}
              </DetailItem>
              <DivEle>
                <button>Edit</button>
                <button onClick={()=>handleDelete(car._id)}>Delete</button>
              </DivEle>
            </Details>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default CarsGrid;
