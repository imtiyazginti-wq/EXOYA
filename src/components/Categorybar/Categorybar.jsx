import { NavLink } from "react-router-dom";

import {
    LayoutGrid,
    Shirt,
    Smartphone,
    Home,
    Sparkles,
    ShoppingBasket,
    Dumbbell,
    Baby,
    BookOpen,
    Watch,
    Tag,
} from "lucide-react";

import "./Categorybar.css";

const categories = [
    {
        name: "All",
        slug: "all",
        icon: LayoutGrid,
    },

    {
        name: "Fashion",
        slug: "fashion",
        icon: Shirt,
    },

    {
        name: "Electronics",
        slug: "electronics",
        icon: Smartphone,
    },

    {
        name: "Home & Living",
        slug: "home-living",
        icon: Home,
    },

    {
        name: "Beauty",
        slug: "beauty",
        icon: Sparkles,
    },

    {
        name: "Grocery",
        slug: "grocery",
        icon: ShoppingBasket,
    },

    {
        name: "Sports",
        slug: "sports",
        icon: Dumbbell,
    },

    {
        name: "Toys & Kids",
        slug: "toys-kids",
        icon: Baby,
    },

    {
        name: "Books & Instruments",
        slug: "books-instruments",
        icon: BookOpen,
    },

    {
        name: "Accessories",
        slug: "accessories",
        icon: Watch,
    },

    {
        name: "Deals",
        slug: "deals",
        icon: Tag,
    },
];

const Categorybar = () => {
    return (
        <nav className="category-bar">
            <div className="category-bar-container">

                {categories.map((category) => {
                    const Icon = category.icon;

                    // All Category ke liye special URL
                    const categoryPath =
                        category.slug === "all"
                            ? "/shop/all?all=true"
                            : `/shop/${category.slug}`;

                    return (
                        <NavLink
                            key={category.slug}
                            to={categoryPath}
                            className={({ isActive }) =>
                                `category-link ${isActive ? "active" : ""
                                }`
                            }
                        >
                            <Icon
                                size={17}
                                strokeWidth={1.8}
                            />

                            <span>
                                {category.name}
                            </span>
                        </NavLink>
                    );
                })}

            </div>
        </nav>
    );
};

export default Categorybar;