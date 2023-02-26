import { useGlobalContext } from "../Context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meals = () => {
  const { meals, loading, selectMeal, addToFavourites } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (meals.length < 1){
    return <section className="section">
        <h4>No meals matched your search term. Please try again.</h4>
    </section>
  }
  return (
    <section className="section-center">
      {meals.map((singleMeal) => {
        {/* Destructing of meal object */}
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;

        return (
          <article key={idMeal} className="single-meal">
            {/* We set up the arrow function for the onClick because we want to invoke it only after the user clicks on the image. Otherwise it will be invoked immeadiately 
            which is what we don't want. You want to set it up as a return only once we click*/}
            <img src={image} className="img" onClick={() => selectMeal(idMeal)} />
            <footer>
              <h5>{title}</h5>
              <button className="like-btn" onClick={() => addToFavourites(idMeal)}>
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
