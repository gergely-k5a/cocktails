import { Button, Form, InputGroup } from 'react-bootstrap';

const Actions = ({ handlers, searchStr }) => {
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handlers.searchCocktail();
    }
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
              onChange={handlers.onSearchStrChange}
              onKeyDown={onKeyDown}
              value={searchStr}
            />
            <Button variant="dark" onClick={handlers.searchCocktail}>
              Search
            </Button>
          </InputGroup>
        </Form.Group>
        <div className="form-separator my-2">- OR -</div>
        <Form.Group controlId="formLoadRandom">
          <Button variant="dark" onClick={handlers.loadRandom}>
            Just get me a random one
          </Button>
        </Form.Group>
      </Form>
    </section>
  );
};

export default Actions;
