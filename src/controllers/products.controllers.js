import { deleteImage, uploadImage } from "../config/cloudinary.js";
import ProductModel from "../schemas/product.schema.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.send(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    // console.log(req.files);
    const { name, description, price } = req.body;

    const newProduct = ProductModel({
      name,
      description,
      price,
    });

    if (req.files?.image) {
      const res = await uploadImage(req.files.image.tempFilePath);
      // console.log(res);
      newProduct.image = {
        public_id: res.public_id,
        secure_url: res.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    await newProduct.save();
    res.send(newProduct);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({
        message: "Product's id does not exits",
      });
    res.send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({
        message: "Product's id does not exits",
      });
    // console.log(product);
    if (product.image?.public_id) {
      await deleteImage(product.image.public_id);
    }

    res.send();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product)
      return res.status(404).json({
        message: "Product's id does not exits",
      });
    res.send(product);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
