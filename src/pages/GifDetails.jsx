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
import { IoIosShareAlt } from "react-icons/io";
import { motion } from "framer-motion";

const contentType = ["gifs", "stickers", "texts"];

const GifDetails = () => {
  const { type, slug } = useParams();

  const { gf, favourites, addToFavourites } = useGif();
  const [gif, setGif] = useState({});
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [gifDesc, setGifDesc] = useState(false);
  const [shareOverlay, setShareOverlay] = useState(false);
  const [embedOverlay, setEmbedOverlay] = useState(false);

  const gifSlug = slug.split("-");
  const gifId = gifSlug[gifSlug.length - 1];

  const fetchGifDetails = async () => {
    try {
      const { data } = await gf.gif(gifId);
      console.log("gif_page", data);
      setGif(data);
    } catch (error) {
      console.error("gif", error);
    }
  };

  const fetchRelatedGifs = async () => {
    try {
      const { data } = await gf.related(gifId);
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

    setShareOverlay(false);
    setEmbedOverlay(false);
  }, [type, gifId]);

  const handleShareOverlay = () => {
    setShareOverlay(true);
    setEmbedOverlay(false);
  };

  const handleEmbedOverlay = () => {
    setShareOverlay(false);
    setEmbedOverlay(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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
              <div className="whitespace-pre-line py-4 text-sm text-gray-400">
                {gifDesc
                  ? gif?.user?.description
                  : gif.user?.description.slice(0, 100)}
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
              </div>
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
      <motion.div
        className="col-span-4 sm:col-span-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-6">
          {/* GIF */}
          <div className="w-full sm:w-3/4">
            <div className="faded-text mb-2 truncate">{gif.title}</div>
            <div className="relative">
              <Gif
                gif={gif}
                hover={true}
                share={shareOverlay}
                setShareOverlay={setShareOverlay}
                embed={embedOverlay}
                setEmbedOverlay={setEmbedOverlay}
              />
            </div>
            {gif?.user ? (
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
                  onClick={() => setShareOverlay(!shareOverlay)}
                  className="ml-auto"
                >
                  <IoIosShareAlt size={25} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setShareOverlay(!shareOverlay)}
                className="flex w-full cursor-pointer items-center justify-end gap-2 font-medium sm:hidden"
              >
                Share GIF
                <IoIosShareAlt size={25} />
              </div>
            )}
          </div>
          {/* Favourites/Share/Embed */}
          <div className="mt-6 hidden flex-col gap-5 sm:flex">
            <button
              onClick={() => addToFavourites(gif.id)}
              className="flex items-center gap-4 text-lg font-medium"
            >
              <HiMiniHeart
                size={25}
                className={`${favourites.includes(gif.id) ? "text-red-500" : ""}`}
              />
              Favourite
            </button>
            <button
              onClick={handleShareOverlay}
              className="flex items-center gap-4 text-lg font-medium"
            >
              <IoPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={handleEmbedOverlay}
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
            <span className="text-xl font-extrabold capitalize text-zinc-500">
              Related {type}
            </span>
            <motion.div
              className="columns-2 gap-2 md:columns-3"
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              variants={containerVariants}
            >
              {relatedGifs.slice(1).map((gif) => (
                <Gif key={gif.id} gif={gif} hover={true} />
              ))}
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
};
export default GifDetails;
