import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import "./assets/style/dashboard.scss"; 
import 'primeicons/primeicons.css';
import './assets/style/theme.scss'; 
import './assets/style/web.scss'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 


const theme = createTheme({
  palette: {
    primary: {
      main: "#F26722",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
