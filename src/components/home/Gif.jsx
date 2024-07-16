import { Link } from "react-router-dom";
import { LuBadgeCheck } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { FaLink } from "react-icons/fa6";

const Gif = ({ gif, hover = false, share, setShareOverlay }) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleShareGif = () => {
    const gifUrl = window.location.href;
    navigator.clipboard.writeText(gifUrl).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 3000);
    });
  };

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
      {share && (
        <div className="absolute inset-0 bg-black bg-opacity-75 p-4">
          <div className="flex items-center justify-between">
            Share GIF
            <button onClick={() => setShareOverlay(!share)}>
              <IoCloseSharp size={25} />
            </button>
          </div>

          <div className="divider" />
          <div className="flex h-[80%] flex-col items-center justify-center gap-5">
            <button
              onClick={handleShareGif}
              className={`flex items-center gap-2 rounded-md font-medium ${isLinkCopied ? "bg-[#00FF99] text-zinc-800" : "bg-purple-500 text-white"} px-10 py-2`}
            >
              {!isLinkCopied && <FaLink size={20} />}
              {isLinkCopied ? "Link Copied!" : "Copy GIF Link"}
            </button>
          </div>
        </div>
      )}
    </Link>
  );
};
export default Gif;
