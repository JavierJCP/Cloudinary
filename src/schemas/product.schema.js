import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, require: true, trim: true, unique: true },
    description: { type: String, trim: true },
    price: { type: Number, default: 0 },
    image: {
      public_id: String,
      secure_url: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model("Product", productSchema);

export default ProductModel;
