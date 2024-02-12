import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DefaultLayout from "../components/layouts/default-layout";
import ProductCard from "../components/product-card";
import Loader from "../components/UI/loader";
import { useAppDispatch, useAppSelector } from "../redux";
import { getProducts } from "../redux/products/slice-list";
import { trackWindowScroll } from "react-lazy-load-image-component";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.productList);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <Container>
        <h2 style={{ color: "#e03a3c" }} className="mt-3">
          Least Products
        </h2>
        {loading || !products ? (
          <Loader />
        ) : (
          <Row md={3} xs={1} lg={3}>
            {products.map((product) => (
              <Col key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default trackWindowScroll(HomePage);
