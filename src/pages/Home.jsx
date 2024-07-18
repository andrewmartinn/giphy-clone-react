import { useEffect } from "react";
import { useGif } from "../hooks/useGif";
import Gif from "../components/home/Gif";
import GifFilter from "../components/home/GifFilter";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="min-h-screen overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <GifFilter showTrending={true} />
      {gifs && (
        <motion.div
          className="columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5"
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={containerVariants}
        >
          {gifs.map((gif) => (
            <motion.div key={gif.id} variants={itemVariants}>
              <Gif key={gif.id} gif={gif} hover={true} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};
export default Home;
