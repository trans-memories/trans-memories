import { Container } from "react-bootstrap";
import "./style.css";
import { useEffect } from "react";

function createStars() {
}
export default function StarField() {
  useEffect(() => {
    createStars();
  });
  return (
    <Container id="starfield"></Container>
  );
}
