import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Categorybar from "./components/Categorybar/Categorybar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import ApiProduct from "./pages/ApiProduct";

import Productdetail from "./pages/Productdetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";

import { CartProvider } from "./context/Cartcontext";
import { WishlistProvider } from "./context/WishlistContext";

// SCROLL TO TOP
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

// APP
const App = () => {
    return (
        <CartProvider>
            <WishlistProvider>

                <Navbar />
                <Categorybar />

                {/* SCROLL TO TOP */}
                <ScrollToTop />

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/shop" element={<Shop />} />

                    <Route path="/shop/:category" element={<Shop />} />

                    <Route path="/product/:id" element={<Productdetail />} />

                    <Route path="/cart" element={<Cart />} />

                    <Route path="/wishlist" element={<Wishlist />} />

                    <Route path="/checkout" element={<Checkout />} />

                    <Route path="/categories" element={<Category />} />

                    <Route path="/api-product" element={<ApiProduct />} />
                </Routes>

            </WishlistProvider>
        </CartProvider>
    );
};

export default App;