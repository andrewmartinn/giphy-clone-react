import { useEffect, useState } from "react";
import { useGif } from "../hooks/useGif";
import Gif from "../components/home/Gif";

const Favourites = () => {
  const { gf, favourites } = useGif();
  const [favouriteGIFs, setFavouriteGIFs] = useState([]);

  const fetchFavoriteGIFs = async () => {
    try {
      const { data: gifs } = await gf.gifs(favourites);
      console.log("favourites", gifs);
      setFavouriteGIFs(gifs);
    } catch (error) {
      console.error("favourites", error);
    }
  };

  useEffect(() => {
    fetchFavoriteGIFs();
  }, []);

  return (
    <section className="my-6">
      <span className="faded-text">My Favourites</span>
      <div className="mt-2 columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5">
        {favouriteGIFs.map((gif) => (
          <Gif key={gif.id} gif={gif} hover={true} />
        ))}
      </div>
    </section>
  );
};
export default Favourites;
