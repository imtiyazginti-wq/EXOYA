import { Link } from "react-router-dom";
import {
    Heart,
    ShoppingBag,
    Star,
    ArrowRight,
} from "lucide-react";

import AllProduct from "../../data/AllProduct";
import { useCart } from "../../context/Cartcontext";
import { useWishlist } from "../../context/WishlistContext";

import "./Trendingproduct.css";

const Trendingproducts = () => {

    // ================= CART =================

    const { addToCart } = useCart();

    // ================= WISHLIST =================

    const {
        toggleWishlist,
        isWishlisted,
    } = useWishlist();

    // ================= ADD TO CART =================

    const handleAddToCart = (event, product) => {

        event.preventDefault();
        event.stopPropagation();

        addToCart(product);

        console.log(
            `${product.name} added to cart`
        );
    };

    // ================= WISHLIST =================

    const handleWishlist = (event, product) => {

        event.preventDefault();
        event.stopPropagation();

        toggleWishlist(product);

        console.log(
            `${product.name} wishlist updated`
        );
    };

    return (
        <section className="trending-section">

            <div className="trending-container">

                {/* ================= HEADER ================= */}

                <div className="trending-header">

                    <div>

                        <span className="trending-label">
                            EXOYA PICKS
                        </span>

                        <h2>
                            Trending Now
                        </h2>

                        <p>
                            Discover what everyone is shopping right now.
                        </p>

                    </div>

                    <Link
                        to="/shop"
                        className="view-all-btn"
                    >
                        View All
                        <ArrowRight size={16} />
                    </Link>

                </div>

                {/* ================= PRODUCTS ================= */}

                <div className="products-grid">

                    {AllProduct.map((product, index) => (

                        <article
                            className="product-card"
                            key={
                                product.id ??
                                `${product.name}-${index}`
                            }
                        >

                            {/* ================= IMAGE ================= */}

                            <Link
                                to={`/product/${product.id}`}
                                className="product-image-wrapper"
                            >

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />

                                {/* BADGE */}

                                {product.badge && (
                                    <span className="product-badge">
                                        {product.badge}
                                    </span>
                                )}

                                {/* ================= WISHLIST ================= */}

                                <button
                                    type="button"
                                    className={`wishlist-btn ${isWishlisted(product.id)
                                        ? "wishlist-active"
                                        : ""
                                        }`}
                                    aria-label={
                                        isWishlisted(product.id)
                                            ? "Remove from wishlist"
                                            : "Add to wishlist"
                                    }
                                    onClick={(event) =>
                                        handleWishlist(
                                            event,
                                            product
                                        )
                                    }
                                >

                                    <Heart
                                        size={17}
                                        fill={
                                            isWishlisted(
                                                product.id
                                            )
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />

                                </button>

                            </Link>

                            {/* ================= PRODUCT INFO ================= */}

                            <div className="product-info">

                                {/* CATEGORY */}

                                <span className="product-category">
                                    {product.category}
                                </span>

                                {/* NAME */}

                                <Link
                                    to={`/product/${product.id}`}
                                    className="product-name-link"
                                >

                                    <h3>
                                        {product.name}
                                    </h3>

                                </Link>

                                {/* ================= RATING ================= */}

                                <div className="product-rating">

                                    <div className="rating-box">

                                        <Star
                                            size={12}
                                            fill="currentColor"
                                        />

                                        <span>
                                            {product.rating || 0}
                                        </span>

                                    </div>

                                    <span className="review-count">
                                        ({product.reviews || 0})
                                    </span>

                                </div>

                                {/* ================= PRICE ================= */}

                                <div className="product-price">

                                    <span className="current-price">

                                        ₹
                                        {Number(
                                            product.price || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </span>

                                    {product.oldPrice && (

                                        <span className="old-price">

                                            ₹
                                            {Number(
                                                product.oldPrice
                                            ).toLocaleString(
                                                "en-IN"
                                            )}

                                        </span>

                                    )}

                                </div>

                                {/* ================= ADD TO CART ================= */}

                                <button
                                    type="button"
                                    className="add-to-cart-btn"
                                    onClick={(event) =>
                                        handleAddToCart(
                                            event,
                                            product
                                        )
                                    }
                                >

                                    <ShoppingBag size={18} />

                                    <span>
                                        Add to Cart
                                    </span>

                                </button>

                            </div>

                        </article>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default Trendingproducts;