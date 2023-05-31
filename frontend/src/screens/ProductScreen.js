import React from 'react';
import products from '../products';
import { Link, useParams } from 'react-router-dom';
import { Col, Row, Image, ListGroup, Button } from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = () => {
  var { id } = useParams();
  var product = products.find((p) => p._id === id);
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Status: {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant='dark' disabled={product.countInStock === 0}>
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
