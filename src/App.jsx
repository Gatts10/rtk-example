import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Users from "./pages/Users";
import NavbarTabs from "./components/NavbarTabs";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <>
      <NavbarTabs />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="add-user" element={<AddUser />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
