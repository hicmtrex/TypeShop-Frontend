import { useEffect } from 'react';
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../components/layouts/default-layout';
import Loader from '../../components/UI/loader';
import RedButton from '../../components/UI/red-button';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getOrderById } from '../../redux/orders/order-details';
import { formatCurrencry } from '../../utils/helper';
import Stripe from 'react-stripe-checkout';
import authAxios from '../../utils/auth-axios';
import toast from 'react-hot-toast';
import { setError } from '../../utils/error';

const OrderDetails = () => {
  const { order, loading } = useAppSelector((state) => state.orderDetail);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  if (!order)
    return (
      <DefaultLayout>
        <Loader />
      </DefaultLayout>
    );

  const itemsPrice: number = order?.cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const navigate = useNavigate();
  const taxPrice: number = itemsPrice * 0.1;

  const shippingPrice: number = itemsPrice >= 200 ? 0 : 30;

  const totalPrice: number = itemsPrice + taxPrice + shippingPrice;

  const handlePayment = (token: any) => {
    const isPaid = true;

    authAxios
      .post('/orders/stripe', {
        token: token.id,
        amount: order?.totalPrice,
      })
      .then((res) => {
        authAxios.put(`/orders/${order?._id}`).then((res) => {
          toast.success('vous avez été payé merci 😀');
          navigate('/');
        });
      })
      .catch((error) => toast.error(setError(error)));
  };
  const tokenHandler = (token: any) => {
    handlePayment(token);
  };

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  return (
    <DefaultLayout>
      <Container>
        <h2 className='mb-5'>Payment</h2>

        <Row>
          <Col md={8} className='mb-sm-3 mb-2'>
            <Card>
              <Card.Body>
                <h4>Order Summery</h4>
                <ListGroup variant='flush'>
                  {order?.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            roundedCircle
                            className='h-16 w-16'
                          />
                        </Col>
                        <Col md={6} className='d-none d-lg-block'>
                          {item.name}
                        </Col>
                        <Col>{item?.qty}</Col>

                        <Col>{formatCurrencry(item.price * item.qty)}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h2 className='text-center'>Payment</h2>
                <ListGroup variant='flush'>
                  <ListGroup.Item as='h2'>
                    SubTotal (
                    {order?.cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    item
                  </ListGroup.Item>
                  <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
                    <span>Total Price :</span>
                    <span>
                      {formatCurrencry(
                        order?.cartItems.reduce(
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
                  <ListGroup.Item>
                    <h5 className=' d-flex justify-content-between align-items-center'>
                      <span>Total Price</span>
                      <span>{formatCurrencry(totalPrice)}</span>
                    </h5>
                  </ListGroup.Item>
                  {!order?.isPaid && (
                    <ListGroup.Item className='stripe__container'>
                      <Stripe
                        currency='USD'
                        description={`Total Price ${formatCurrencry(
                          order?.totalPrice
                        )}`}
                        name='Type Shop'
                        image='/LogoMakr-6Tit9e.png'
                        stripeKey={import.meta.env.VITE_API_STRIPE}
                        token={tokenHandler}
                      />
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default OrderDetails;
