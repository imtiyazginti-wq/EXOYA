import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addToWishlist = (product) => {
        setWishlistItems((prev) => {
            const exists = prev.some(
                (item) => String(item.id) === String(product.id)
            );

            if (exists) {
                return prev;
            }

            return [...prev, product];
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems((prev) =>
            prev.filter(
                (item) => String(item.id) !== String(productId)
            )
        );
    };

    const isWishlisted = (productId) => {
        return wishlistItems.some(
            (item) => String(item.id) === String(productId)
        );
    };

    const toggleWishlist = (product) => {
        if (isWishlisted(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                addToWishlist,
                removeFromWishlist,
                isWishlisted,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(WishlistContext);
};