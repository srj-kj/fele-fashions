import { Schema, model } from "mongoose";


const categorySchema = new Schema({
    categoryId: {
      type: Number,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
  });

  const Category  = model("categories", categorySchema, "categories");
export default Category ;