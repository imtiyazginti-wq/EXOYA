import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, } from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../context/Cartcontext";

import "./Cart.css";

const Cart = () => {

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal,
        clearCart,
    } = useCart();

    // ================================
    // EMPTY CART
    // ================================

    if (cartItems.length === 0) {

        return (
            <main className="cart-page empty-cart">

                <div className="empty-cart-icon">
                    <ShoppingBag size={60} />
                </div>

                <h1>
                    Your Cart is Empty
                </h1>

                <p>
                    Looks like you haven't added
                    anything to your cart yet.
                </p>

                <Link
                    to="/shop"
                    className="continue-shopping-btn"
                >
                    Continue Shopping
                    <ArrowRight size={18} />
                </Link>

            </main>
        );
    }

    // ================================
    // DELIVERY
    // ================================

    const deliveryCharge =
        cartTotal >= 499 ? 0 : 49;

    // ================================
    // GRAND TOTAL
    // ================================

    const grandTotal =
        cartTotal + deliveryCharge;

    // ================================
    // UI
    // ================================

    return (
        <main className="cart-page">

            {/* ================================
                HEADER
            ================================= */}

            <div className="cart-header">

                <div>

                    <span className="cart-label">
                        EXOYA CART
                    </span>

                    <h1>
                        Your Shopping Cart
                    </h1>

                    <p>
                        Review your products before checkout.
                    </p>

                </div>

                <button
                    type="button"
                    className="clear-cart-btn"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>

            </div>

            {/* ================================
                CART LAYOUT
            ================================= */}

            <div className="cart-layout">

                {/* ================================
                    CART ITEMS
                ================================= */}

                <section className="cart-items">

                    {cartItems.map((item) => (

                        <article
                            className="cart-item"
                            key={item.id}
                        >

                            {/* IMAGE */}

                            <div className="cart-item-image">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                            </div>

                            {/* DETAILS */}

                            <div className="cart-item-details">

                                <span className="cart-category">
                                    {item.category}
                                </span>

                                <h2>
                                    {item.name}
                                </h2>

                                <p className="cart-price">
                                    ₹
                                    {Number(
                                        item.price || 0
                                    ).toLocaleString("en-IN")}
                                </p>

                                {/* QUANTITY */}

                                <div className="quantity-control">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            decreaseQuantity(
                                                item.id
                                            )
                                        }
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            increaseQuantity(
                                                item.id
                                            )
                                        }
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={16} />
                                    </button>

                                </div>

                                {/* REMOVE */}

                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() =>
                                        removeFromCart(
                                            item.id
                                        )
                                    }
                                >

                                    <Trash2 size={16} />

                                    Remove

                                </button>

                            </div>

                            {/* ITEM TOTAL */}

                            <div className="cart-item-right">

                                <strong>

                                    ₹
                                    {(
                                        Number(
                                            item.price || 0
                                        ) *
                                        item.quantity
                                    ).toLocaleString(
                                        "en-IN"
                                    )}

                                </strong>

                            </div>

                        </article>

                    ))}

                </section>

                {/* ================================
                    SUMMARY
                ================================= */}

                <aside className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>

                    {/* SUBTOTAL */}

                    <div className="summary-row">

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ₹
                            {cartTotal.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                    {/* DELIVERY */}

                    <div className="summary-row">

                        <span>
                            Delivery
                        </span>

                        <strong>

                            {deliveryCharge === 0
                                ? "FREE"
                                : `₹${deliveryCharge}`}

                        </strong>

                    </div>

                    <hr />

                    {/* TOTAL */}

                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹
                            {grandTotal.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                    {/* ================================
                        CHECKOUT
                    ================================= */}

                    <Link
                        to="/checkout"
                        state={{
                            deliveryCharge,
                            grandTotal,
                        }}
                        className="checkout-btn"
                    >

                        Proceed to Checkout

                        <ArrowRight size={18} />

                    </Link>

                    {/* FEATURES */}

                    <div className="cart-features">

                        <div>

                            <Truck size={20} />

                            <span>
                                Fast Delivery
                            </span>

                        </div>

                        <div>

                            <ShieldCheck size={20} />

                            <span>
                                Secure Payment
                            </span>

                        </div>

                    </div>

                </aside>

            </div>

        </main>
    );
};

export default Cart;