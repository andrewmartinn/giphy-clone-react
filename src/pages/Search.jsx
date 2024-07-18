import { useParams } from "react-router-dom";
import { useGif } from "../hooks/useGif";
import { useEffect, useState } from "react";
import GifFilter from "../components/home/GifFilter";
import Gif from "../components/home/Gif";
import { motion } from "framer-motion";

const Search = () => {
  const { query } = useParams();
  const { gf, filter } = useGif();
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async () => {
    try {
      const { data } = await gf.search(query, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 20,
      });
      console.log("search_gifs", data);
      setSearchResults(data);
    } catch (error) {
      console.error("search", error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query, filter]);

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
      className="my-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="pb-33">
        <span className="pr-4 text-5xl font-extrabold">{query}</span>
        <span className="text-sm font-medium capitalize text-gray-400">
          {searchResults.length} {filter}
        </span>
      </div>
      <GifFilter alignLeft={true} />
      {searchResults.length > 0 ? (
        <motion.div
          className="columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5"
          variants={containerVariants}
        >
          {searchResults.map((gif) => (
            <motion.div key={gif.id} variants={itemVariants}>
              <Gif key={gif.id} gif={gif} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="my-[4rem]">
          <span className="text-xl font-medium">
            No GIFs found for {query}. Try searching for Stickers instead?
          </span>
        </div>
      )}
    </motion.section>
  );
};
export default Search;
