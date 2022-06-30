import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../components/layouts/default-layout';
import RedButton from '../../components/UI/red-button';
import { useAppDispatch, useAppSelector } from '../../redux';
import { reset } from '../../redux/cart/cart-slice';
import authAxios from '../../utils/auth-axios';
import { setError } from '../../utils/error';
import { formatCurrencry } from '../../utils/helper';

const Checkout = () => {
  const { shippingAddress, cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const taxPrice = itemsPrice * 0.1;

  const shippingPrice = itemsPrice >= 200 ? 0 : 30;

  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const onSubmit = () => {
    const order = {
      totalPrice,
      cartItems,
      shippingAddress,
    };
    authAxios
      .post('/orders', order)
      .then((res) => {
        toast.success('your order has been created');
        dispatch(reset());
        navigate(`/orders/${res.data._id}`);
      })
      .catch((err) => toast.error(setError(err)));
  };

  return (
    <DefaultLayout title='checkout'>
      <Container>
        <Row>
          <Col md={8} className='mb-2'>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h4 className=' justify-content-between d-flex align-items-center'>
                      <span> Address: </span>
                      <span>
                        {shippingAddress?.address} {shippingAddress?.city}{' '}
                        {shippingAddress?.postalCode}
                      </span>
                    </h4>
                  </ListGroup.Item>
                  <h3 className='my-3'>Items</h3>
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id} className=' mb-2'>
                      <Row className='d-flex align-items-center'>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            roundedCircle
                            className='avatar'
                          />
                        </Col>
                        <Col md={6}>{item.name}</Col>
                        <Col>{item?.qty}</Col>

                        <Col>{formatCurrencry(item.price * item.qty)}</Col>
                        <Col></Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='shadow '>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item as='h2'>
                    SubTotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}) item
                  </ListGroup.Item>
                  <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                    <span>Total Price :</span>
                    <span>
                      {formatCurrencry(
                        cartItems.reduce(
                          (acc, item) => acc + item.price * item.qty,
                          0
                        )
                      )}
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                    <span>Tax Price</span>
                    <span>{formatCurrencry(taxPrice)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                    <span>Shipping Price</span>
                    <span>{formatCurrencry(shippingPrice)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                    <span>Total Price</span>
                    <span>{formatCurrencry(totalPrice)}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                    <RedButton
                      onClick={onSubmit}
                      disabled={cartItems.length === 0}
                      className='w-full'
                    >
                      Place order
                    </RedButton>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default Checkout;
