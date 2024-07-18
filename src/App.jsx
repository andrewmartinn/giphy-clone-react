import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";

import GifProvider from "./context/gifContext";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/common/LoadingSpinner";
import NotFound from "./components/common/NotFound";

const Home = lazy(() => import("./pages/Home"));
const Category = lazy(() => import("./pages/Category"));
const Search = lazy(() => import("./pages/Search"));
const Favourites = lazy(() => import("./pages/Favourites"));
const GifDetails = lazy(() => import("./pages/GifDetails"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/:category",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Category />
          </Suspense>
        ),
      },
      {
        path: "/search/:query",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/:type/:slug",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <GifDetails />
          </Suspense>
        ),
      },
      {
        path: "/favourites",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Favourites />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
};
export default App;
