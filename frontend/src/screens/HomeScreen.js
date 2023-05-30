import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <div>
      <h2>Latest Products</h2>
      <Row>
        {products.map((product, index) => {
          return (
            <Col key={index} sm={12} md={9} lg={6} xl={3} className='py-3'>
              <Product product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default HomeScreen;
