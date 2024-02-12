import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrencry } from "../utils/helper";
import { ReviewTypes } from "../utils/interfaces";
import ImageLazy from "./UI/lazy-image";

export type Product = {
  _id: number | string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  qty: number;
  createdAt: Date;
  reviews: ReviewTypes[];
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Card
      className="my-3 p-3 rounded"
      style={{
        height: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Link to={`/products/${product._id}`}>
        <ImageLazy
          imageUrl={product.image}
          style={{
            height: "200px",
            width: "250px",
            objectFit: "contain",
          }}
        />

        <Card.Body style={{ textAlign: "center" }}>
          <Card.Title className="mb-4">
            <span className="fs-2">{product.name}</span>
            <br />
            <span className="text-muted">{formatCurrencry(product.price)}</span>
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;
