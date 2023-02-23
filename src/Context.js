import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

// children is a special prop and that represents whatever we have in the component
const allMealsURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=a";
const randomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async (url) => {
    try {
      const { data } = await axios(url);
      setMeals(data.meals)
    } catch (error) {
      console.log(error.response);
    }
  };

  // Always Fetch Data from APIs using the useEffect hook, otherwise you will be in an infinite loop
  // Also have the dependency array '[]'
  useEffect(() => {
    fetchMeals(allMealsURL);
  }, []);

  return (
    <AppContext.Provider value={{meals}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
