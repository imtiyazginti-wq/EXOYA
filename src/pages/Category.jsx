import { Link } from "react-router-dom"
import React from 'react'

import sportsImage from "../assets/category/sports.jpg";
import accessoriesImage from "../assets/category/accessories.jpg";
import beautyImage from "../assets/category/beauty.png";
import booksImage from "../assets/category/books-instrument.jpg";
import electronicsImage from "../assets/category/electronics.jpg";
import fashionImage from "../assets/category/fashion.jpg";
import groceryImage from "../assets/category/grocery.jpg";
import homeLivingImage from "../assets/category/home-living.jpg";
import toysKidsImage from "../assets/category/toys-kids.jpg";

import "./Category.css"

const Category = () => {
    return (
        <section className="category-page">
            <div className="category-container">
                <div className="category-heading">
                    <span>EXOYA COLLECTION</span>
                    <h1>Explore Categories</h1>
                    <p>Discover everything you need in a one place..</p>
                </div>

                <div className="category-grid">

                    <Link to="/shop/sports" className="category-card">
                        <img src={sportsImage} alt="Sports" />
                        <div className="category-card-content">
                            <h2>Sports</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                    <Link to="/shop/accessories" className="category-card">
                        <img src={accessoriesImage} alt="Accessories" />
                        <div className="category-card-content">
                            <h2>Accessories</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                    <Link to="/shop/beauty" className="category-card">
                        <img src={beautyImage} alt="Beauty" />
                        <div className="category-card-content">
                            <h2>Beauty</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                    <Link to="/shop/books-instruments" className="category-card">
                        <img src={booksImage} alt="Books & Instruments" />
                        <div className="category-card-content">
                            <h2>Books & Instruments</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                    <Link to="/shop/electronics" className="category-card">
                        <img src={electronicsImage} alt="Electronics" />
                        <div className="category-card-content">
                            <h2>Electronics</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                    <Link to="/shop/fashion" className="category-card">
                        <img src={fashionImage} alt="Fashion" />
                        <div className="category-card-content">
                            <h2>Fashion</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                    <Link to="/shop/grocery" className="category-card">
                        <img src={groceryImage} alt="Grocery" />
                        <div className="category-card-content">
                            <h2>Grocery</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                    <Link to="/shop/home-living" className="category-card">
                        <img src={homeLivingImage} alt="Home & Living" />
                        <div className="category-card-content">
                            <h2>Home & Living</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                    <Link to="/shop/toys-kids" className="category-card">
                        <img src={toysKidsImage} alt="Toys & Kids" />
                        <div className="category-card-content">
                            <h2>Toys & Kids</h2>
                            <span>Explore Collection →</span>
                        </div>
                    </Link>

                </div>

            </div>
        </section>
    )
}

export default Category;