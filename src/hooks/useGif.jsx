import { useContext } from "react";
import { GifContext } from "../context/gifContext";

export const useGif = () => {
  const context = useContext(GifContext);
  if (!context) {
    throw new Error("useGif hook must be used within the GifProvider!");
  }
  return context;
};
