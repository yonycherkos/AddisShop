import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { savePaymentMethod } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3'>
          <Form.Label as='legend'>Select Payment Method</Form.Label>
          <Form.Check
            type='radio'
            label='PayPal or Credit Card'
            id='paypal'
            name='paymentMethod'
            value='PayPal'
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          {/* <Form.Check
            type='radio'
            label='Stripe'
            id='strip'
            name='paymentMethod'
            value='Stripe'
            onChange={(e) => setPaymentMethod(e.target.value)}
          /> */}
        </Form.Group>

        <Button variant='primary' type='submit'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
