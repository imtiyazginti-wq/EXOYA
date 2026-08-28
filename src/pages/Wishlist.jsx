import { Link } from "react-router-dom";
import {
    Heart,
    ShoppingBag,
    Trash2,
    ArrowLeft,
} from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/Cartcontext";

import "./Wishlist.css";

const Wishlist = () => {

    const {
        wishlistItems,
        removeFromWishlist,
    } = useWishlist();

    const { addToCart } = useCart();

    // ================================
    // PRODUCT IMAGE URL
    // ================================

    const getProductImage = (image) => {

        if (!image) {
            return "";
        }

        return image.startsWith("http")
            ? image
            : `http://localhost:5000${image}`;

    };

    // ================================
    // ADD TO CART
    // ================================

    const handleAddToCart = (product) => {

        addToCart(product);

    };

    // ================================
    // EMPTY WISHLIST
    // ================================

    if (wishlistItems.length === 0) {

        return (

            <main className="wishlist-page empty-wishlist">

                <div className="empty-wishlist-icon">

                    <Heart size={42} />

                </div>

                <span className="wishlist-label">

                    EXOYA WISHLIST

                </span>

                <h1>
                    Your Wishlist is Empty
                </h1>

                <p>

                    Save your favorite products here and
                    come back whenever you're ready.

                </p>

                <Link
                    to="/shop"
                    className="wishlist-shop-btn"
                >

                    <ArrowLeft size={18} />

                    Continue Shopping

                </Link>

            </main>

        );

    }

    // ================================
    // UI
    // ================================

    return (

        <main className="wishlist-page">

            {/* HEADER */}

            <div className="wishlist-header">

                <div>

                    <span className="wishlist-label">

                        EXOYA WISHLIST

                    </span>

                    <h1>
                        My Wishlist
                    </h1>

                    <p>

                        {wishlistItems.length}{" "}

                        {wishlistItems.length === 1
                            ? "product"
                            : "products"}{" "}

                        saved for later.

                    </p>

                </div>

                <Heart size={30} />

            </div>

            {/* WISHLIST GRID */}

            <div className="wishlist-grid">

                {wishlistItems.map((product) => (

                    <article
                        className="wishlist-card"
                        key={product.id}
                    >

                        {/* PRODUCT IMAGE */}

                        <Link
                            to={`/product/${product.id}`}
                            className="wishlist-image-wrapper"
                        >

                            <img
                                src={getProductImage(
                                    product.image
                                )}
                                alt={product.name}
                            />

                        </Link>

                        {/* PRODUCT CONTENT */}

                        <div className="wishlist-content">

                            {/* CATEGORY */}

                            <span className="wishlist-category">

                                {product.category}

                            </span>

                            {/* PRODUCT NAME */}

                            <Link
                                to={`/product/${product.id}`}
                                className="wishlist-product-name"
                            >

                                <h2>
                                    {product.name}
                                </h2>

                            </Link>

                            {/* PRICE */}

                            <div className="wishlist-price">

                                <strong>

                                    ₹
                                    {Number(
                                        product.price || 0
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </strong>

                                {product.oldPrice && (

                                    <del>

                                        ₹
                                        {Number(
                                            product.oldPrice
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </del>

                                )}

                            </div>

                            {/* ACTIONS */}

                            <div className="wishlist-actions">

                                {/* ADD TO CART */}

                                <button
                                    type="button"
                                    className="wishlist-cart-btn"
                                    onClick={() =>
                                        handleAddToCart(
                                            product
                                        )
                                    }
                                >

                                    <ShoppingBag size={18} />

                                    Add to Cart

                                </button>

                                {/* REMOVE */}

                                <button
                                    type="button"
                                    className="wishlist-remove-btn"
                                    onClick={() =>
                                        removeFromWishlist(
                                            product.id
                                        )
                                    }
                                    aria-label="Remove from wishlist"
                                >

                                    <Trash2 size={18} />

                                </button>

                            </div>

                        </div>

                    </article>

                ))}

            </div>

        </main>

    );

};

export default Wishlist;