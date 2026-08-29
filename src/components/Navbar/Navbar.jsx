import { useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, Heart, ShoppingBag, Menu, X, } from "lucide-react";

import { useCart } from "../../context/Cartcontext";
import { useWishlist } from "../../context/WishlistContext";

import Search from "../search/Search";
import "./Navbar.css";

import Logo4 from "../../assets/Logo/Logo4.png";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // ================= CART =================

    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // ================= WISHLIST =================

    const { wishlistItems } = useWishlist();

    const wishlistCount = wishlistItems.length;

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">

                    {/* ================= LOGO ================= */}

                    <Link to="/" className="logo">
                        <img src={Logo4} alt="EXOYA" />
                    </Link>

                    {/* ================= NAV LINKS ================= */}

                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/shop">Shop</Link>
                        <Link to="/categories">Categories</Link>
                        <Link to="/shop/deals">Deals</Link>
                        <Link to="/shop/all">New Arrivals</Link>
                    </div>

                    {/* ================= ACTIONS ================= */}

                    <div className="nav-actions">

                        {/* SEARCH */}

                        <button
                            className="icon-btn"
                            onClick={() => setSearchOpen(true)}
                            aria-label="Search"
                        >
                            <SearchIcon size={20} />
                        </button>

                        {/* ================= WISHLIST ================= */}

                        <Link
                            to="/wishlist"
                            className="icon-btn wishlist-nav-btn"
                            aria-label="Wishlist"
                        >
                            <Heart
                                size={20}
                                fill="none"
                            />

                            {wishlistCount > 0 && (
                                <span className="wishlist-count">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* ================= CART ================= */}

                        <Link
                            to="/cart"
                            className="cart-btn"
                            aria-label="Cart"
                        >
                            <ShoppingBag size={20} />

                            {cartCount > 0 && (
                                <span>{cartCount}</span>
                            )}
                        </Link>

                        {/* ================= MOBILE MENU ================= */}

                        <button
                            className="mobile-menu-btn"
                            onClick={() =>
                                setMenuOpen(!menuOpen)
                            }
                            aria-label="Menu"
                        >
                            {menuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </button>

                    </div>
                </div>
            </nav>

            {/* ================= SEARCH OVERLAY ================= */}

            {searchOpen && (
                <div
                    className="search-overlay"
                    onClick={() =>
                        setSearchOpen(false)
                    }
                >
                    <div
                        className="search-overlay-content"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="search-top">

                            <SearchIcon size={24} />

                            <Search />

                            <button
                                onClick={() =>
                                    setSearchOpen(false)
                                }
                                aria-label="Close search"
                                className="search-close-btn"
                            >
                                <X size={24} />
                            </button>

                        </div>

                        {/* POPULAR SEARCHES */}

                        <div className="popular-searches">

                            <p>Popular Searches</p>

                            <div>
                                <span>iPhone</span>
                                <span>MacBook</span>
                                <span>AirPods</span>
                                <span>Gaming Laptop</span>
                                <span>Smart Watch</span>
                            </div>

                        </div>

                    </div>
                </div>
            )}

            {/* ================= MOBILE MENU ================= */}

            {menuOpen && (
                <div className="mobile-menu">

                    <Link
                        to="/"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Home
                    </Link>

                    <Link
                        to="/shop"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Shop
                    </Link>

                    <Link
                        to="/categories"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Categories
                    </Link>

                    <Link
                        to="/shop/deals"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        Deals
                    </Link>

                    <Link
                        to="/shop/all"
                        onClick={() =>
                            setMenuOpen(false)
                        }
                    >
                        New Arrivals
                    </Link>

                </div>
            )}
        </>
    );
};

export default Navbar;