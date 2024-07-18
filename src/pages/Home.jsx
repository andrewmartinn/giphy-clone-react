import { useEffect } from "react";
import { useGif } from "../hooks/useGif";
import Gif from "../components/home/Gif";
import GifFilter from "../components/home/GifFilter";

const Home = () => {
  const { gf, gifs, setGifs, filter } = useGif();

  const fetchTrendingGifs = async () => {
    try {
      const { data } = await gf.trending({
        limit: 20,
        type: filter,
        rating: "g",
      });
      console.log("[trending_gifs_home]", data);
      setGifs(data);
    } catch (error) {
      console.error("trending", error);
    }
  };

  useEffect(() => {
    fetchTrendingGifs();
  }, [filter]);

  return (
    <section className="min-h-screen overflow-hidden">
      <GifFilter showTrending={true} />
      {gifs && (
        <div className="columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5">
          {gifs.map((gif) => (
            <Gif key={gif.id} gif={gif} hover={true} />
          ))}
        </div>
      )}
    </section>
  );
};
export default Home;
