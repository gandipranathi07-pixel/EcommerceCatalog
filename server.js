const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// HOME ROUTE (IMPORTANT FOR RENDER)
app.get("/", (req, res) => {
  res.send("Ecommerce Catalog API is Running Successfully 🚀");
});

// Sample products route
app.get("/products", (req, res) => {
  res.json([
    {
      name: "Premium Headphones",
      category: "Electronics",
      variants: [
        { sku: "HP-BL-001", color: "Black", price: 199.99, stock: 15 },
        { sku: "HP-WH-001", color: "White", price: 209.99, stock: 8 }
      ],
      avgRating: 5
    }
  ]);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});