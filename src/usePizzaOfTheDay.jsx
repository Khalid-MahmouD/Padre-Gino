import { useState, useEffect, useDebugValue } from "react";

export const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.id}` : "Loading...");
  useEffect(() => {
    async function fetPizzaOfTheDay() {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}/api/pizza-of-the-day`);
      const data = await res.json();
      setPizzaOfTheDay(data);
    }
    fetPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};
