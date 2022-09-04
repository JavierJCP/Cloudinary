import { Router } from "express";
import fileUpload from "express-fileupload";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "../controllers/products.controllers.js";

const productRoute = Router();

//* EndPoints
productRoute.get("/products", getProducts);

productRoute.post(
  "/products",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createProduct
);

productRoute.patch("/products/:id", updateProduct);

productRoute.delete("/products/:id", deleteProduct);

productRoute.get("/products/:id", getProduct);

export default productRoute;
