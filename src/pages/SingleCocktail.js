import React from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

export default function SingleCocktail() {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    const getCocktail = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setCocktail(newCocktail);
          setLoading(false);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="title">No Cocktail To Display</h2>;
  }

  const {
    name,
    image,
    category,
    info,
    glass,
    ingredients,
    instructions,
  } = cocktail;
  return (
    <section>
      <Link to="/" className="btn-details">
        Back Home
      </Link>
      <div className="title">{name}</div>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name:</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info:</span>
            {info}
          </p>
          <p>
            <span className="drink-data">Glass:</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Instructions:</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">Ingredients:</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item},</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
