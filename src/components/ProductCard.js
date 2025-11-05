import React from "react";
import { Card } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product, addToCart = () => {} }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Card
      className="border-0 shadow-sm rounded-4 h-100 product-card"
      style={{ cursor: "pointer" }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="position-relative">
          <Card.Img
            variant="top"
            src={product.images?.[0]}
            alt={product.title}
            className="rounded-top-4"
            style={{ height: "250px", objectFit: "cover" }}
          />
          <span
            className="position-absolute bottom-0 start-0 bg-light px-2 py-1 rounded-end small"
            style={{ fontSize: "12px" }}
          >
            {product.category?.name || "Uncategorized"}
          </span>
        </div>
        <Card.Body>
          <Card.Title className="fs-6 fw-semibold mb-1 text-truncate">
            {product.title}
          </Card.Title>
          <Card.Text className="fw-bold mb-0">{product.price}$</Card.Text>
        </Card.Body>
      </Link>
      <div
        className="position-absolute top-0 end-0 bg-white rounded-circle m-2 d-flex align-items-center justify-content-center shadow-sm"
        style={{ width: "35px", height: "35px", cursor: "pointer" }}
        onClick={handleAddToCart}
      >
        <Plus size={18} />
      </div>
    </Card>
  );
};

export default ProductCard;