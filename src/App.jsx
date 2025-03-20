import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./services/AppRoutes";
import { NotificationContainer } from "./components/ui/Notification"; 

function App() {

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
