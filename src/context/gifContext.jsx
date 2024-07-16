import { createContext, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

export const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favourites, setFavourites] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_APP_GIPHY_API_KEY);

  const addToFavourites = (id) => {
    if (favourites.includes(id)) {
      const updatedFavourites = favourites.filter((itemId) => itemId !== id);
      localStorage.setItem("FavouriteGIFs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    } else {
      const updatedFavourites = [...favourites];
      updatedFavourites.push(id);
      localStorage.setItem("FavouriteGIFs", JSON.stringify(updatedFavourites));
      setFavourites(updatedFavourites);
    }
  };

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("FavouriteGIFs")) || [];
    setFavourites(favourites);
  }, []);

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favourites,
        addToFavourites,
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export default GifProvider;
