/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9DhuKB9oZhy
 */

import Container from "../src/components/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

/**
 * The root component of the app.
 *
 * It contains the main application container, a Router, a Header, and Routes.
 * The Routes component renders a Home component when the URL matches the
 * path "/:userId".
 *
 * @returns {JSX.Element} The root component of the app.
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
