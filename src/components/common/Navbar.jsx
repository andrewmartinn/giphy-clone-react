import { useEffect, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa6";
import { useGif } from "../../hooks/useGif";
import GifSearch from "./GifSearch";

const Navbar = () => {
  const { gf, favourites } = useGif();
  const [categories, setCategories] = useState([]);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  // const fetchGifCategories = async () => {
  //   try {
  //     const { data, favourites } = await gf.categories();
  //     console.log("[categories_navbar]", data);
  //     setCategories(data);
  //   } catch (error) {
  //     console.error("categories", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchGifCategories();
  // }, []);

  return (
    <nav>
      <div className="container relative mx-auto mb-2 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="logo" className="w-6 lg:w-8" />
          <h1 className="cursor-pointer text-xl font-bold tracking-tight lg:text-3xl">
            GIPHY REACT
          </h1>
        </Link>
        <div className="hidden gap-3 lg:flex">
          {categories && (
            <>
              <Link
                to="/reactions"
                className="hover:gradient border-b-4 px-4 py-1 font-medium"
              >
                Reactions
              </Link>
              <Link
                to="/movies"
                className="hover:gradient border-b-4 px-4 py-1 font-medium"
              >
                Movies
              </Link>
              <Link
                to="/sports"
                className="hover:gradient border-b-4 px-4 py-1 font-medium"
              >
                Sports
              </Link>
              <Link
                to="/memes"
                className="hover:gradient border-b-4 px-4 py-1 font-medium"
              >
                Memes
              </Link>
            </>
          )}
          <div className="hidden gap-3 lg:flex">
            <button
              onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
              className={`${showCategoriesDropdown ? "gradient" : ""} hover:gradient hidden border-b-4 py-0.5 lg:block`}
            >
              <HiEllipsisVertical size={30} />
            </button>
            {favourites.length > 0 && (
              <Link
                to="/favourites"
                className="hidden h-9 rounded bg-gray-700 px-6 pt-1.5 lg:block"
              >
                Favourite GIFs
              </Link>
            )}
          </div>
        </div>
        <div className="flex gap-4 lg:hidden">
          {favourites.length > 0 && (
            <Link to="/favourites" className="rounded bg-gray-700 p-2">
              <FaRegHeart size={20} />
            </Link>
          )}
          <button
            onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
            className="rounded bg-gray-700 p-2 text-white"
          >
            <HiMenuAlt3 size={20} />
          </button>
        </div>
        {showCategoriesDropdown && (
          <div className="absolute right-0 top-14 z-20 w-full rounded bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
            <p className="pb-2 text-2xl font-medium">Categories</p>
            <div className="border-[1px] border-b" />
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
              {categories.map((category) => (
                <Link
                  to={`/${category.name_encoded}`}
                  key={category.name}
                  onClick={() =>
                    setShowCategoriesDropdown(!showCategoriesDropdown)
                  }
                  className="font-medium hover:opacity-80"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <GifSearch />
    </nav>
  );
};
export default Navbar;
