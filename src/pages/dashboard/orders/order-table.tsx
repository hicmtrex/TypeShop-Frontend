import { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';

import DashboardLayout from '../../../components/layouts/dashboard-layout';
import Loader from '../../../components/UI/loader';
import TableContainer from '../../../components/UI/table-contrainer';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { getOrdersList } from '../../../redux/orders/slice-list';
import authAxios from '../../../utils/auth-axios';
import { setError } from '../../../utils/error';
import { formatCurrencry, getDate } from '../../../utils/helper';

function OrdersTable() {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.orders);
  const [refresh, setRefresh] = useState<boolean>(false);
  const cols = [
    'Order_id',
    'TotalPrice',
    'Address',
    'Status',
    'Created At',
    'Delete',
  ];

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
    dispatch(getOrdersList());
  }, [dispatch, refresh]);

  return (
    <DashboardLayout>
      {loading ? (
        <Loader />
      ) : (
        <Row className='py-3'>
          <h3 className='d-flex justify-content-between align-items-center'>
            <span>Orders List</span>
          </h3>
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
        </Row>
      )}
    </DashboardLayout>
  );
}

export default OrdersTable;
