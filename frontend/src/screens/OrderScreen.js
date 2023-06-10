import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, ListGroup, Row, Image, Card } from 'react-bootstrap';
import { useParams } from 'react-router';
import { getOrderDetails } from '../actions/orderActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const OrderScreen = () => {
  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!order) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, order, id]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <h1>Order {order.user._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  Method: {order.paymentMethod}
                  {order.isPaid ? (
                    <Message variant='success'>Paid at {order.paidAt}</Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  <ListGroup>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md='1'>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md='6'>{item.name}</Col>
                          <Col md='5'>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Items</Col>
                      <Col md={6}>{order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Shipping</Col>
                      <Col md={6}>{order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Tax</Col>
                      <Col md={6}>{order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Total</Col>
                      <Col md={6}>{order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {error && <Message variant='danger'>{error}</Message>}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
