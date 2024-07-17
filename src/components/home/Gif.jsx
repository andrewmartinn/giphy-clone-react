import { Link } from "react-router-dom";
import { LuBadgeCheck } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { FaLink } from "react-icons/fa6";

const Gif = ({
  gif,
  hover = false,
  share,
  setShareOverlay,
  embed,
  setEmbedOverlay,
}) => {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const shareGif = () => {
    const gifUrl = window.location.href;
    navigator.clipboard.writeText(gifUrl).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 3000);
    });
  };

  const embedGif = () => {
    const embedCode = `
      <iframe src="${gif.embed_url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      <p><a href="${gif.url}">via GIPHY</a></p>`;
    navigator.clipboard.writeText(embedCode).then(() => {
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
        <ShareOverlay
          setShareOverlay={setShareOverlay}
          handleShareGif={shareGif}
          isLinkCopied={isLinkCopied}
        />
      )}
      {embed && (
        <EmbedOverlay
          setEmbedOverlay={setEmbedOverlay}
          handleEmbedGif={embedGif}
          isLinkCopied={isLinkCopied}
        />
      )}
    </Link>
  );
};
export default Gif;

export const EmbedOverlay = ({
  setEmbedOverlay,
  isLinkCopied,
  handleEmbedGif,
}) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 p-4">
      <div className="flex items-center justify-between text-lg font-bold">
        Embed GIF
        <button onClick={() => setEmbedOverlay(false)}>
          <IoCloseSharp size={25} />
        </button>
      </div>
      <div className="my-2 border-b border-gray-400" />
      <div className="flex h-[80%] flex-col sm:py-20">
        <div className="text-md mb-10 w-full sm:w-[360px]">
          Want to embed this GIF on your website or blog? Just drop in the embed
          code below and you're done!
        </div>
        <button
          onClick={handleEmbedGif}
          className={` ${isLinkCopied ? "bg-[#00FF99] text-zinc-800" : "bg-purple-600 text-white"} p-2 text-center`}
        >
          {!isLinkCopied ? "Copy Code" : "Link Copied!"}
        </button>
      </div>
    </div>
  );
};

export const ShareOverlay = ({
  setShareOverlay,
  handleShareGif,
  isLinkCopied,
}) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 p-4">
      <div className="flex items-center justify-between text-lg font-bold">
        Share GIF
        <button onClick={() => setShareOverlay(false)}>
          <IoCloseSharp size={25} />
        </button>
      </div>
      <div className="my-2 border-b border-gray-400" />
      <div className="flex h-[80%] items-center justify-center">
        <button
          onClick={handleShareGif}
          className={` ${isLinkCopied ? "bg-[#00FF99] text-zinc-800" : "bg-purple-600 text-white"} flex w-full items-center justify-center gap-2 py-2`}
        >
          {!isLinkCopied && <FaLink size={20} />}
          {isLinkCopied ? "Link Copied!" : "Copy GIF Link"}
        </button>
      </div>
    </div>
  );
};
