import { useState, useEffect } from "react";
import {
    useParams,
    Link,
    useNavigate,
} from "react-router-dom";

import {
    ShoppingBag,
    Heart,
    Star,
    Plus,
    Minus,
    Truck,
    ShieldCheck,
    RotateCcw,
    ArrowLeft,
    Zap,
} from "lucide-react";

import axios from "axios";

import { useCart } from "../context/Cartcontext";

import "./Productdetail.css";

// ==========================================
// BACKEND URL
// ==========================================

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000";

// ==========================================
// IMAGE URL HELPER
// ==========================================

const getImageUrl = (image) => {
    if (!image) {
        return "";
    }

    // Already complete URL
    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    const cleanImage = image.startsWith("/")
        ? image
        : `/${image}`;

    return `${API_BASE_URL}${cleanImage}`;
};

// ==========================================
// PRODUCT DETAIL
// ==========================================

const Productdetail = () => {

    // =========================================
    // PRODUCT ID
    // =========================================

    const { id } = useParams();

    const navigate = useNavigate();

    const {
        addToCart,
        buyNow,
    } = useCart();

    // =========================================
    // PRODUCT STATE
    // =========================================

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(false);

    // =========================================
    // GET PRODUCT
    // =========================================

    useEffect(() => {

        const getProduct = async () => {

            try {

                setLoading(true);
                setError(false);

                const response =
                    await axios.get(
                        `${API_BASE_URL}/api/products/${id}`
                    );

                console.log(
                    "Product Detail API:",
                    response.data
                );

                // ====================================
                // IMPORTANT
                // Make image URL complete
                // BEFORE putting product in state.
                // ====================================

                const productData = {
                    ...response.data,

                    image: getImageUrl(
                        response.data.image
                    ),
                };

                setProduct(
                    productData
                );

            } catch (error) {

                console.error(
                    "Error fetching product:",
                    error
                );

                setError(true);
                setProduct(null);

            } finally {

                setLoading(false);

            }

        };

        getProduct();

    }, [id]);

    // =========================================
    // QUANTITY
    // =========================================

    const [quantity, setQuantity] =
        useState(1);

    // =========================================
    // WISHLIST
    // =========================================

    const [
        isWishlisted,
        setIsWishlisted,
    ] = useState(false);

    // =========================================
    // ADD TO CART
    // =========================================

    const handleAddToCart = () => {

        if (!product) {
            return;
        }

        // Product already has complete
        // live image URL.

        for (
            let i = 0;
            i < quantity;
            i++
        ) {

            addToCart(product);

        }

    };

    // =========================================
    // BUY NOW
    // =========================================

    const handleBuyNow = () => {

        if (!product) {
            return;
        }

        for (
            let i = 0;
            i < quantity;
            i++
        ) {

            buyNow(product);

        }

        navigate("/checkout");

    };

    // =========================================
    // INCREASE
    // =========================================

    const increaseQuantity = () => {

        setQuantity(
            (prev) => prev + 1
        );

    };

    // =========================================
    // DECREASE
    // =========================================

    const decreaseQuantity = () => {

        setQuantity(
            (prev) =>
                prev > 1
                    ? prev - 1
                    : 1
        );

    };

    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <main className="product-not-found">

                <div>

                    <h1>
                        Loading Product...
                    </h1>

                    <p>
                        Please wait while product
                        details are being loaded.
                    </p>

                </div>

            </main>

        );

    }

    // =========================================
    // PRODUCT NOT FOUND
    // =========================================

    if (error || !product) {

        return (

            <main className="product-not-found">

                <div>

                    <h1>
                        Product Not Found
                    </h1>

                    <p>
                        Sorry, this product does
                        not exist.
                    </p>

                    <Link
                        to="/shop"
                        className="back-shop-btn"
                    >

                        <ArrowLeft size={18} />

                        Back to Shop

                    </Link>

                </div>

            </main>

        );

    }

    // =========================================
    // IMAGE
    // =========================================

    const productImage =
        getImageUrl(
            product.image
        );

    // =========================================
    // DISCOUNT
    // =========================================

    const discount =
        product.oldPrice &&
            Number(product.oldPrice) >
            Number(product.price)
            ? Math.round(
                (
                    (
                        Number(
                            product.oldPrice
                        ) -
                        Number(
                            product.price
                        )
                    ) /
                    Number(
                        product.oldPrice
                    )
                ) * 100
            )
            : 0;

    // =========================================
    // UI
    // =========================================

    return (

        <main className="product-detail-page">

            {/* ================================= */}
            {/* BACK BUTTON */}
            {/* ================================= */}

            <button
                type="button"
                className="product-back-btn"
                onClick={() =>
                    navigate(-1)
                }
                aria-label="Go back"
            >

                <ArrowLeft size={20} />

            </button>

            {/* ================================= */}
            {/* BREADCRUMB */}
            {/* ================================= */}

            <div className="product-breadcrumb">

                <Link to="/">
                    Home
                </Link>

                <span>/</span>

                <Link to="/shop">
                    Shop
                </Link>

                <span>/</span>

                <span>
                    {product.category}
                </span>

                <span>/</span>

                <strong>
                    {product.name}
                </strong>

            </div>

            {/* ================================= */}
            {/* MAIN PRODUCT */}
            {/* ================================= */}

            <section className="product-detail-container">

                {/* ================================= */}
                {/* IMAGE */}
                {/* ================================= */}

                <div className="product-detail-image-section">

                    <div className="product-detail-image-wrapper">

                        {product.badge && (

                            <span className="detail-badge">

                                {product.badge}

                            </span>

                        )}

                        <img
                            src={productImage}
                            alt={product.name}
                            className="product-detail-image"
                            onError={() => {
                                console.error(
                                    "Product detail image failed:",
                                    productImage
                                );
                            }}
                        />

                        {/* WISHLIST */}

                        <button
                            type="button"
                            className={`detail-wishlist-btn ${isWishlisted
                                ? "wishlisted"
                                : ""
                                }`}
                            onClick={() =>
                                setIsWishlisted(
                                    !isWishlisted
                                )
                            }
                            aria-label={
                                isWishlisted
                                    ? "Remove from wishlist"
                                    : "Add to wishlist"
                            }
                        >

                            <Heart
                                size={21}
                                fill={
                                    isWishlisted
                                        ? "currentColor"
                                        : "none"
                                }
                            />

                        </button>

                    </div>

                </div>

                {/* ================================= */}
                {/* INFORMATION */}
                {/* ================================= */}

                <div className="product-detail-info">

                    {/* CATEGORY */}

                    <span className="detail-category">

                        {product.category}

                    </span>

                    {/* NAME */}

                    <h1 className="detail-product-name">

                        {product.name}

                    </h1>

                    {/* RATING */}

                    <div className="detail-rating-row">

                        <div className="detail-rating-box">

                            <Star
                                size={14}
                                fill="currentColor"
                            />

                            <span>

                                {product.rating ||
                                    "0.0"}

                            </span>

                        </div>

                        <span className="detail-review-count">

                            {product.reviews ||
                                0}{" "}

                            Ratings & Reviews

                        </span>

                    </div>

                    <div className="detail-divider" />

                    {/* PRICE */}

                    <div className="detail-price-section">

                        <div className="detail-price-row">

                            <span className="detail-current-price">

                                ₹
                                {Number(
                                    product.price || 0
                                ).toLocaleString(
                                    "en-IN"
                                )}

                            </span>

                            {product.oldPrice && (

                                <span className="detail-old-price">

                                    ₹
                                    {Number(
                                        product.oldPrice
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </span>

                            )}

                            {discount > 0 && (

                                <span className="detail-discount">

                                    {discount}% OFF

                                </span>

                            )}

                        </div>

                        <p className="tax-info">

                            Inclusive of all taxes

                        </p>

                    </div>

                    {/* DESCRIPTION */}

                    <div className="detail-description">

                        <h3>
                            About this product
                        </h3>

                        <p>

                            Experience premium quality
                            with the{" "}

                            <strong>
                                {product.name}
                            </strong>.

                            Designed for everyday use,
                            this product offers excellent
                            quality, comfort and value.

                        </p>

                    </div>

                    {/* QUANTITY */}

                    <div className="detail-quantity-section">

                        <span>
                            Quantity
                        </span>

                        <div className="quantity-control">

                            <button
                                type="button"
                                onClick={
                                    decreaseQuantity
                                }
                                aria-label="Decrease quantity"
                            >

                                <Minus size={17} />

                            </button>

                            <span>
                                {quantity}
                            </span>

                            <button
                                type="button"
                                onClick={
                                    increaseQuantity
                                }
                                aria-label="Increase quantity"
                            >

                                <Plus size={17} />

                            </button>

                        </div>

                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="detail-action-buttons">

                        {/* ADD CART */}

                        <button
                            type="button"
                            className="detail-add-cart-btn"
                            onClick={
                                handleAddToCart
                            }
                        >

                            <ShoppingBag size={20} />

                            <span>
                                Add to Cart
                            </span>

                        </button>

                        {/* BUY NOW */}

                        <button
                            type="button"
                            className="detail-buy-btn"
                            onClick={
                                handleBuyNow
                            }
                        >

                            <Zap size={19} />

                            <span>
                                Buy Now
                            </span>

                        </button>

                    </div>

                    {/* SERVICES */}

                    <div className="detail-services">

                        <div className="service-item">

                            <div className="service-icon">

                                <Truck size={20} />

                            </div>

                            <div>

                                <strong>
                                    Free Delivery
                                </strong>

                                <span>
                                    Free delivery on this
                                    product
                                </span>

                            </div>

                        </div>

                        <div className="service-item">

                            <div className="service-icon">

                                <ShieldCheck
                                    size={20}
                                />

                            </div>

                            <div>

                                <strong>
                                    Secure Payment
                                </strong>

                                <span>
                                    100% secure checkout
                                </span>

                            </div>

                        </div>

                        <div className="service-item">

                            <div className="service-icon">

                                <RotateCcw
                                    size={20}
                                />

                            </div>

                            <div>

                                <strong>
                                    Easy Returns
                                </strong>

                                <span>
                                    Easy return &
                                    replacement
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================================= */}
            {/* EXTRA INFORMATION */}
            {/* ================================= */}

            <section className="product-extra-section">

                <div className="extra-card">

                    <h2>
                        Why you'll love it
                    </h2>

                    <div className="extra-grid">

                        <div>

                            <span>★</span>

                            <h3>
                                Highly Rated
                            </h3>

                            <p>
                                Loved by customers
                                with great ratings.
                            </p>

                        </div>

                        <div>

                            <span>✓</span>

                            <h3>
                                Quality Product
                            </h3>

                            <p>
                                Carefully selected
                                for EXOYA.
                            </p>

                        </div>

                        <div>

                            <span>⚡</span>

                            <h3>
                                Fast Delivery
                            </h3>

                            <p>
                                Quick and reliable
                                delivery.
                            </p>

                        </div>

                        <div>

                            <span>♡</span>

                            <h3>
                                Customer Favorite
                            </h3>

                            <p>
                                One of our popular
                                products.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    );
};

export default Productdetail;