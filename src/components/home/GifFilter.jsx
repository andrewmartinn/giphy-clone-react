import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { useGif } from "../../hooks/useGif";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500",
  },
];

const GifFilter = ({ alignLeft = false, showTrending = true }) => {
  const { filter, setFilter } = useGif();
  return (
    <div
      className={`my-3 flex gap-3 ${alignLeft && "justify-end"} ${showTrending && "flex-col justify-between sm:flex-row sm:items-center"}`}
    >
      {showTrending && (
        <div className="flex items-center gap-2">
          <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          <p className="font-bold text-gray-200">Trending</p>
        </div>
      )}
      <div className="flex min-w-80 rounded-full bg-[#2E2E2E]">
        {filters.map((f) => (
          <span
            onClick={() => setFilter(f.value)}
            key={f.title}
            className={`filter-item w-1/3 cursor-pointer rounded-full py-2 text-center font-medium transition-all duration-500 ease-in-out ${filter === f.value ? f.background : ""}`}
          >
            {f.title}
          </span>
        ))}
      </div>
    </div>
  );
};
export default GifFilter;
