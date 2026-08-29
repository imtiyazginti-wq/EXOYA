import CategoryDeals from "../components/deals/CategoryDeals";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";

import { useCart } from "../context/Cartcontext";

import DealsHero from "../components/deals/DealsHero";
import FlashDeals from "../components/deals/FlashDeals";
import CrazyDeals from "../components/deals/CrazyDeals";

import { useWishlist } from "../context/WishlistContext";

import "./shop.css";
import { useState, useEffect } from "react";
import axios from "axios";

// ==========================================
// LIVE BACKEND URL
// ==========================================
//
// IMPORTANT:
// Yahan apna Render backend URL lagana hai.
//
// Example:
// const API_BASE_URL = "https://exoya-backend.onrender.com";
//
// ==========================================

const API_BASE_URL = "https://YOUR-RENDER-BACKEND-URL";

// ==========================================
// IMAGE URL HELPER
// ==========================================
//
// Agar image already full URL hai:
// https://....
// to same URL return karega.
//
// Agar image:
// /assets/fashionimages/fashion1.jpg
// hai,
// to backend URL ke saath combine karega.
//
// Isse Cart / Wishlist mein bhi image URL
// properly kaam karega.
// ==========================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const Shop = () => {
  const { category } = useParams();

  // ==========================================
  // PRODUCTS FROM API
  // ==========================================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // ==========================================
  // GET PRODUCTS FROM BACKEND API
  // ==========================================

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setApiError(false);

        const response = await axios.get(
          `${API_BASE_URL}/api/products`
        );

        console.log("API Products:", response.data);

        // ==========================================
        // IMPORTANT:
        // Product image ko full LIVE URL mein convert
        // kar rahe hain.
        //
        // Is object ko Cart / Wishlist mein bhejne par
        // image valid rahegi.
        // ==========================================

        const productsWithImages = response.data.map((product) => ({
          ...product,
          image: getImageUrl(product.image),
        }));

        setProducts(productsWithImages);

      } catch (error) {
        console.error("Error fetching products:", error);

        setApiError(true);
        setProducts([]);

      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ==========================================
  // PAGINATION
  // ==========================================

  const productsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);

  // ==========================================
  // SCROLL TO TOP WHEN PAGE CHANGES
  // ==========================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  // ==========================================
  // CART
  // ==========================================

  const { addToCart } = useCart();

  // ==========================================
  // WISHLIST
  // ==========================================

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  // ==========================================
  // CATEGORY MAP
  // ==========================================

  const categoryKeyMap = {
    fashion: "fashion",
    electronics: "electronics",
    "home-living": "home-living",
    beauty: "beauty",
    grocery: "grocery",
    sports: "sports",
    "toys-kids": "toys-kids",
    "books-instruments": "books-instruments",
    accessories: "accessories",
    deals: "deals",
  };

  const categoryKey =
    categoryKeyMap[category] || category;

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  let filteredProducts;

  if (!category || category === "all") {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(
      (product) =>
        product.category?.toLowerCase() ===
        categoryKey?.toLowerCase()
    );
  }

  // ==========================================
  // RESET PAGE WHEN CATEGORY CHANGES
  // ==========================================

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // ==========================================
  // PAGINATION CALCULATION
  // ==========================================

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const endIndex =
    startIndex + productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );

  // ==========================================
  // NEXT PAGE
  // ==========================================

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // ==========================================
  // PREVIOUS PAGE
  // ==========================================

  const handlePreview = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // ==========================================
  // CATEGORY TITLE
  // ==========================================

  let categoryTitle = "All Products";

  if (category && category !== "all") {
    categoryTitle = category
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  }

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    // Product mein already full image URL hai.
    // Isliye Cart mein image break nahi hogi.

    addToCart(product);

    console.log(
      `${product.name} added to cart`
    );
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const handleWishlist = (event, product) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="shop-page">

      {/* ================================= */}
      {/* DEALS PAGE */}
      {/* ================================= */}

      {category === "deals" ? (

        <div className="deals-page">

          <DealsHero />

          <FlashDeals />

          <CategoryDeals />

          <CrazyDeals />

        </div>

      ) : (

        <>

          {/* ================================= */}
          {/* SHOP HEADER */}
          {/* ================================= */}

          <div className="shop-header">

            <div>

              <span className="shop-label">
                EXOYA COLLECTION
              </span>

              <h1>
                {categoryTitle}
              </h1>

              <p>
                Discover products curated
                just for you.
              </p>

            </div>

            <span className="product-count">
              {filteredProducts.length} products
            </span>

          </div>

          {/* ================================= */}
          {/* API ERROR */}
          {/* ================================= */}

          {apiError ? (

            <div className="no-products">

              <h2>
                Unable to Load Products
              </h2>

              <p>
                Please check the backend
                connection.
              </p>

            </div>

          ) : loading ? (

            /* ================================= */
            /* LOADING */
            /* ================================= */

            <div className="no-products">

              <h2>
                Loading Products...
              </h2>

              <p>
                Please wait while products are
                being loaded from the API.
              </p>

            </div>

          ) : (

            <>

              {/* ================================= */}
              {/* PRODUCT GRID */}
              {/* ================================= */}

              <div className="product-grid">

                {currentProducts.length > 0 ? (

                  currentProducts.map(
                    (item, index) => (

                      <article
                        className="product-card"
                        key={
                          item.id ??
                          `${item.name}-${index}`
                        }
                      >

                        {/* IMAGE */}

                        <Link
                          to={`/product/${item.id}`}
                          className="product-image-wrapper"
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                            className="product-image"
                            onError={(event) => {
                              console.error(
                                "Product image failed:",
                                item.image
                              );
                            }}
                          />

                          {/* BADGE */}

                          {item.badge && (

                            <span className="product-badge">
                              {item.badge}
                            </span>

                          )}

                          {/* WISHLIST */}

                          <button
                            type="button"
                            className={`wishlist-btn ${isWishlisted(item.id)
                              ? "wishlist-active"
                              : ""
                              }`}
                            onClick={(event) =>
                              handleWishlist(
                                event,
                                item
                              )
                            }
                            aria-label={
                              isWishlisted(item.id)
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                          >

                            <Heart
                              size={19}
                              fill={
                                isWishlisted(item.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />

                          </button>

                        </Link>

                        {/* PRODUCT CONTENT */}

                        <div className="product-content">

                          <span className="product-category">
                            {item.category}
                          </span>

                          <Link
                            to={`/product/${item.id}`}
                            className="product-name-link"
                          >

                            <h2>
                              {item.name}
                            </h2>

                          </Link>

                          {/* RATING */}

                          <div className="product-rating-row">

                            <span className="rating-box">

                              <span className="star">
                                ★
                              </span>

                              {item.rating || "0.0"}

                            </span>

                            <span className="review-count">
                              ({item.reviews || 0})
                            </span>

                          </div>

                          {/* PRICE */}

                          <div className="product-price-row">

                            <span className="current-price">

                              ₹
                              {Number(
                                item.price || 0
                              ).toLocaleString(
                                "en-IN"
                              )}

                            </span>

                            {item.oldPrice && (

                              <span className="old-price">

                                ₹
                                {Number(
                                  item.oldPrice
                                ).toLocaleString(
                                  "en-IN"
                                )}

                              </span>

                            )}

                            {item.oldPrice &&
                              Number(item.oldPrice) >
                              Number(item.price) && (

                                <span className="discount">

                                  {Math.round(
                                    (
                                      (
                                        Number(
                                          item.oldPrice
                                        ) -
                                        Number(
                                          item.price
                                        )
                                      ) /
                                      Number(
                                        item.oldPrice
                                      )
                                    ) * 100
                                  )}

                                  % OFF

                                </span>

                              )}

                          </div>

                          {/* ADD TO CART */}

                          <button
                            type="button"
                            className="shop-add-cart-btn"
                            onClick={(event) =>
                              handleAddToCart(
                                event,
                                item
                              )
                            }
                          >

                            <ShoppingBag
                              size={18}
                            />

                            <span>
                              Add to Cart
                            </span>

                          </button>

                        </div>

                      </article>

                    )
                  )

                ) : (

                  /* ================================= */
                  /* NO PRODUCTS */
                  /* ================================= */

                  <div className="no-products">

                    <h2>
                      No Products Found
                    </h2>

                    <p>
                      There are no products
                      in this category yet.
                    </p>

                  </div>

                )}

              </div>

              {/* ================================= */}
              {/* PAGINATION */}
              {/* ================================= */}

              {filteredProducts.length >
                productsPerPage && (

                  <div className="category-navigation">

                    {/* PREVIOUS */}

                    <button
                      type="button"
                      onClick={handlePreview}
                      disabled={currentPage === 1}
                      className="category-nav-btn preview-btn"
                    >
                      ← Preview
                    </button>

                    {/* PAGE NUMBER */}

                    <span className="category-flow-text">
                      Page {currentPage} / {totalPages}
                    </span>

                    {/* NEXT */}

                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={
                        currentPage === totalPages
                      }
                      className="category-nav-btn next-btn"
                    >
                      Next →
                    </button>

                  </div>

                )}

            </>

          )}

        </>

      )}

    </section>
  );
};

export default Shop;