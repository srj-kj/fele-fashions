import Category from "../model/categorySchema.js";
import Product from "../model/productSchema.js";

export const addNewCategory = async (apiKey, details) => {
  if (!apiKey || apiKey !== "abcd-efgh-ijlk-1234") {
    const err = { message: "Unauthorized", statusCode: 403 };
    throw err;
  }
  const { categoryId, categoryName } = details;
  const category = await Category.findOne({ categoryName: categoryName });
  console.log(category);
  if (category) {
    const err = { message: "Category Already Exist", statusCode: 400 };
    throw err;
  }
  return await Category.create({ categoryId, categoryName });
};

export const getAllCategory = async (apiKey) => {
  if (!apiKey || apiKey !== "abcd-efgh-ijlk-1234") {
    const err = { message: "Unauthorized", statusCode: 403 };
    throw err;
  }
  const category = await Category.find()
    .select("-_id categoryId categoryName")
    .lean()
    .exec();
  if (!category) {
    const err = { message: "No Results Found", statusCode: 400 };
    throw err;
  }
  return category;
};

export const addNewProduct = async (apiKey, details) => {
  if (!apiKey || apiKey !== "abcd-efgh-ijlk-1234") {
    const err = { message: "Unauthorized", statusCode: 403 };
    throw err;
  }
  console.log(details);
  const { productId, productName, price, productImage, brand, categoryId } =
    details;
  const product = await Product.findOne({ productName: productName });
  if (product) {
    const err = { message: "product Already Exist", statusCode: 400 };
    throw err;
  }
  const newProduct = await Product.create({
    productId,
    productName,
    price,
    productImage,
    brand,
    categoryId,
  });
  return newProduct;
};

export const getProduct = async (apiKey, catId) => {
  if (!apiKey || apiKey !== "abcd-efgh-ijlk-1234") {
    const err = { message: "Unauthorized", statusCode: 400 };
    throw err;
  }
  if (catId) {
    const product = await Category.aggregate([
      {
        $match: {
          categoryId: parseInt(catId),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
          "products._id": 0,
          "products.__v": 0,
          "products.categoryId":0
        },
      },
    ]);

    if (product.length == 0) {
      const err = { message: "No items found", statusCode: 400 };
      throw err;
    }

    return product;
  } else {
    const err = { message: "Categoty id not found", statusCode: 400 };
    throw err;
  }
};
