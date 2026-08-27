import { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
    const [product, setproduct] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/product"
                );
                console.log(response.data);

                setproduct(response.data);
            } catch (error) {
                console.log("Error..")
            }
        };
        getProduct();
    }, []);

    return (
        <div>
            <h2>Products</h2>

            {product.map((product) => (
                <div key={product.id}>

                    {/* API SE IMAGE KO RENDER  */}

                    <img src={product.image} alt={product.name} width="200" />

                    <h2>{product.name}</h2>
                    <p>$ {product.price}</p>
                    <p> {product.category}</p>
                    <p>Rating:{product.rating}</p>
                </div>
            ))}

        </div>
    );
};