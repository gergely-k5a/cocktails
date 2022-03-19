import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Actions from './Actions';
import Loader from './Loader';

function Cocktail() {
  const [drinkInfo, setDrinkInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const loadCocktail = (searchStr) => {
    let url = '/api/cocktail';

    if (searchStr) url += `?searchStr=${searchStr}`;

    return axios(url)
      .then((res) => {
        setDrinkInfo(res.data);
      })
      .catch((err) => {
        // TODO: add error handling
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    loadCocktail().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <Container className="mt-5">
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={6}>
            <h1 className="mb-4">{drinkInfo.name}</h1>
            <Ingredients
              ingredients={drinkInfo.ingredients}
              measures={drinkInfo.measures}
            />
            <Instructions text={drinkInfo.instructions} />
            <Actions loadCocktail={loadCocktail} />
          </Col>
          <Col md={6}>
            <Image src={drinkInfo.image} alt={drinkInfo.name} fluid />
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cocktail;
