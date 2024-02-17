import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
} from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../../components/layouts/default-layout";
import Message from "../../components/UI/message";
import { useAppDispatch, useAppSelector } from "../../redux";
import { addToCart, removeFromCart } from "../../redux/cart/cart-slice";
import { formatCurrencry } from "../../utils/helper";
import ImageLazy from "../../components/UI/lazy-image";

const CartPage = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <DefaultLayout title="cart shop">
      <Container>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty
            <Link to="/home" className="mx-3">
              Go Back
            </Link>
          </Message>
        ) : (
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item
                    key={item._id}
                    className="shadow rounded p-5 bg-white mb-2"
                  >
                    <Row className="d-flex align-items-center">
                      <Col md={2}>
                        <ImageLazy
                          imageUrl={item.image}
                          style={{ objectFit: "contain" }}
                          className="h-16 w-16 rounded-5"
                        />
                      </Col>
                      <Col className="d-none d-lg-block">{item.name}</Col>
                      <Col>{item?.qty}</Col>

                      <Col>{formatCurrencry(item.price * item.qty)}</Col>
                      <Col>
                        <FaPlus
                          onClick={() => dispatch(addToCart(item))}
                          size={"1.5rem"}
                          style={{ backgroundColor: "#e03a3c" }}
                          className="icons__cart  m-2 rounded-circle text-white p-1 cursor-pointer"
                        />
                        <FaMinus
                          size={"1.5rem"}
                          style={{ backgroundColor: "#e03a3c" }}
                          className={`icons__cart m-2 rounded-circle text-white p-1 cursor-pointer `}
                          onClick={() => dispatch(removeFromCart(item))}
                        />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card className="shadow ">
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item as="h2">
                      SubTotal (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}) item
                    </ListGroup.Item>
                    <ListGroup.Item className=" d-flex justify-content-between align-items-center">
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
                    <ListGroup.Item className=" d-flex justify-content-between align-items-center">
                      <Button
                        style={{ backgroundColor: "#e03a3c" }}
                        disabled={cartItems.length === 0}
                        onClick={() => navigate("/shipping-address")}
                        className="w-1/2 text-white me-2"
                        variant="outline-none"
                      >
                        Checkout
                      </Button>
                      <Button
                        style={{ backgroundColor: "#e03a3c" }}
                        onClick={() => navigate("/")}
                        className="w-1/2 text-white me-2"
                        variant="outline-none"
                      >
                        Countine
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default CartPage;
