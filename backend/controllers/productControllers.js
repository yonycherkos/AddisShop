import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Get all products
// @route GET /api/products
// @access public
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Get one product
// @route GET /api/products/:id
// @access public
export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } catch (error) {
    res.status(404);
    throw new Error('Product not found');
  }
});
