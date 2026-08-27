import { useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import AllProduct from "../../data/AllProduct";
import "./Search.css";

const Search = ({ onClose }) => {
    const [query, setQuery] = useState("");

    const results = query.trim()
        ? AllProduct.filter((product) => {
            const searchText =
                `${product.name} ${product.category}`.toLowerCase();

            return searchText.includes(query.toLowerCase());
        }).slice(0, 6)
        : [];

    const handleProductClick = () => {
        setQuery("");
        onClose();
    };

    return (
        <div className="search-component">

            <div className="search-input-wrapper">

                <SearchIcon size={20} />

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    autoFocus
                />

                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="search-clear-btn"
                    >
                        <X size={17} />
                    </button>
                )}

            </div>

            {/* SEARCH RESULTS */}
            {query.trim() && (
                <div className="search-results">

                    {results.length > 0 ? (
                        results.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="search-result-item"
                                onClick={handleProductClick}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                />

                                <div className="search-result-info">
                                    <h4>{product.name}</h4>

                                    <span>
                                        {product.category}
                                    </span>

                                    <strong>
                                        ₹
                                        {Number(
                                            product.price || 0
                                        ).toLocaleString("en-IN")}
                                    </strong>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="no-search-results">
                            <SearchIcon size={22} />

                            <p>
                                No products found
                            </p>

                            <span>
                                Try another product name
                            </span>
                        </div>
                    )}

                </div>
            )}

        </div>
    );
};

export default Search;