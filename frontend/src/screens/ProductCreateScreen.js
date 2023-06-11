import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductCreateScreen = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, success } = productCreate;

  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate('/admin/products');
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
  }, [dispatch, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      image,
      description,
      brand,
      category,
      price: Number(price),
      countInStock: Number(countInStock),
    };
    dispatch(createProduct(newProduct));
  };

  return (
    <div>
      <Link to='/admin/products/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

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
            Create Product
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ProductCreateScreen;
