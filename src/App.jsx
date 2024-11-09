import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./services/AppRoutes";
import { NotificationContainer } from "./components/ui/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "./redux/productSlices";


function App() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();


  console.log("products" , products);
  useEffect(() => {
    dispatch(fetchProducts());
}, [dispatch]);

  return (
    <div>
      <NotificationContainer />
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
