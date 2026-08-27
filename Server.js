import express from "express";
import cors from "cors";

import One from "./api-data/One.js";
import One1 from "./api-data/One1.js";
import One2 from "./api-data/One2.js";
import One3 from "./api-data/One3.js";
import One4 from "./api-data/One4.js";

const app = express();

const PORT = 5000;

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());

// ========================================
// STATIC IMAGES
// ========================================

app.use("/assets", express.static("src/assets"));

// ========================================
// ALL PRODUCTS
// ========================================

const products = [...One, ...One1, ...One2, ...One3, ...One4];

// ========================================
// HOME / TEST API
// ========================================

app.get("/", (req, res) => {
  res.json({
    message: "EXOYA API is running",
  });
});

// ========================================
// GET ALL PRODUCTS
// ========================================

app.get("/api/products", (req, res) => {
  res.json(products);
});

// ========================================
// GET SINGLE PRODUCT
// ========================================

app.get("/api/products/:id", (req, res) => {
  const productId = Number(req.params.id);

  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
});

// ========================================
// GET PRODUCTS BY CATEGORY
// ========================================

app.get("/api/products/category/:category", (req, res) => {
  const category = req.params.category.toLowerCase();

  const categoryProducts = products.filter(
    (item) => item.category.toLocaleLowerCase() === category,
  );

  res.json(categoryProducts);
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`EXOYA API Server running on http://localhost:${PORT}`);
});

