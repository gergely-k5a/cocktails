import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

function Cocktail() {
  const [drinkInfo, setDrinkInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const loadRandom = () => {
    return axios('/api/cocktail')
      .then((res) => {
        setDrinkInfo(res.data);
      })
      .catch((err) => {
        // TODO: add error handling
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    loadRandom().then(() => {
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h1 className="mb-4">{drinkInfo.name}</h1>
          <Ingredients
            ingredients={drinkInfo.ingredients}
            measures={drinkInfo.measures}
          />
          <Instructions text={drinkInfo.instructions} />
          <section id="actions">
            <Button variant="dark" onClick={loadRandom}>
              Get me an other one
            </Button>
          </section>
        </Col>
        <Col md={6}>
          <Image src={drinkInfo.image} alt={drinkInfo.name} fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default Cocktail;
