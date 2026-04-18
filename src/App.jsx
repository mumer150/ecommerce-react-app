import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Header from "./components/Hearder";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SucessPage";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import useAuth from "./hooks/useAuth";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";

export const App = () => {
  const user = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Toaster position="top-right" containerStyle={{ top: 70, right: 10 }} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart" element={user ? <CartPage /> : <Login />} />
          <Route
            path="/checkout"
            element={user ? <CheckoutPage /> : <Login />}
          />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/orders" element={user ? <Orders /> : <Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
