import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import { getProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <h2>Latest Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product, index) => {
            return (
              <Col key={index} sm={12} md={9} lg={6} xl={3} className='py-3'>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
