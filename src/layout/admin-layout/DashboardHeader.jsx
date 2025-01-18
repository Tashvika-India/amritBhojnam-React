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
import { IoIosArrowDown } from "react-icons/io";
import { VscBellDot } from "react-icons/vsc";
import {
  List,
  ListItem,
  ListItemText,
  Badge,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const openNotificationsMenu = Boolean(anchorElNotifications);

  const handleNotificationsClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };

  const notifications = [
    { id: 1, text: "A Ticket Has Been Raised.", time: "3 months ago" },
    { id: 2, text: "A Ticket Has Been Raised.", time: "3 months ago" },
    { id: 3, text: "A Ticket Has Been Raised.", time: "3 months ago" },
    { id: 4, text: "A Ticket Has Been Raised.", time: "3 months ago" },
    { id: 5, text: "A Ticket Has Been Raised.", time: "3 months ago" },
    { id: 6, text: "A Ticket Has Been Raised.", time: "3 months ago" },
  ];

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
      localStorage.removeItem("admin");

      localStorage.clear();

      setLoading(false);
      navigate("/admin/login");
    }, 1000);
  };


  return (<>
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
        <div className="d-flex me-1 align-items-center gap-1 pe-2">
          <div className="admin-header-notifications me-2  bg-yellow rounded-2 p-1 me-4">
            <IconButton onClick={handleNotificationsClick} color="inherit">
              <Badge badgeContent={notifications.length} color="error">
                <VscBellDot className="text-white fs-4" />
              </Badge>
            </IconButton>
            {/* <div className="admin-header-notification"> */}
            <Menu
              anchorEl={anchorElNotifications}
              open={openNotificationsMenu}
              onClose={handleNotificationsClose}
              PaperProps={{
                style: { width: 300 },
              }}
            >

              {/* </div> */}
              <Typography className="text-center" variant="h6" sx={{ padding: 1 }}>
                Notifications
              </Typography>
              <Divider />
              <List>
                {notifications.map((notification) => (
                  <ListItem key={notification.id} divider>
                    <ListItemText
                      primary={notification.text}
                      secondary={notification.time}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <MenuItem onClick={handleNotificationsClose}>
                <Typography color="primary" className="mx-auto">View More...</Typography>
              </MenuItem>
            </Menu>
          </div>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt="Avatar" src="your-avatar-url.png" />
          </IconButton>
          <button onClick={handleClick}
            className="ps-0 cursor-pointer border-0 bg-transparent d-inline-flex align-items-center gap-2"
          >
            <div className="ms-1 text-start"> 
            <p className="m-0 p-0 fb-fb-14 fw-500">Arun Kumar</p>
              <span className="m-0 text-secondary">Admin</span>
            </div>
            <div className="d-flex gap-5">
              <IoIosArrowDown color="#F26722" />
            </div>
          </button>
        </div>
      </Toolbar>
    </AppBar>
    <Menu
      id="fade-menu"
      MenuListProps={{ "aria-labelledby": "fade-button" }}
      anchorEl={anchorEl}
      open={openMenu}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
    <MenuItem onClick={handleClose}>My account</MenuItem> */}
      <MenuItem onClick={handleLogout} disabled={loading}>{loading ? "Logging out..." : "Logout"}</MenuItem>
    </Menu>
  </>

  );
}
