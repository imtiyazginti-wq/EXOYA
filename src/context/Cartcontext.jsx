import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

const Cartcontext = createContext(null);

export const CartProvider = ({ children }) => {

    // ========================================
    // LOAD CART FROM LOCAL STORAGE
    // ========================================

    const [cartItems, setCartItems] = useState(() => {

        try {

            const savedCart =
                localStorage.getItem("exoya-cart");

            return savedCart
                ? JSON.parse(savedCart)
                : [];

        } catch (error) {

            console.error(
                "Failed to load cart:",
                error
            );

            return [];

        }

    });

    // ========================================
    // SAVE CART TO LOCAL STORAGE
    // ========================================

    useEffect(() => {

        localStorage.setItem(
            "exoya-cart",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);

    // ========================================
    // ADD TO CART
    // ========================================

    const addToCart = (product) => {

        setCartItems((prevItems) => {

            const existingProduct =
                prevItems.find(
                    (item) =>
                        item.id === product.id
                );

            // PRODUCT ALREADY EXISTS

            if (existingProduct) {

                return prevItems.map((item) => {

                    if (
                        item.id === product.id
                    ) {

                        return {
                            ...item,
                            quantity:
                                item.quantity + 1,
                        };

                    }

                    return item;

                });

            }

            // NEW PRODUCT

            return [
                ...prevItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];

        });

    };

    // ========================================
    // BUY NOW
    // ========================================

    const buyNow = (product) => {

        setCartItems((prevItems) => {

            const existingProduct =
                prevItems.find(
                    (item) =>
                        item.id === product.id
                );

            // PRODUCT ALREADY EXISTS

            if (existingProduct) {

                return prevItems.map((item) => {

                    if (
                        item.id === product.id
                    ) {

                        return {
                            ...item,
                            quantity:
                                item.quantity + 1,
                        };

                    }

                    return item;

                });

            }

            // NEW PRODUCT

            return [
                ...prevItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];

        });

    };

    // ========================================
    // REMOVE PRODUCT
    // ========================================

    const removeFromCart = (productId) => {

        setCartItems((prevItems) =>
            prevItems.filter(
                (item) =>
                    item.id !== productId
            )
        );

    };

    // ========================================
    // INCREASE QUANTITY
    // ========================================

    const increaseQuantity = (productId) => {

        setCartItems((prevItems) =>

            prevItems.map((item) => {

                if (
                    item.id === productId
                ) {

                    return {
                        ...item,
                        quantity:
                            item.quantity + 1,
                    };

                }

                return item;

            })

        );

    };

    // ========================================
    // DECREASE QUANTITY
    // ========================================

    const decreaseQuantity = (productId) => {

        setCartItems((prevItems) =>

            prevItems
                .map((item) => {

                    if (
                        item.id === productId
                    ) {

                        return {
                            ...item,
                            quantity:
                                item.quantity - 1,
                        };

                    }

                    return item;

                })
                .filter(
                    (item) =>
                        item.quantity > 0
                )

        );

    };

    // ========================================
    // CLEAR CART
    // ========================================

    const clearCart = () => {

        setCartItems([]);

    };

    // ========================================
    // CART ITEM COUNT
    // ========================================

    const cartCount = useMemo(() => {

        return cartItems.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    }, [cartItems]);

    // ========================================
    // CART TOTAL
    // ========================================

    const cartTotal = useMemo(() => {

        return cartItems.reduce(
            (total, item) => {

                return (
                    total +
                    Number(item.price || 0) *
                    item.quantity
                );

            },
            0
        );

    }, [cartItems]);

    // ========================================
    // PROVIDER
    // ========================================

    return (

        <Cartcontext.Provider
            value={{

                // PRODUCTS

                cartItems,

                // ACTIONS

                addToCart,
                buyNow,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,

                // CALCULATED VALUES

                cartCount,
                cartTotal,

            }}
        >

            {children}

        </Cartcontext.Provider>

    );

};

// ========================================
// CUSTOM HOOK
// ========================================

export const useCart = () => {

    const context =
        useContext(Cartcontext);

    if (!context) {

        throw new Error(
            "useCart must be used inside CartProvider"
        );

    }

    return context;

};