import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { VscBellDot } from "react-icons/vsc";
import harry from "@/assets/images/dashboard/harry.jpg";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#ffffff",
  color: "#000000",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function DashboardHeader({ open, handleDrawerOpen }) {
  const [loading, setLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);  
    setTimeout(() => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setLoading(false);  
      navigate("/login");
    }, 1000); 
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AMRIT BHOJANAM
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <div className="d-flex me-2 align-items-center gap-3">
            <div className="me-3">
              <VscBellDot className="text-white bg-yellow p-2 rounded"
                size={43}
                 />
            </div>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Avatar" src={harry} />
            </IconButton>
            <div className="ms-1">
            <div className="d-flex gap-5">
            <p className="m-0 fb-fs-14 fw-600">Avatar</p>
            <IoIosArrowDown color="#F26722"/>
            </div>
              
              <span className="m-0 text-secondary">Admin</span>
            </div>
            <div className="ms-1 cursor-pointer" onClick={handleClick}>
              
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout} disabled={loading}>{loading ? "Logging out..." : "Logout"}</MenuItem>
      </Menu>
    </>
  );
}
