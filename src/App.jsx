import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact";
import Error from "./ui/Error";
import Cart from "./components/Cart";
import RestaurantMenu from "./components/RestaurantMenu";
import CreateOrder from "./components/CreateOrder";
import OrderSuccess from "./components/OrderSuccess";
import PaymentPage from "./components/PaymentPage";
import AppLayout from "./ui/AppLayout";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Offers from "./components/Offers";
import Help from "./components/Help";
import Loader from "./ui/Loader";
// import Grocery from "./components/Grocery";
// import About from "./components/About";

const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />, // Error boundary for layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Loader />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },

      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <LoginPage />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
