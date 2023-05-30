import React from 'react';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </a>

      <Card.Body>
        <Card.Title as='div'>
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text as='div'>
          {product.rating} from {product.numReviews} reviews
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
