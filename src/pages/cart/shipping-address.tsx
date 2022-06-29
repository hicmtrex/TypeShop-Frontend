import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../../components/UI/form-container';
import { useAppDispatch, useAppSelector } from '../../redux';
import { saveAddress } from '../../redux/cart/cart-slice';
import { AddressTypes } from '../../utils/interfaces';

const ShippingAddress = () => {
  const { shippingAddress } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState<AddressTypes>({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      saveAddress({
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      })
    );
    navigate('/checkout');
  };

  useEffect(() => {
    if (shippingAddress) return navigate('/checkout');
  }, [shippingAddress]);

  return (
    <FormContainer title='Shipping Address'>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            onChange={onChange}
            name='address'
            placeholder='enter your address'
            required
          />
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            onChange={onChange}
            name='city'
            placeholder='enter your city'
            required
          />
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            onChange={onChange}
            name='postalCode'
            placeholder='enter your postal code'
            required
          />
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            onChange={onChange}
            name='country'
            placeholder='enter your country'
            required
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: '#e03a3c', color: '#fff' }}
          variant='outline-none'
          type='submit'
          className='mt-4 w-full'
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingAddress;
