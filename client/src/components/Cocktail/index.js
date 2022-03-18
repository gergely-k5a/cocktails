import { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Actions from './Actions';

function Cocktail() {
  const [drinkInfo, setDrinkInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchStr, setSearchStr] = useState('');

  const onSearchStrChange = (e) => {
    setSearchStr(e.target.value);
  };

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

  const searchCocktail = () => {
    axios(`/api/cocktail?searchStr=${searchStr}`)
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
          <Actions
            handlers={{ loadRandom, onSearchStrChange, searchCocktail }}
            searchStr={searchStr}
          />
        </Col>
        <Col md={6}>
          <Image src={drinkInfo.image} alt={drinkInfo.name} fluid />
        </Col>
      </Row>
    </Container>
  );
}

export default Cocktail;
