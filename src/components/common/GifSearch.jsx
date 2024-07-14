import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSearchGifs = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      if (text.trim() === "") {
        return;
      }

      navigate(`/search/${text}`);
    }
  };

  return (
    <div className="relative mt-5 flex lg:mt-0">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleSearchGifs}
        placeholder="Search all the GIFs and Stickers"
        className="text-md w-full rounded-bl rounded-tl bg-white py-4 pl-4 pr-14 text-black outline-none lg:text-xl"
      />
      {text && (
        <div
          onClick={() => setText("")}
          className="absolute right-20 top-5 mr-2 rounded-full bg-gray-300 opacity-90"
        >
          <HiMiniXMark size={22} />
        </div>
      )}
      <button
        onClick={handleSearchGifs}
        className="rounded-br rounded-tr bg-gradient-to-tr from-pink-400 to-red-400 px-4 py-2 text-white"
      >
        <HiSearch size={35} className="-scale-x-100" />
      </button>
    </div>
  );
};
export default GifSearch;
