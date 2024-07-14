import { useParams } from "react-router-dom";
import { useGif } from "../hooks/useGif";
import { useEffect, useState } from "react";
import GifFilter from "../components/home/GifFilter";
import Gif from "../components/home/Gif";

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
  }, [filter]);

  return (
    <div className="my-4">
      <div className="pb-33">
        <span className="pr-4 text-5xl font-extrabold">{query}</span>
        <span className="text-sm font-medium text-gray-400">
          {searchResults.length}{" "}
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </span>
      </div>
      <GifFilter alignLeft={true} />
      {searchResults.length > 0 ? (
        <div className="columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5">
          {searchResults.map((gif) => (
            <Gif key={gif.id} gif={gif} />
          ))}
        </div>
      ) : (
        <div className="my-[4rem]">
          <span className="text-xl font-medium">
            No GIFs found for {query}. Try searching for Stickers instead?
          </span>
        </div>
      )}
    </div>
  );
};
export default Search;
