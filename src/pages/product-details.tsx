import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../components/layouts/default-layout';
import { Product } from '../components/product-card';
import Message from '../components/UI/message';
import Rating from '../components/UI/rating';
import RedButton from '../components/UI/red-button';
import { useAppDispatch, useAppSelector } from '../redux';
import { addToCart } from '../redux/cart/cart-slice';
import { getProductById } from '../redux/products/slice-details';
import authAxios from '../utils/auth-axios';
import { setError } from '../utils/error';
import { formatCurrencry, getDate } from '../utils/helper';

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const { product, loading } = useAppSelector((state) => state.productDetail);
  const { userInfo } = useAppSelector((state) => state.login);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [refresh, setRefresh] = useState<boolean>(false);

  const onAdd = () => {
    dispatch(addToCart(product as Product));
    //addToCart(product as Product);
    navigate('/cart');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review = {
      comment,
      rating,
    };
    authAxios
      .post(`/products/${product?._id}/reviews`, review)
      .then((res) => {
        toast.success('thank you for the feedback');
        setRefresh((prev) => (prev = !prev));
      })
      .catch((err) => toast.error(setError(err)));
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch, refresh]);

  if (loading || !product) return <p>Loading...</p>;

  return (
    <DefaultLayout title={product.name}>
      <Container>
        <Row>
          <Col md={7}>
            <Card className='shadow'>
              <Image
                className=' p-2'
                rounded
                src={product?.image}
                style={{ width: '600px', height: '100%' }}
              />
            </Card>
          </Col>
          <Col md={5}>
            <ListGroup variant='flush' className='shadow p-5 bg-white rounded'>
              <ListGroup.Item>
                <h2>{product?.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                {' '}
                <h5 className=' d-flex justify-content-between align-items-center'>
                  <span>Price:</span>
                  <span>{formatCurrencry(product.price)}</span>
                </h5>
              </ListGroup.Item>

              <ListGroup.Item>
                <h5 className=' d-flex justify-content-between align-items-center'>
                  <span>Category:</span>
                  <span>{product.category}</span>
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <h5 className=' d-flex justify-content-between align-items-center'>
                  <span>Brand:</span>
                  <span>{product.brand}</span>
                </h5>
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
              <ListGroup.Item>
                <RedButton onClick={onAdd} className='w-full'>
                  Add To Cart
                </RedButton>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col md={7}>
            <Card>
              <Card.Body>
                <h3 style={{ color: '#e03a3c' }}>Reviews</h3>
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <div className='d-flex'>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{getDate(review.createdAt)}</p>
                      </div>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <ListGroup className='bg-white p-3'>
              <ListGroup.Item>
                <h3 style={{ color: '#e03a3c' }}>Feedback</h3>
                {userInfo ? (
                  <Form onSubmit={onSubmit}>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        required
                        onChange={(e: any) => setRating(e.target.value)}
                        as='select'
                      >
                        <option value={1}>⭐</option>
                        <option value={2}>⭐⭐</option>
                        <option value={3}>⭐⭐⭐</option>
                        <option value={4}>⭐⭐⭐⭐</option>
                        <option value={5}>⭐⭐⭐⭐⭐</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        required
                        onChange={(e) => setComment(e.target.value)}
                        as={'textarea'}
                        rows={3}
                      />
                    </Form.Group>
                    <Button
                      style={{ backgroundColor: '#e03a3c', color: '#fff' }}
                      className='mt-2 w-full'
                      variant='outline-none'
                      type='submit'
                    >
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    You must login first to feedback{' '}
                    <Link to='/login' className='ms-2'>
                      Login Now
                    </Link>
                  </Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default ProductDetails;
