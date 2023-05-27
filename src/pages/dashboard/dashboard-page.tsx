import { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux";
import { getOrdersList } from "../../redux/orders/slice-list";
import { formatCurrencry } from "../../utils/helper";

const DashboardPage = () => {
  const { total } = useAppSelector((state) => state.productFilter);
  const { orders } = useAppSelector((state) => state.orders);
  const { users } = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();

  const getTotalCost = () => {
    let total = 0;
    if (!orders) return 500.3;
    orders.map((item: any) => {
      if (!item) return;
      total += item.totalPrice;
    });
    return total;
  };

  const totalPrice = getTotalCost();

  useEffect(() => {
    dispatch(getOrdersList());
  }, [dispatch]);

  return (
    <Row className="g-6 my-6">
      <Col md={4}>
        <Card className=" shadow border-0">
          <Card.Body>
            <Row>
              <Col>
                <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                  Price
                </span>
                <span className="h3 font-bold mb-0">
                  {formatCurrencry(totalPrice)}
                </span>
              </Col>
              <div className="col-auto">
                <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                  <i className="bi bi-credit-card" />
                </div>
              </div>
            </Row>
            <div className="mt-2 mb-0 text-sm">
              <span className="badge badge-pill bg-soft-success text-success me-2">
                <i className="bi bi-arrow-up me-1" />
                13%
              </span>
              <span className="text-nowrap text-xs text-muted">
                Depuis le mois dernier
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className=" shadow border-0">
          <Card.Body>
            <Row>
              <Col>
                <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                  Clients
                </span>
                <span className="h3 font-bold mb-0">
                  {users?.length && users?.length}
                </span>
              </Col>
              <div className="col-auto">
                <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                  <i className="bi bi-people" />
                </div>
              </div>
            </Row>
            <div className="mt-2 mb-0 text-sm">
              <span className="badge badge-pill bg-soft-success text-success me-2">
                <i className="bi bi-arrow-up me-1" />
                30%
              </span>
              <span className="text-nowrap text-xs text-muted">
                Depuis le mois dernier
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className=" shadow border-0">
          <Card.Body>
            <Row>
              <Col>
                <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                  Products
                </span>
                <span className="h3 font-bold mb-0">{total}</span>
              </Col>
              <div className="col-auto">
                <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                  <i className="bi bi-clock-history" />
                </div>
              </div>
            </Row>
            <div className="mt-2 mb-0 text-sm">
              <span className="badge badge-pill bg-soft-danger text-danger me-2">
                <i className="bi bi-arrow-down me-1" />
                -5%
              </span>
              <span className="text-nowrap text-xs text-muted">
                Depuis le mois dernier
              </span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardPage;
