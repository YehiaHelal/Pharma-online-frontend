import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/about/About";
import Faq from "./pages/help/Faq";

import NotFound from "./pages/errorhandling/NotFound";

// layouts
import RootLayout from "./layouts/RootLayout";
import HelpLayout from "./layouts/HelpLayout";

import { MedicationsPageLoader } from "./pages/categories/Medications";
import VitaminsAndSupplements from "./pages/categories/vitaminsAndSupplements";
import SkinCare from "./pages/categories/skinCare";
import DailyEssentials from "./pages/categories/dailyEssentials";
import CartItems from "./pages/cart/CartItems";
import ItemSearch, { itemSearchLoader } from "./pages/searchBar/ItemSearch";
import Signup, { SignupAction } from "./pages/login/Signup";
import Login, { LoginAction } from "./pages/login/Login";
import Footer from "./pages/footer/Footer";
import Contact, { contactAction } from "./pages/help/Contact";

import Medications from "./pages/categories/Medications";
import Offers from "./pages/offers/offers";
import FavouriteItems from "./pages/favourite/favourite";
import Profile, { ProfileAction, ProfileLoader } from "./pages/profile/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      <Route index element={<Home />} />

      <Route path="signup" element={<Signup />} action={SignupAction} />
      <Route path="login" element={<Login />} action={LoginAction} />
      <Route
        path="profile"
        element={<Profile />}
        loader={ProfileLoader}
        action={ProfileAction}
        errorElement={<NotFound />}
      />
      <Route path="contact" element={<Contact />} action={contactAction} />

      <Route path="medications" element={<Medications />} />
      <Route path="dailyEssentials" element={<DailyEssentials />} />
      <Route path="skinCare" element={<SkinCare />} />
      <Route
        path="vitaminsAndSupplements"
        element={<VitaminsAndSupplements />}
      />
      <Route
        path=":id"
        element={<ItemSearch />}
        loader={itemSearchLoader}
        errorElement={<NotFound />}
      />
      <Route path="favourite" element={<FavouriteItems />} />
      <Route path="cart" element={<CartItems />} />

      <Route path="about" element={<About />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="footer" element={<Footer />} />
      </Route>

      <Route path="offers" element={<Offers />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
