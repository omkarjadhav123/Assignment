import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../AuthContext";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { authFetch } = useContext(AuthContext);

  const API_URL = "https://api.escuelajs.co/api/v1/products";

  useEffect(() => {
    authFetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [authFetch]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-5">
      <h4 className="text-center mb-4 fw-bold">Home</h4>
      <div className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search a product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-50 text-center border-2 rounded-3"
        />
      </div>
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} addToCart={addToCart} />
            </Col>
          ))
        ) : (
          <div className="text-center py-5">
            <h6 className="text-muted">No products found.</h6>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Home;