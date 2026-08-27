import { Link } from "react-router-dom";
import {
    ArrowRight,
    Shirt,
    Smartphone,
    Sparkles,
    ShoppingBasket,
    Dumbbell,
    Home,
} from "lucide-react";

import "./CategoryDeals.css";

const categoryDeals = [
    {
        name: "Fashion",
        slug: "fashion",
        offer: "UP TO 50% OFF",
        text: "Upgrade your style",
        icon: Shirt,
    },
    {
        name: "Electronics",
        slug: "electronics",
        offer: "UP TO 40% OFF",
        text: "Smart deals for you",
        icon: Smartphone,
    },
    {
        name: "Beauty",
        slug: "beauty",
        offer: "UP TO 60% OFF",
        text: "Glow for less",
        icon: Sparkles,
    },
    {
        name: "Grocery",
        slug: "grocery",
        offer: "UP TO 30% OFF",
        text: "Fresh deals everyday",
        icon: ShoppingBasket,
    },
    {
        name: "Sports",
        slug: "sports",
        offer: "UP TO 45% OFF",
        text: "Gear up & save",
        icon: Dumbbell,
    },
    {
        name: "Home & Living",
        slug: "home-living",
        offer: "UP TO 55% OFF",
        text: "Refresh your space",
        icon: Home,
    },
];

const CategoryDeals = () => {
    return (
        <section className="category-deals">
            <div className="category-deals-container">

                {/* HEADER */}
                <div className="category-deals-header">
                    <div>
                        <span className="category-deals-label">
                            EXOYA DEAL ZONE
                        </span>

                        <h2>
                            Deals By Category
                        </h2>

                        <p>
                            Find your favourite products at unbeatable prices.
                        </p>
                    </div>

                    <span className="category-deals-count">
                        06 Categories
                    </span>
                </div>

                {/* DEAL CARDS */}
                <div className="category-deals-grid">

                    {categoryDeals.map((deal) => {
                        const Icon = deal.icon;

                        return (
                            <Link
                                to={`/shop/${deal.slug}`}
                                className="category-deal-card"
                                key={deal.slug}
                            >

                                <div className="category-deal-icon">
                                    <Icon size={28} strokeWidth={1.7} />
                                </div>

                                <div className="category-deal-content">

                                    <span className="category-deal-name">
                                        {deal.name}
                                    </span>

                                    <h3>
                                        {deal.offer}
                                    </h3>

                                    <p>
                                        {deal.text}
                                    </p>

                                    <span className="category-deal-link">
                                        Shop Now
                                        <ArrowRight size={16} />
                                    </span>

                                </div>

                                <div className="category-deal-number">
                                    %
                                </div>

                            </Link>
                        );
                    })}

                </div>

            </div>
        </section>
    );
};

export default CategoryDeals;