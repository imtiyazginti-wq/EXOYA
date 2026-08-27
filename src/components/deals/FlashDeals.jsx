import { useEffect, useState } from "react";
import { Clock3, ShoppingBag, Zap } from "lucide-react";

import AllProduct from "../../data/AllProduct";
import { useCart } from "../../context/Cartcontext";

import "./FlashDeals.css";

const FlashDeals = () => {
    const { addToCart } = useCart();

    const [time, setTime] = useState({
        hours: 5,
        minutes: 42,
        seconds: 18,
    });

    // TIMER
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // FLASH DEAL PRODUCTS
    const flashProducts = AllProduct
        .filter(
            (product) =>
                product.oldPrice &&
                Number(product.oldPrice) > Number(product.price)
        )
        .slice(0, 6);

    // DISCOUNT
    const getDiscount = (product) => {
        if (!product.oldPrice || !product.price) return 0;

        return Math.round(
            ((Number(product.oldPrice) - Number(product.price)) /
                Number(product.oldPrice)) *
            100
        );
    };

    // ADD TO CART
    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <section className="flash-deals">

            {/* HEADER */}
            <div className="flash-header">

                <div className="flash-heading-area">

                    <div className="flash-eyebrow">
                        <Zap size={15} />
                        <span>EXOYA FLASH EVENT</span>
                    </div>

                    <h2>
                        Flash <span>Deals</span>
                    </h2>

                    <p>
                        Grab the hottest deals before
                        they're gone.
                    </p>

                </div>

                {/* TIMER */}
                <div className="flash-timer">

                    <div className="timer-heading">
                        <Clock3 size={16} />
                        <span>ENDS IN</span>
                    </div>

                    <div className="timer-values">

                        <div className="timer-unit">
                            <strong>
                                {String(time.hours).padStart(2, "0")}
                            </strong>
                            <small>HRS</small>
                        </div>

                        <b>:</b>

                        <div className="timer-unit">
                            <strong>
                                {String(time.minutes).padStart(2, "0")}
                            </strong>
                            <small>MIN</small>
                        </div>

                        <b>:</b>

                        <div className="timer-unit">
                            <strong>
                                {String(time.seconds).padStart(2, "0")}
                            </strong>
                            <small>SEC</small>
                        </div>

                    </div>

                </div>

            </div>

            {/* PRODUCTS */}
            <div className="flash-products">

                {flashProducts.map((product) => {

                    const discount = getDiscount(product);

                    return (
                        <article
                            className="flash-card"
                            key={product.id}
                        >

                            {/* DISCOUNT */}
                            <span className="flash-discount">
                                {discount}% OFF
                            </span>

                            {/* IMAGE */}
                            <div className="flash-image">

                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                                <div className="flash-zap">
                                    <Zap size={15} />
                                </div>

                            </div>

                            {/* CONTENT */}
                            <div className="flash-content">

                                <span className="flash-category">
                                    {product.category}
                                </span>

                                <h3>
                                    {product.name}
                                </h3>

                                {/* RATING */}
                                <div className="flash-rating">
                                    <span>★</span>

                                    {product.rating || "4.5"}

                                    <small>
                                        ({product.reviews || 0})
                                    </small>
                                </div>

                                {/* PRICE */}
                                <div className="flash-price">

                                    <strong>
                                        ₹
                                        {Number(
                                            product.price || 0
                                        ).toLocaleString("en-IN")}
                                    </strong>

                                    <del>
                                        ₹
                                        {Number(
                                            product.oldPrice || 0
                                        ).toLocaleString("en-IN")}
                                    </del>

                                </div>

                                {/* STOCK */}
                                <div className="flash-stock">

                                    <div className="stock-text">
                                        <span>
                                            Selling fast
                                        </span>

                                        <span>
                                            Limited stock
                                        </span>
                                    </div>

                                    <div className="stock-bar">
                                        <span></span>
                                    </div>

                                </div>

                                {/* ADD TO CART */}
                                <button
                                    type="button"
                                    className="flash-cart-btn"
                                    onClick={() =>
                                        handleAddToCart(product)
                                    }
                                >
                                    <ShoppingBag size={17} />

                                    <span>
                                        Add to Cart
                                    </span>
                                </button>

                            </div>

                        </article>
                    );
                })}

            </div>

        </section>
    );
};

export default FlashDeals;