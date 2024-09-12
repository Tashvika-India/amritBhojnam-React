import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import "./assets/style/index.scss";
import "./assets/style/main.scss";
import 'primeicons/primeicons.css';
import './assets/style/theme.scss';


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
