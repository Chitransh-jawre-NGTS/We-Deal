import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Categories from "./pages/Categories";
import CategoryDetails from "./pages/CategoryDetails";
import ProductDescription from "../components/ProductDescription";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<CategoryDetails />} />
        <Route path="/product/:category/:productId" element={<ProductDescription />} />
      </Routes>
    </Router>
  );
}

export default App;
