import { useEffect, useState } from 'react';
import axios from 'axios';

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
    <section id="cocktailInfo">
      <h2>{drinkInfo.name}</h2>
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
      <img src={drinkInfo.image} alt={drinkInfo.name} />
    </section>
  );
}

export default Cocktail;
