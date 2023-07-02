import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Get all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    products,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc Get one product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Public/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Create product
// @route  POST /api/products/:id
// @access Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } =
    req.body;

  const product = new Product({
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
    rating: 0,
    numReviews: 0,
    reviews: [],
    user: req.user._id,
  });
  const createdProduct = await product.save();

  res.json(createdProduct);
});

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, description, brand, category, price, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.image = image || product.image;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc   Add product review
// @route  POST /api/products/:id/reviews
// @access Private
export const addProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;
    product.numReviews = product.reviews.length;

    await product.save();

    res.send({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});
