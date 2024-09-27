import React, { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import DashboardHeader from "./DashboardHeader";
import mainLogo from "@/assets/images/dashboard/main-logo.png";
import MenuItems from "./MenuItems";
import { Link } from "react-router-dom";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      padding: "1rem",
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardSidebar({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem("sidebarOpen");
    if (storedState === "false") {
      setOpen(false);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("sidebarOpen", "true");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    localStorage.setItem("sidebarOpen", "false");
  };

  return (
    <div className="dashboard-sidebar">
      <Box sx={{ display: "flex", fontFamily: "Poppins, sans-serif" }}>
        <CssBaseline />
        <DashboardHeader open={open} handleDrawerOpen={handleDrawerOpen} />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
            padding: "1rem",
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader className="d-flex justify-content-between align-items-center mb-3">
            <Link to="/dashboard">  <img src={mainLogo} alt="Logo" style={{ height: "60px" }} /></Link>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <MenuItems />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {children}
        </Main>
      </Box>
    </div>
  );
}
