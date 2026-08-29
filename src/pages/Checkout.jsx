import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle,
    Lock,
    MapPin,
    CreditCard,
} from "lucide-react";

import { useCart } from "../context/Cartcontext";

import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();

    const { cartItems, cartTotal, clearCart } = useCart();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        payment: "cod",
    });

    const [orderPlaced, setOrderPlaced] = useState(false);

    const deliveryCharge = cartTotal >= 499 ? 0 : 49;
    const grandTotal = cartTotal + deliveryCharge;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (cartItems.length === 0) {
            navigate("/shop");
            return;
        }

        setOrderPlaced(true);
        clearCart();
    };

    // ================= IMAGE URL =================
    const getImageUrl = (image) => {
        if (!image) {
            return "";
        }

        // Agar image already complete URL hai
        if (image.startsWith("http")) {
            return image;
        }

        // Agar backend image path /assets/... form mein hai
        return `http://localhost:5000${image.startsWith("/") ? "" : "/"}${image}`;
    };

    // ================= EMPTY CART =================

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <main className="checkout-empty">
                <h1>Your Cart is Empty</h1>

                <p>
                    Add some products before proceeding to checkout.
                </p>

                <Link
                    to="/shop"
                    className="checkout-back-btn"
                >
                    Continue Shopping
                </Link>
            </main>
        );
    }

    // ================= ORDER SUCCESS =================

    if (orderPlaced) {
        return (
            <main className="order-success">
                <div className="success-icon">
                    <CheckCircle size={60} />
                </div>

                <span className="checkout-label">
                    EXOYA ORDER
                </span>

                <h1>
                    Order Placed Successfully!
                </h1>

                <p>
                    Thank you for shopping with EXOYA.
                    Your order has been received successfully.
                </p>

                <div className="success-details">
                    <strong>
                        Payment Method
                    </strong>

                    <span>
                        {formData.payment === "cod"
                            ? "Cash on Delivery"
                            : "Online Payment"}
                    </span>
                </div>

                <button
                    type="button"
                    className="success-btn"
                    onClick={() => navigate("/shop")}
                >
                    Continue Shopping
                </button>
            </main>
        );
    }

    return (
        <main className="checkout-page">

            {/* ================= HEADER ================= */}

            <div className="checkout-header">

                <Link
                    to="/cart"
                    className="back-cart"
                >
                    <ArrowLeft size={18} />
                    Back to Cart
                </Link>

                <div>
                    <span className="checkout-label">
                        EXOYA CHECKOUT
                    </span>

                    <h1>
                        Complete Your Order
                    </h1>

                    <p>
                        Enter your details and choose your payment method.
                    </p>
                </div>

            </div>

            {/* ================= CHECKOUT LAYOUT ================= */}

            <div className="checkout-layout">

                {/* ================= FORM ================= */}

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    {/* CUSTOMER DETAILS */}

                    <section className="checkout-card">

                        <div className="section-heading">

                            <div className="section-icon">
                                <MapPin size={20} />
                            </div>

                            <div>
                                <h2>
                                    Delivery Information
                                </h2>

                                <p>
                                    Where should we deliver your order?
                                </p>
                            </div>

                        </div>

                        <div className="form-grid">

                            <div className="form-group">
                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="House No, Street, Area..."
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    PIN Code
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="6 digit PIN"
                                    pattern="[0-9]{6}"
                                    required
                                />
                            </div>

                        </div>

                    </section>

                    {/* PAYMENT */}

                    <section className="checkout-card">

                        <div className="section-heading">

                            <div className="section-icon">
                                <CreditCard size={20} />
                            </div>

                            <div>
                                <h2>
                                    Payment Method
                                </h2>

                                <p>
                                    Select how you want to pay.
                                </p>
                            </div>

                        </div>

                        <div className="payment-options">

                            <label
                                className={`payment-option ${formData.payment === "cod"
                                    ? "selected"
                                    : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={
                                        formData.payment === "cod"
                                    }
                                    onChange={handleChange}
                                />

                                <div>
                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <span>
                                        Pay when your order arrives.
                                    </span>
                                </div>

                            </label>

                            <label
                                className={`payment-option ${formData.payment === "online"
                                    ? "selected"
                                    : ""
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={
                                        formData.payment === "online"
                                    }
                                    onChange={handleChange}
                                />

                                <div>
                                    <strong>
                                        Online Payment
                                    </strong>

                                    <span>
                                        UPI, Card & Net Banking.
                                    </span>
                                </div>

                            </label>

                        </div>

                    </section>

                    {/* PLACE ORDER */}

                    <button
                        type="submit"
                        className="place-order-btn"
                    >
                        <Lock size={18} />

                        Place Order • ₹
                        {grandTotal.toLocaleString("en-IN")}
                    </button>

                </form>

                {/* ================= ORDER SUMMARY ================= */}

                <aside className="checkout-summary">

                    <h2>
                        Order Summary
                    </h2>

                    <div className="summary-products">

                        {cartItems.map((item) => (
                            <div
                                className="summary-product"
                                key={item.id}
                            >

                                {/* PRODUCT IMAGE */}

                                <img
                                    src={getImageUrl(item.image)}
                                    alt={item.name}
                                    onError={(event) => {
                                        event.currentTarget.style.display =
                                            "none";
                                    }}
                                />

                                <div>
                                    <h3>
                                        {item.name}
                                    </h3>

                                    <span>
                                        Qty: {item.quantity}
                                    </span>
                                </div>

                                <strong>
                                    ₹
                                    {(
                                        Number(item.price || 0) *
                                        item.quantity
                                    ).toLocaleString("en-IN")}
                                </strong>

                            </div>
                        ))}

                    </div>

                    <div className="summary-divider" />

                    <div className="summary-row">

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ₹
                            {cartTotal.toLocaleString("en-IN")}
                        </strong>

                    </div>

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

                    <div className="summary-divider" />

                    <div className="checkout-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹
                            {grandTotal.toLocaleString("en-IN")}
                        </strong>

                    </div>

                    <div className="secure-checkout">

                        <ShieldIcon />

                        <span>
                            Secure & safe checkout
                        </span>

                    </div>

                </aside>

            </div>

        </main>
    );
};

const ShieldIcon = () => (
    <div className="shield-small">
        ✓
    </div>
);

export default Checkout;