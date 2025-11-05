import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/produ")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-5">
      <h5 className="text-center mb-4">Home</h5>
      <div className="d-flex justify-content-center mb-5">
        <Form.Control
          type="text"
          placeholder="Search a product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-50 text-center border-2 rounded-3"
        />
      </div>
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
