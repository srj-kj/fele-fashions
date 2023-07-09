import { Schema, model } from "mongoose";


const productSchema = new Schema({
    productId: {
        type: Number,
        required: true,
      },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Number,
      ref: "Category",
      required: true,
    },
  });

  const Product = model("products", productSchema, "products");
  export default Product;