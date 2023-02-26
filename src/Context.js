import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

// children is a special prop and that represents whatever we have in the component
const allMealsURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavouritesFromLocalStorage = () => {

  let favourites = localStorage.getItem("favourites");

  if(favourites){
    favourites = JSON.parse(localStorage.getItem("favourites"))

  }
  else{
    favourites = []
  }
  return favourites
}

const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');

  const[showModal, setShowModal] = useState(false)

  const[selectedMeal, setSelectedMeal] = useState(null)

  const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage());


  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios(url);
      if (data.meals){
        setMeals(data.meals);
      }
      else{
        setMeals([]);
      }

    } catch (error) {
      console.log(error.response);
    }
    setLoading(false)

  };

  const fetchRandomMeal = () =>{
    fetchMeals(randomMealURL)
  }

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;

    if(favouriteMeal){
      meal = favourites.find((meal) => meal.idMeal === idMeal)
    }

    else{
      meal = meals.find((meal) => meal.idMeal === idMeal)
    }
    setSelectedMeal(meal)
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavourites = (idMeal) => {
    console.log(idMeal)
    const alreadyFavourites = favourites.find((meal) => meal.idMeal === idMeal)
    if(alreadyFavourites) return

    const meal = meals.find((meal) => meal.idMeal === idMeal)
    const updatedFavourites = [...favourites, meal]
    setFavourites(updatedFavourites)

    localStorage.setItem("favourites", JSON.stringify(updatedFavourites))

  }

  const removeFromFavourites = (idMeal) => {
    const updatedFavourites = favourites.filter((meal) => meal.idMeal !== idMeal);
    setFavourites(updatedFavourites)

    localStorage.setItem("favourites", JSON.stringify(updatedFavourites))
  }

  useEffect(() => {
    fetchMeals(allMealsURL)
  }, [])

  // Always Fetch Data from APIs using the useEffect hook, otherwise you will be in an infinite loop
  // Also have the dependency array '[]'
  useEffect(() => {
    if(!searchTerm) return
    fetchMeals(`${allMealsURL}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, closeModal,
       addToFavourites, removeFromFavourites, favourites}} >{children}</AppContext.Provider>
  );
};



export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
