const Ingredients = ({ ingredients = [], measures = [] }) => (
  <section id="ingredients">
    <h3>Ingredients</h3>
    <ul>
      {ingredients.map((ingredient, i) => (
        <li key={i}>
          {ingredient} - {measures[i]}
        </li>
      ))}
    </ul>
  </section>
);

export default Ingredients;
