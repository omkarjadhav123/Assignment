import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Plus } from "react-bootstrap-icons";
import { AuthContext } from "../AuthContext";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { authFetch } = useContext(AuthContext);

  const API_URL = `https://api.escuelajs.co/api/v1/products/${id}`;

  useEffect(() => {
    authFetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id, authFetch]);

  if (!product) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <img
            src={product.images?.[0]}
            alt={product.title}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </Col>
        <Col md={6}>
          <h4>{product.title}</h4>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> {product.category?.name || "Uncategorized"}</p>
          <p><strong>Description:</strong> {product.description || "No description available"}</p>
          <Button
            variant="outline-primary"
            onClick={() => addToCart(product)}
          >
            <Plus size={18} /> Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;