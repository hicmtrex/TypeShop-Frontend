import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import DefaultLayout from '../../components/layouts/default-layout';
import Loader from '../../components/UI/loader';
import TableContainer from '../../components/UI/table-contrainer';
import { useAppDispatch, useAppSelector } from '../../redux';
import { getUserBydId } from '../../redux/users/user-details';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import authAxios from '../../utils/auth-axios';
import toast from 'react-hot-toast';
import { setError } from '../../utils/error';
import { getUserOrder } from '../../redux/orders/user-orders';
import { formatCurrencry, getDate } from '../../utils/helper';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import { GrView } from 'react-icons/gr';

type FormValues = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.userDetails);
  const { orders, loading: orderLoading } = useAppSelector(
    (state) => state.userOrder
  );

  const { id } = useParams();
  const [refresh, setRefresh] = useState<boolean>(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Confirm Password does not match'
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    const update = {
      name: data.name,
      email: data.email,
      password: data.password === '' ? null : data.password,
    };
    authAxios
      .put(`/users/${user?._id}`, update)
      .then((res) => {
        toast.success('user has been updated');
        setRefresh((prev) => (prev = !prev));
      })
      .catch((err) => toast.error(setError(err)));
  };

  const onDelete = (id: string | number) => {
    if (window.confirm('are you sure?')) {
      authAxios
        .delete(`/orders/${id}`)
        .then((res) => {
          toast.success(res.data);
          setRefresh((prev) => (prev = !prev));
        })
        .catch((e) => toast.error(setError(e)));
    }
  };

  useEffect(() => {
    dispatch(getUserBydId(id));
    dispatch(getUserOrder());
  }, [dispatch, id, refresh]);

  const cols = ['Order id', 'Price', 'Address', 'Paid', 'Date', 'Options'];

  return (
    <DefaultLayout title={`${user?.name} profile`}>
      <Container>
        {loading || !user || orderLoading || !orders ? (
          <Loader />
        ) : (
          <Row>
            
            <Col lg={4} md={5} xs={12}>
              <h2>User Profile</h2>
              <Card>
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId='name'>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        {...register('name', {
                          value: user?.name,
                        })}
                        placeholder='Enter name'
                        className={errors.name?.message && 'is-invalid'}
                      />
                      <p className='invalid-feedback'>{errors.name?.message}</p>
                    </Form.Group>

                    <Form.Group controlId='email'>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        {...register('email', {
                          value: user?.email,
                        })}
                        placeholder='Enter email'
                        className={errors.email?.message && 'is-invalid'}
                      />
                      <p className='invalid-feedback'>
                        {errors.email?.message}
                      </p>
                    </Form.Group>

                    <Form.Group controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        {...register('password')}
                        type='password'
                        placeholder='********'
                        className={errors.password?.message && 'is-invalid'}
                      />
                      <p className='invalid-feedback'>
                        {errors.password?.message}
                      </p>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        {...register('confirmPassword')}
                        type='password'
                        placeholder='********'
                        className={
                          errors.confirmPassword?.message && 'is-invalid'
                        }
                      />
                      <p className='invalid-feedback'>
                        {errors.confirmPassword?.message}
                      </p>
                    </Form.Group>

                    <Button
                      style={{ backgroundColor: '#e03a3c', color: '#fff' }}
                      variant='outline-none'
                      type='submit'
                      className='mt-3 w-full'
                    >
                      Update
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md={7} lg={8}>
              <TableContainer cols={cols}>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>

                    <td>{formatCurrencry(order?.totalPrice)}</td>
                    <td>{order?.shippingAddress?.address}</td>
                    <td>
                      {order.isPaid ? (
                        <FaCheck color='green' />
                      ) : (
                        <FaTimes color='red' />
                      )}
                    </td>
                    <td>{getDate(order?.createdAt)}</td>
                    <td>
                      <Link
                        to={`/orders/${order._id}`}
                        className='btn btn-sm btn-secondary  me-2'
                      >
                        <GrView />
                      </Link>
                      <Button
                        onClick={() => onDelete(order._id)}
                        variant='danger'
                        size='sm'
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </TableContainer>
            </Col>
          </Row>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default Profile;
