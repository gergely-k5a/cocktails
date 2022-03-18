import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';

function Cocktail() {
  const [drinkInfo, setDrinkInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios('/api/cocktail')
      .then((res) => {
        setDrinkInfo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // TODO: add error handling
        console.log(err.response.data);
      });
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h1 className="mb-4">{drinkInfo.name}</h1>
          <h3>Ingredients</h3>
          <ul>
            {drinkInfo.ingredients.map((ingredient, i) => (
              <li key={i}>
                {ingredient} - {drinkInfo.measures[i]}
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{drinkInfo.instructions}</p>
        </Col>
        <Col md={6}>
          <Image src={drinkInfo.image} alt={drinkInfo.name} fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default Cocktail;
