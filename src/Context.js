import React, { useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

// children is a special prop and that represents whatever we have in the component
const allMealsURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=a";
const randomMealURL = "https://www.themealdb.com/api/json/v1/1/random.php";

const AppProvider = ({ children }) => {
  const fetchMeals = async (url) => {
    try {
      const response = await axios(url);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeals(allMealsURL);
  }, []);

  return (
    <AppContext.Provider value={{ name: "john", role: "student" }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
