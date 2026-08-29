import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import One from "./api-data/One.js";
import One1 from "./api-data/One1.js";
import One2 from "./api-data/One2.js";
import One3 from "./api-data/One3.js";
import One4 from "./api-data/One4.js";

const app = express();

// ========================================
// PATH SETUP
// ========================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================
// PORT
// ========================================

const PORT = process.env.PORT || 5000;

// ========================================
// MIDDLEWARE
// ========================================

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

// ========================================
// STATIC IMAGES
// ========================================

const assetsPath = path.join(__dirname, "src", "assets");

app.use("/assets", express.static(assetsPath));

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
    products: products.length,
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
  const category = req.params.category.toLowerCase().trim();

  const categoryProducts = products.filter(
    (item) => item.category?.toLowerCase().trim() === category,
  );

  res.json(categoryProducts);
});

// ========================================
// 404
// ========================================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`EXOYA API running on port ${PORT}`);
});
