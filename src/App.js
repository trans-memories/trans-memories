import { Navigate, Route, Routes } from "react-router-dom";
import "./app.scss"
import { Container } from "react-bootstrap";
import Home from "./views/Home";

function App() {
  return (
    <Container fluid className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Container>
  );
}

export default App;
