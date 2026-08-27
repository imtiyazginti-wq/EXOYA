import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

import AllProduct from "../../data/AllProduct";

import "./CrazyDeals.css";

const dealRanges = [
    {
        title: "Under ₹299",
        subtitle: "Crazy picks at crazy prices",
        maxPrice: 299,
    },
    {
        title: "Under ₹449",
        subtitle: "More savings, more shopping",
        maxPrice: 449,
    },
    {
        title: "Under ₹749",
        subtitle: "Premium deals under budget",
        maxPrice: 749,
    },
    {
        title: "Under ₹999",
        subtitle: "Big products, better prices",
        maxPrice: 999,
    },
];

const CrazyDeals = () => {
    return (
        <section className="crazy-deals">
            <div className="crazy-deals-container">

                {/* HEADER */}
                <div className="crazy-deals-header">
                    <div>
                        <span className="crazy-deals-label">
                            EXOYA CRAZY DEALS
                        </span>

                        <h2>
                            Big Deals. Small Prices.
                        </h2>

                        <p>
                            Grab amazing products without breaking your budget.
                        </p>
                    </div>

                    <div className="crazy-deals-icon">
                        <Zap size={22} />
                    </div>
                </div>

                {/* DEAL CARDS */}
                <div className="crazy-deals-grid">

                    {dealRanges.map((deal) => {

                        const products = AllProduct
                            .filter(
                                (product) =>
                                    Number(product.price || 0) <= deal.maxPrice
                            )
                            .slice(0, 4);

                        return (
                            <div
                                className="crazy-deal-card"
                                key={deal.maxPrice}
                            >

                                {/* CARD HEADER */}
                                <div className="crazy-deal-card-header">

                                    <div>
                                        <span className="crazy-deal-title">
                                            {deal.title}
                                        </span>

                                        <p>
                                            {deal.subtitle}
                                        </p>
                                    </div>

                                    <span className="crazy-deal-badge">
                                        DEAL
                                    </span>

                                </div>

                                {/* PRODUCTS */}
                                <div className="crazy-deal-products">

                                    {products.map((product) => (

                                        <Link to={`/product/${product.id}`} className="crazy-product"
                                            key={product.id}>

                                            <div className="crazy-product-image">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                            </div>

                                            <div className="crazy-product-info">

                                                <span>
                                                    {product.name}
                                                </span>

                                                <strong>
                                                    ₹
                                                    {Number(
                                                        product.price || 0
                                                    ).toLocaleString("en-IN")}
                                                </strong>

                                            </div>

                                        </Link>

                                    ))}

                                </div>

                                {/* VIEW BUTTON */}
                                <Link to="/shop" className="crazy-view-btn">Explore Deals
                                    <ArrowRight size={16} />
                                </Link>

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
};

export default CrazyDeals;