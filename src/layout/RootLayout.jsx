import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const RootLayout = () => {
  return (
    <div className="font-rubik min-h-screen bg-[#28282B] text-white">
      <div className="container mx-auto px-6 py-4">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default RootLayout;
