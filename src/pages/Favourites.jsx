import { useEffect, useState } from "react";
import { useGif } from "../hooks/useGif";
import Gif from "../components/home/Gif";
import { motion } from "framer-motion";

const Favourites = () => {
  const { gf, favourites } = useGif();
  const [favouriteGIFs, setFavouriteGIFs] = useState([]);

  useEffect(() => {
    const fetchFavoriteGIFs = async () => {
      try {
        const { data: gifs } = await gf.gifs(favourites);
        console.log("favourites", gifs);
        setFavouriteGIFs(gifs);
      } catch (error) {
        console.error("favourites", error);
      }
    };

    fetchFavoriteGIFs();
  }, [gf, favourites]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="my-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <span className="faded-text">My Favourites</span>
      <motion.div
        className="mt-2 columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5"
        variants={containerVariants}
      >
        {favouriteGIFs.map((gif) => (
          <motion.div key={gif.id} variants={itemVariants}>
            <Gif gif={gif} hover={true} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Favourites;
