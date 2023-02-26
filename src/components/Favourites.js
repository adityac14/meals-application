import { useGlobalContext } from "../Context";

const Favourites = () => {
  const { favourites, selectMeal, removeFromFavourites } = useGlobalContext();
  return (
    <section className="favourites">
      <div className="favourites-content">
        <h5>Favourites</h5>
        <div className="favourites-container">
          {favourites.map((item) => {
            const { idMeal, strMealThumb: img } = item;

            return <div key={idMeal} className="favourite-item">
                <img src={img} className="favourites-img img" onClick={() => selectMeal(idMeal, true)}></img>
                <button className="remove-btn" onClick={() => removeFromFavourites(idMeal)}>
                    Remove
                </button>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
};

export default Favourites;
