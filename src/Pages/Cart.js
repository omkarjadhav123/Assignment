import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = ({ cart }) => {
  return (
    <Container className="py-5">
      <h4 className="text-center mb-4 fw-bold">Cart</h4>
      {cart.length > 0 ? (
        <Row>
          {cart.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Link to={`/product/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="border p-3 rounded">
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    style={{ height: "150px", objectFit: "cover", width: "100%" }}
                  />
                  <h6 className="mt-2">{item.title}</h6>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <h6 className="text-muted">Your cart is empty.</h6>
        </div>
      )}
    </Container>
  );
};

export default Cart;