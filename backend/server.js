// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 3000;
const { request, response } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { DB_URI } = process.env;
const Product = require("./models/product");
const productsData = require("./data/products.json");

//Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

//Coneect to the database
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });

// Routes
server.get("/", (request, response) => {
  response.send("Live");
});

// Get products from database
server.get("/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Add new product
server.post("/add-products", async (request, response) => {
  const { productName, brand, price, image } = request.body;
  const newProduct = new Product({
    productName,
    brand,
    price,
    image,
  });
  try {
    await newProduct.save();
    response.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Delete product
server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  try {
    await Product.findByIdAndDelete(id);
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

// Update product
server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const { productName, brand, price, image } = request.body;
  try {
    await Product.findByIdAndUpdate(id, {
      productName,
      brand,
      price,
      image,
    });
    response.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});
