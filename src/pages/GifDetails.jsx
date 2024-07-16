import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGif } from "../hooks/useGif";
import Gif from "../components/home/Gif";
import { LuBadgeCheck } from "react-icons/lu";
import {
  HiMiniChevronDown,
  HiMiniChevronUp,
  HiMiniHeart,
} from "react-icons/hi2";
import Socials from "../components/common/Socials";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoPaperPlane } from "react-icons/io5";
import { ImEmbed } from "react-icons/im";

const contentType = ["gifs", "stickers", "texts"];

const GifDetails = () => {
  const { type, slug } = useParams();

  const { gf, favourites, addToFavourites } = useGif();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [gifDesc, setGifDesc] = useState(false);

  const gifId = slug.split("-");

  const fetchGifDetails = async () => {
    try {
      const { data } = await gf.gif(gifId[gifId.length - 1]);
      console.log("gif_page", data);
      setGif(data);
    } catch (error) {
      console.error("gif", error);
    }
  };

  const fetchRelatedGifs = async () => {
    try {
      const { data } = await gf.related(gifId[gifId.length - 1]);
      console.log("gif_page_related", data);
      setRelatedGifs(data);
    } catch (error) {
      console.error("gif_page_related", error);
    }
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid content type");
    }

    fetchGifDetails();
    fetchRelatedGifs();
  }, []);

  const handleShareGif = () => {};
  const handleEmbedGif = () => {};

  return (
    <section className="my-10 grid grid-cols-4 gap-4">
      {/* Sidebar */}
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="flex items-center gap-1 text-[12px] font-bold text-gray-400">
                  @{gif?.user?.username}
                  {gif?.user?.is_verified && (
                    <LuBadgeCheck size={18} fill="skyblue" color="#444" />
                  )}
                </div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="whitespace-pre-line py-4 text-sm text-gray-400">
                {gifDesc
                  ? gif?.user?.description
                  : gif.user?.description.slice(0, 100) + "..."}
                {gif?.user?.description.length > 100 && (
                  <div
                    onClick={() => setGifDesc(!gifDesc)}
                    className="faded-text flex cursor-pointer items-center"
                  >
                    {gifDesc ? (
                      <>
                        Read Less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Read More <HiMiniChevronDown size={20} />
                      </>
                    )}
                  </div>
                )}
              </p>
            )}
          </>
        )}
        <Socials />
        <div className="divider" />
        {gif?.source && (
          <>
            <span className="text-md font-medium text-gray-400">Source</span>
            <div className="flex items-center gap-1 text-sm font-medium">
              <HiOutlineExternalLink size={20} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </>
        )}
      </div>

      {/* Main Gif Content */}
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          {/* GIF */}
          <div className="w-full sm:w-3/4">
            <div className="faded-text mb-2 truncate">{gif.title}</div>
            <Gif gif={gif} hover={true} />
            <div className="flex gap-1 py-4 sm:hidden">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="flex items-center gap-1 text-[12px] font-bold text-gray-400">
                  @{gif?.user?.username}
                  {gif?.user?.is_verified && (
                    <LuBadgeCheck size={18} fill="skyblue" color="#444" />
                  )}
                </div>
              </div>
              <button
                // onClick={handleShareGif}
                className="ml-auto"
              >
                <IoPaperPlane size={25} className="text-gray-400" />
              </button>
            </div>
          </div>
          {/* Favourites/Share/Embed */}
          <div className="mt-6 hidden flex-col gap-5 sm:flex">
            <button
              // onClick={() => addToFavourites(gif.id)}
              className="flex items-center gap-4 text-lg font-medium"
            >
              <HiMiniHeart
                size={25}
                className={`${favourites.includes(gif.id) ? "text-red-500" : ""}`}
              />
              Favourite
            </button>
            <button
              // onClick={handleShareGif}
              className="flex items-center gap-4 text-lg font-medium"
            >
              <IoPaperPlane size={25} />
              Share
            </button>
            <button
              // onClick={handleEmbedGif}
              className="flex items-center gap-4 text-lg font-medium"
            >
              <ImEmbed size={25} />
              Embed
            </button>
          </div>
        </div>
        {/* Related Gifs */}
        {relatedGifs && (
          <div>
            <span className="text-xl font-extrabold text-zinc-500">
              Related GIFs
            </span>
            <div className="columns-2 gap-2 md:columns-3">
              {relatedGifs.slice(1).map((gif) => (
                <Gif key={gif.id} gif={gif} hover={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default GifDetails;
