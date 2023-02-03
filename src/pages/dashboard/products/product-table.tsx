import { useEffect, useState } from 'react';
import { Button, Image, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import ProductModal from '../../../components/modals/product-modal';
import Loader from '../../../components/UI/loader';
import Paginate from '../../../components/UI/paginate';
import TableContainer from '../../../components/UI/table-contrainer';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { getFilterProducts } from '../../../redux/products/search-list';
import authAxios from '../../../utils/auth-axios';
import { setError } from '../../../utils/error';
import { formatCurrencry, getDate } from '../../../utils/helper';

// Then, use it in a component.
function ProductTable() {
  const dispatch = useAppDispatch();
  const { products, page, pages, loading } = useAppSelector(
    (state) => state.productFilter
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  const cols = [
    'image',
    'name',
    'brand',
    'category',
    'price',
    'created At',
    'options',
  ];

  const onDelete = (id: string | number) => {
    if (window.confirm('are you sure?')) {
      authAxios
        .delete(`/products/${id}`)
        .then((res) => {
          toast.success('Product has beend deleted');
          setRefresh((prev) => (prev = !prev));
        })
        .catch((e) => toast.error(setError(e)));
    }
  };

  useEffect(() => {
    dispatch(getFilterProducts({ n: pageNumber, b: '', c: '', q: '' }));
  }, [dispatch, pageNumber, refresh]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Row className='py-3'>
          <h3 className='d-flex justify-content-between align-items-center'>
            <span>Product List</span>
            <Button
              style={{ backgroundColor: '#e03a3c', color: '#fff' }}
              variant='outline-none'
              onClick={onOpen}
              size='sm'
            >
              Add Product
            </Button>
          </h3>
          <TableContainer cols={cols}>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <Image className='avatar' roundedCircle src={product.image} />
                </td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{formatCurrencry(product.price)}</td>
                <td>{getDate(product?.createdAt)}</td>
                <td>
                  <Link
                    className='btn btn-sm btn-primary me-2'
                    to={`/dashboard/product-edit/${product._id}`}
                  >
                    <FaEdit />
                  </Link>
                  <Button
                    onClick={() => onDelete(product._id)}
                    variant='danger'
                    size='sm'
                  >
                    <FaTrash />
                  </Button>
                </td>
                {/* <td>{product?.created_at}</td> */}
              </tr>
            ))}
          </TableContainer>
        </Row>
      )}
      <Paginate pages={pages} page={page} isAdmin={true} keyword={''} />
      <ProductModal setRefresh={setRefresh} show={show} handleClose={onClose} />
    </>
  );
}

export default ProductTable;
