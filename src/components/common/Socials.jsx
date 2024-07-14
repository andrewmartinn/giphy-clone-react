import {
  FaSquareXTwitter,
  FaSquareFacebook,
  FaSquareInstagram,
} from "react-icons/fa6";
import { IoLogoTumblr } from "react-icons/io";

const Socials = () => {
  return (
    <div className="pt-3">
      <span className="font-medium">Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="">
          <FaSquareFacebook size={20} fill="#ccc" />
        </a>
        <a href="">
          <FaSquareXTwitter size={20} fill="#ccc" />
        </a>
        <a href="">
          <FaSquareInstagram size={20} fill="#ccc" />
        </a>
        <a href="">
          <IoLogoTumblr size={20} fill="#ccc" />
        </a>
      </div>
    </div>
  );
};
export default Socials;
