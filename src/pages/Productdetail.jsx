import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
// LIVE BACKEND URL
// ==========================================
//
// IMPORTANT:
// Yahan wahi Render backend URL lagana hai
// jo Shop.jsx mein lagaya hai.
//
// ==========================================

const API_BASE_URL = "https://YOUR-RENDER-BACKEND-URL";

// ==========================================
// IMAGE URL HELPER
// ==========================================

const getImageUrl = (image) => {
    if (!image) {
        return "";
    }

    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    return `${API_BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const Productdetail = () => {

    // =========================================
    // GET PRODUCT ID FROM URL
    // =========================================

    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart, buyNow } = useCart();

    // =========================================
    // PRODUCT FROM API
    // =========================================

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    // =========================================
    // GET SINGLE PRODUCT FROM API
    // =========================================

    useEffect(() => {

        const getProduct = async () => {

            try {

                setLoading(true);

                setError(false);

                const response = await axios.get(
                    `${API_BASE_URL}/api/products/${id}`
                );

                console.log(
                    "Product Detail API:",
                    response.data
                );

                // =========================================
                // IMPORTANT:
                // Product image ko full backend URL mein
                // convert kar rahe hain.
                //
                // Is product ko Cart mein bhejne par
                // image break nahi hogi.
                // =========================================

                const productData = {
                    ...response.data,
                    image: getImageUrl(response.data.image),
                };

                setProduct(productData);

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

    const [quantity, setQuantity] = useState(1);

    // =========================================
    // WISHLIST
    // =========================================

    const [isWishlisted, setIsWishlisted] =
        useState(false);

    // =========================================
    // ADD TO CART
    // =========================================

    const handleAddToCart = () => {

        if (!product) return;

        for (let i = 0; i < quantity; i++) {

            addToCart(product);

        }

    };

    // =========================================
    // BUY NOW
    // =========================================

    const handleBuyNow = () => {

        if (!product) return;

        for (let i = 0; i < quantity; i++) {

            buyNow(product);

        }

        navigate("/checkout");

    };

    // =========================================
    // INCREASE QUANTITY
    // =========================================

    const increaseQuantity = () => {

        setQuantity((prev) => prev + 1);

    };

    // =========================================
    // DECREASE QUANTITY
    // =========================================

    const decreaseQuantity = () => {

        setQuantity((prev) =>
            prev > 1 ? prev - 1 : 1
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
                        Sorry, this product does not exist.
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
    // PRODUCT IMAGE URL
    // =========================================
    //
    // Product ko already full URL mein convert
    // kiya gaya hai.
    //
    // Safety ke liye getImageUrl dobara use kar
    // rahe hain.
    // =========================================

    const productImage =
        getImageUrl(product.image);

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
                        Number(product.oldPrice) -
                        Number(product.price)
                    ) /
                    Number(product.oldPrice)
                ) * 100
            )
            : 0;

    // =========================================
    // UI
    // =========================================

    return (

        <main className="product-detail-page">

            {/* BACK BUTTON */}

            <button
                type="button"
                className="product-back-btn"
                onClick={() => navigate(-1)}
                aria-label="Go back"
            >

                <ArrowLeft size={20} />

            </button>

            {/* BREADCRUMB */}

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

            {/* MAIN PRODUCT SECTION */}

            <section className="product-detail-container">

                {/* LEFT IMAGE */}

                <div className="product-detail-image-section">

                    <div className="product-detail-image-wrapper">

                        {/* BADGE */}

                        {product.badge && (

                            <span className="detail-badge">

                                {product.badge}

                            </span>

                        )}

                        {/* PRODUCT IMAGE */}

                        <img
                            src={productImage}
                            alt={product.name}
                            className="product-detail-image"
                            onError={(event) => {
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

                {/* RIGHT PRODUCT INFORMATION */}

                <div className="product-detail-info">

                    {/* CATEGORY */}

                    <span className="detail-category">

                        {product.category}

                    </span>

                    {/* PRODUCT NAME */}

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

                                {product.rating || "0.0"}

                            </span>

                        </div>

                        <span className="detail-review-count">

                            {product.reviews || 0}
                            {" "}
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

                        {/* ADD TO CART */}

                        <button
                            type="button"
                            className="detail-add-cart-btn"
                            onClick={handleAddToCart}
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
                            onClick={handleBuyNow}
                        >

                            <Zap size={19} />

                            <span>
                                Buy Now
                            </span>

                        </button>

                    </div>

                    {/* SERVICE FEATURES */}

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
                                    Free delivery on this product
                                </span>

                            </div>

                        </div>

                        <div className="service-item">

                            <div className="service-icon">

                                <ShieldCheck size={20} />

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

                                <RotateCcw size={20} />

                            </div>

                            <div>

                                <strong>
                                    Easy Returns
                                </strong>

                                <span>
                                    Easy return & replacement
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* PRODUCT INFORMATION */}

            <section className="product-extra-section">

                <div className="extra-card">

                    <h2>
                        Why you'll love it
                    </h2>

                    <div className="extra-grid">

                        <div>

                            <span>
                                ★
                            </span>

                            <h3>
                                Highly Rated
                            </h3>

                            <p>
                                Loved by customers
                                with great ratings.
                            </p>

                        </div>

                        <div>

                            <span>
                                ✓
                            </span>

                            <h3>
                                Quality Product
                            </h3>

                            <p>
                                Carefully selected
                                for EXOYA.
                            </p>

                        </div>

                        <div>

                            <span>
                                ⚡
                            </span>

                            <h3>
                                Fast Delivery
                            </h3>

                            <p>
                                Quick and reliable
                                delivery.
                            </p>

                        </div>

                        <div>

                            <span>
                                ♡
                            </span>

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