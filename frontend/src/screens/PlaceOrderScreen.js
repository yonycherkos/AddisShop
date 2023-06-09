import React from 'react';
import { useSelector } from 'react-redux';
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(cart.itemsPrice * 0.15);
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  );

  const placeOrderHandler = () => {};

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.postalCode}, {shippingAddress.country}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              Method: {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md='1'>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md='6'>{item.name}</Col>
                      <Col md='5'>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <Col md={6}>{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={6}>Shipping</Col>
                  <Col md={6}>{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={6}>Tax</Col>
                  <Col md={6}>{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col md={6}>Total</Col>
                  <Col md={6}>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
