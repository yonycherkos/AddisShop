import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { getProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductEditScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (!product.name || product._id !== productId || successUpdate) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setBrand(product.brand);
      setCategory(product.category);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, product, productId, successUpdate]);

  const uploadImageHandler = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    uploadImage(formData);
  };

  const uploadImage = async (formData) => {
    try {
      setUploading(true);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedProduct = {
      name,
      image,
      description,
      brand,
      category,
      price: Number(price),
      countInStock: Number(countInStock),
    };
    dispatch(updateProduct(productId, updatedProduct));
  };

  return (
    <div>
      <Button
        className='btn btn-light my-3'
        onClick={() => {
          navigate('/admin/products/');
          dispatch({ type: PRODUCT_UPDATE_RESET });
        }}
      >
        Go Back
      </Button>
      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {successUpdate && (
          <Message variant='success'>Product updated successfully!</Message>
        )}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='image'>
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                required
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.Control
                type='file'
                placeholder='Choose image file'
                onChange={uploadImageHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='description'
                placeholder='Enter description'
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='category'>
              <Form.Label>category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter count in stock'
                value={countInStock}
                required
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Update Product
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
