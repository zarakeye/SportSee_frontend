/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9DhuKB9oZhy
 */

import Container from "../src/components/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

/**
 * The main application component.
 * @returns {JSX.Element} The main application layout. Includes a container,
 * a header, and a router with a route for the home page.
 */
export default function App() {
  return (
    <>
      <Container>
        <Router>
          <Header />
          <Routes>
            <Route path="/:userId" element={<Home />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}
