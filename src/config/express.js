import express from "express";
import productRoute from "../routes/products.routes.js";

const expressApp = express();

// middleware
expressApp.use(express.json());

// routes
expressApp.use(productRoute);

export default expressApp;
