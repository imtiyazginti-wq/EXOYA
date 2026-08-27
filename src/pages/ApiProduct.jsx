import { useEffect, useState } from "react";
import axios from "axios";

const ApiProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const getProducts = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5000/api/products"
                );

                console.log(response.data);

                setProducts(response.data);

            } catch (error) {

                console.log(
                    "Error fetching products:",
                    error
                );

            }

        };

        getProducts();

    }, []);

    return (
        <div>

            <h1>API Products</h1>

            {products.map((product) => (

                <div key={product.id}>

                    <h2>{product.name}</h2>

                    <p>₹{product.price}</p>

                    <img
                        src={product.image}
                        alt={product.name}
                        width="200"
                    />

                </div>

            ))}

        </div>
    );
};

export default ApiProducts;