import { useParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import { useCart } from "../context/Cartcontext";
import product from "../data/AllProduct";

import "./CategoryPage.css";

const CategoryPage = () => {

    const { category } = useParams();

    // CART CONTEXT

    const { addToCart } = useCart();

    // ADD TO CART

    const handleAddToCart = (product) => {

        addToCart(product);

        console.log(
            `${product.name} added to cart`
        );

    };

    // NORMALIZE CATEGORY

    const normalizeCategory = (value = "") => {

        return value
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[\s_-]+/g, "");

    };

    // FILTER PRODUCTS

    const categoryProducts = product.filter(
        (product) => {

            return (
                normalizeCategory(product.category) ===
                normalizeCategory(category)
            );

        }
    );

    // DEBUG

    console.log("URL Category:", category);

    console.log(
        "Category Products:",
        categoryProducts
    );

    // CATEGORY TITLE

    const categoryTitle = category
        ?.replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase()
        );

    // RETURN

    return (

        <main className="category-page">

            {/* CATEGORY HEADER */}

            <div className="category-header">

                <h1>
                    {categoryTitle}
                </h1>

                <p>
                    {categoryProducts.length} products found
                </p>

            </div>

            {/* NO PRODUCTS */}

            {categoryProducts.length === 0 ? (

                <div className="no-products">

                    <h2>
                        No products found
                    </h2>

                    <p>
                        No products available in this category.
                    </p>

                </div>

            ) : (

                /* PRODUCT GRID */

                <div className="product-grid">

                    {categoryProducts.map(
                        (product, index) => (

                            <article className="product-card" key={product.id ?? index}>

                                {/* PRODUCT IMAGE */}

                                <div className="product-image-wrapper">

                                    <img src={product.image} alt={product.name} className="product-image" />

                                    {/* BADGE */}

                                    {product.badge && (

                                        <span className="product-badge">

                                            {product.badge}

                                        </span>

                                    )}

                                </div>

                                {/* PRODUCT INFO */}

                                <div className="product-info">

                                    {/* CATEGORY */}

                                    <span className="product-category">

                                        {product.category}

                                    </span>

                                    {/* NAME */}

                                    <h2>

                                        {product.name}

                                    </h2>

                                    {/* RATING */}

                                    <div className="product-rating">

                                        ⭐ {product.rating || 0}

                                        {product.reviews && (

                                            <span>

                                                ({product.reviews})

                                            </span>

                                        )}

                                    </div>

                                    {/* PRICE */}

                                    <div className="product-price">

                                        <span className="current-price">

                                            ₹
                                            {Number(
                                                product.price || 0
                                            ).toLocaleString("en-IN")}

                                        </span>

                                        {product.oldPrice && (

                                            <span className="old-price">

                                                ₹
                                                {Number(
                                                    product.oldPrice
                                                ).toLocaleString("en-IN")}

                                            </span>

                                        )}

                                    </div>

                                    {/* ADD TO CART */}

                                    <button type="button" className="add-to-cart-btn" onClick={() =>
                                        handleAddToCart(product)}>

                                        <ShoppingBag size={18} />

                                        <span>
                                            Add to Cart
                                        </span>

                                    </button>


                                </div>

                            </article>

                        )
                    )}

                </div>

            )}

        </main>

    );

};


export default CategoryPage;