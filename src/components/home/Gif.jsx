import { Link } from "react-router-dom";
import { LuBadgeCheck } from "react-icons/lu";

const Gif = ({ gif, hover = false }) => {
  return (
    <Link to={`/${gif?.type}s/${gif?.slug}`}>
      <div className="group relative mb-2 aspect-video w-full cursor-pointer">
        <img
          src={gif?.images?.fixed_width.webp}
          alt={gif?.title}
          className="w-full rounded object-cover transition-all duration-300"
        />
        {hover && (
          <div className="absolute inset-0 flex items-end gap-2 rounded bg-gradient-to-b from-transparent via-transparent to-black p-2 font-medium opacity-0 group-hover:opacity-100">
            <img
              src={gif?.user?.avatar_url}
              alt={gif?.user?.display_name}
              className="h-8"
            />
            <span className="flex items-center gap-1">
              {gif?.user?.display_name}
              {gif?.user?.is_verified && (
                <LuBadgeCheck size={18} fill="white" color="#444" />
              )}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
export default Gif;
