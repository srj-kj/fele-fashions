import {
  addNewCategory,
  addNewProduct,
  getAllCategory,
  getProduct,
} from "../helper/productHelper.js";


export const addcategory = async (req, res,next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    await addNewCategory(apiKey, req.body);
    res.status(200).json({ message: "category added successfully" });
  } catch (error) {
    next(error);
  }
};

export const category = async (req, res,next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    const categories = await getAllCategory(apiKey);
    res.status(200).json({totalCategories: categories.length, categories});
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res,next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    await addNewProduct(apiKey,req.body);
    res.status(200).json({message: "Product saved successfully"});
  } catch (error) {
    next(error);
  }
};

export const product = async (req, res,next) => {
  try {
    const apiKey = req.headers["x-api-key"];
    const categoryId = req.query?.categoryId;
    const response = await getProduct(apiKey,categoryId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};