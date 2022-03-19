import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const Actions = ({ loadCocktail }) => {
  const [searchStr, setSearchStr] = useState('');

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      loadCocktail(searchStr);
    }
  };

  const onSearchStrChange = (e) => {
    setSearchStr(e.target.value);
  };

  return (
    <section id="actions">
      <Form>
        <Form.Group controlId="formSearchCocktail">
          <Form.Label>Search for a specific cocktail</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter cocktail name"
              onChange={onSearchStrChange}
              onKeyDown={onKeyDown}
              value={searchStr}
            />
            <Button
              variant="dark"
              onClick={() => {
                loadCocktail(searchStr);
              }}
            >
              Search
            </Button>
          </InputGroup>
        </Form.Group>
        <div className="form-separator my-2">- OR -</div>
        <Form.Group controlId="formLoadRandom">
          <Button variant="dark" onClick={() => loadCocktail()}>
            Just get me a random one
          </Button>
        </Form.Group>
      </Form>
    </section>
  );
};

export default Actions;
