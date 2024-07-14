import { useParams } from "react-router-dom";
import { useGif } from "../hooks/useGif";
import { useEffect, useState } from "react";
import Gif from "../components/home/Gif";
import Socials from "../components/common/Socials";
import { LuBadgeCheck } from "react-icons/lu";

const Category = () => {
  const { gf } = useGif();
  const { category } = useParams();
  const [results, setResults] = useState([]);

  const fetchGifsByCategory = async () => {
    try {
      const { data } = await gf.gifs(category, category);
      console.log("categories_gif", data);
      setResults(data);
    } catch (error) {
      console.error("categories", error);
    }
  };

  useEffect(() => {
    fetchGifsByCategory();
  }, [category]);

  return (
    <section className="my-6">
      <div className="flex flex-col gap-5 sm:flex-row">
        {/* Sidebar */}
        <div className="w-full sm:w-72">
          {results?.length > 0 && <Gif gif={results[0]} hover={false} />}
          <span className="pt-2 text-sm text-gray-400">
            Don&apos;t tell it to me, GIF it to me!
          </span>
          <Socials />
          <div className="divider" />
        </div>
        {/* Results */}
        <div className="">
          <h2 className="text-3xl font-extrabold capitalize">
            {category.split("-").join(" & ")} GIFs
          </h2>
          <div className="flex items-center gap-3">
            <p className="flex cursor-pointer items-center gap-1 pb-3 text-lg font-bold text-gray-400 hover:text-gray-50">
              @{category}
              <LuBadgeCheck
                size={15}
                fill="skyblue"
                color="#444"
                className="mt-[2px]"
              />
            </p>
          </div>
          {results && (
            <div className="columns-2 gap-2 md:columns-3 lg:columns-4 xl:columns-5">
              {results.slice(1).map((gif) => (
                <Gif key={gif.id} gif={gif} hover={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default Category;
