import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppSelector } from '../../../redux';
import { useNavigate, useParams } from 'react-router-dom';
import authAxios from '../../../utils/auth-axios';
import toast from 'react-hot-toast';
import { setError } from '../../../utils/error';

type FormValues = {
  name: string;
  image: string;
  category: string;
  brand: string;
  price: number;
  description: string;
};
const ProductUpdate = () => {
  const { products } = useAppSelector((state) => state.productFilter);

  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p._id === id);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    image: Yup.string().required(),
    category: Yup.string().required(),
    brand: Yup.string().required(),
    price: Yup.number().required(),
    description: Yup.string().required(),
  });
  console.log(product);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormValues) => {
    authAxios
      .put(`/products/${product?._id}`, data)
      .then((res) => {
        toast.success('Product has beend updated');
        navigate('/dashboard/product-list');
      })
      .catch((err) => toast.error(setError(err)));
  };

  return (
    <>
      <Row className=' justify-content-center py-6'>
        <Col lg={5} md={6}>
          <Card>
            <h1 className='text-center text-primary my-3'>Update Product</h1>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='product name'
                    {...register('name', {
                      value: product?.name,
                    })}
                    className={errors.name?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.name?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='image url'
                    {...register('image', {
                      value: product?.image,
                    })}
                    className={errors.image?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.image?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='doe'
                    {...register('brand', {
                      value: product?.brand,
                    })}
                    className={errors.brand?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.brand?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='doe'
                    {...register('category', {
                      value: product?.category,
                    })}
                    className={errors.category?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.category?.message}</p>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    placeholder='200'
                    {...register('price', {
                      value: product?.price,
                    })}
                    className={errors.price?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>{errors.price?.message}</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as={'textarea'}
                    rows={3}
                    placeholder='description'
                    {...register('description', {
                      value: product?.description,
                    })}
                    className={errors.description?.message && 'is-invalid'}
                  />
                  <p className='invalid-feedback'>
                    {errors.description?.message}
                  </p>
                </Form.Group>
                <Button type='submit' className='mt-3 w-full text-white'>
                  Ajouter
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductUpdate;
