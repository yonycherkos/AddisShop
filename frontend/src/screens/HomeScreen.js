import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import { getProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { keyword, pageNumber } = useParams('');

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h2>Latest Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container>
          <Row>
            {products.map((product, index) => {
              return (
                <Col key={index} sm={12} md={9} lg={6} xl={3} className='py-3'>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </Container>
      )}
    </div>
  );
};

export default HomeScreen;
