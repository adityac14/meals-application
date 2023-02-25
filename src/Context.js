import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

// children is a special prop and that represents whatever we have in the component
const allMealsURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const[searchTerm, setSearchTerm] = useState('');


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
    <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal }}>{children}</AppContext.Provider>
  );
};



export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
