import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/Cartcontext";

import "./Wishlist.css";

const Wishlist = () => {
    const {
        wishlistItems,
        removeFromWishlist,
    } = useWishlist();

    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    if (wishlistItems.length === 0) {
        return (
            <main className="wishlist-page empty-wishlist">
                <div className="empty-wishlist-icon">
                    <Heart size={42} />
                </div>

                <span className="wishlist-label">
                    EXOYA WISHLIST
                </span>

                <h1>Your Wishlist is Empty</h1>

                <p>
                    Save your favorite products here and
                    come back whenever you're ready.
                </p>

                <Link to="/shop" className="wishlist-shop-btn">
                    <ArrowLeft size={18} />
                    Continue Shopping
                </Link>
            </main>
        );
    }

    return (
        <main className="wishlist-page">

            <div className="wishlist-header">
                <div>
                    <span className="wishlist-label">
                        EXOYA WISHLIST
                    </span>

                    <h1>My Wishlist</h1>

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

            <div className="wishlist-grid">

                {wishlistItems.map((product) => (

                    <article
                        className="wishlist-card"
                        key={product.id}
                    >

                        <Link
                            to={`/product/${product.id}`}
                            className="wishlist-image-wrapper"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                            />
                        </Link>

                        <div className="wishlist-content">

                            <span className="wishlist-category">
                                {product.category}
                            </span>

                            <Link
                                to={`/product/${product.id}`}
                                className="wishlist-product-name"
                            >
                                <h2>{product.name}</h2>
                            </Link>

                            <div className="wishlist-price">

                                <strong>
                                    ₹
                                    {Number(
                                        product.price || 0
                                    ).toLocaleString("en-IN")}
                                </strong>

                                {product.oldPrice && (
                                    <del>
                                        ₹
                                        {Number(
                                            product.oldPrice
                                        ).toLocaleString("en-IN")}
                                    </del>
                                )}

                            </div>

                            <div className="wishlist-actions">

                                <button
                                    type="button"
                                    className="wishlist-cart-btn"
                                    onClick={() =>
                                        handleAddToCart(product)
                                    }
                                >
                                    <ShoppingBag size={18} />
                                    Add to Cart
                                </button>

                                <button
                                    type="button"
                                    className="wishlist-remove-btn"
                                    onClick={() =>
                                        removeFromWishlist(product.id)
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