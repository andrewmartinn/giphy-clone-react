import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#28282B] font-rubik text-white">
      <h1 className="text-4xl font-extrabold">404 Page Not Found</h1>
      <p className="mt-5 text-lg">
        Oops! The page you are looking for does not exist
      </p>
      <Link to="/" className="mt-10 bg-gray-500 px-10 py-2 text-white">
        Go Back Home
      </Link>
    </section>
  );
};
export default NotFound;
