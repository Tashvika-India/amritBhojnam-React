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
import { Link } from "react-router-dom";
import orderDelivered from "../../assets/images/dashboard/order-delivered.png";
import { List, ListItem, ListItemText, Badge, Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import notificationIcon from "../../assets/images/dashboard/notification-bag-icon.png";
import notificationBell from "../../assets/images/dashboard/notification-bell.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import coinManagement from "../../assets/images/dashboard/coin-management.png";

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
          <div className="d-flex me-1 align-items-center gap-1 pe-2 py-3">
            <Link to={"/admin/coin-management"}>
              <img
                className="img-fluid me-4"
                src={coinManagement}
                alt="empty-address"
              />
            </Link>
            <div className="admin-header-notifications me-3  bg-yellow rounded-2 p-1 me-4">
              <IconButton onClick={handleNotificationsClick} color="inherit">
                <VscBellDot className="text-white fs-4" />
              </IconButton>
              {/* <div className="admin-header-notification"> */}
              <Menu
                anchorEl={anchorElNotifications}
                open={openNotificationsMenu}
                onClose={handleNotificationsClose}
                PaperProps={{
                  style: { width: 500, maxHeight: "130vh", overflow: "hidden" },
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {/* </div> */}
                <Typography
                  className="d-flex justify-content-between bg-yellow text-white align-items-center py-3"
                  variant="h6"
                  sx={{ padding: 3 }}
                >
                  <p className="fb-fs-14-same mb-0">Notifications</p>
                  <p
                    className="fb-fs-12 mb-0 d-flex align-items-center"
                    style={{ fontSize: "14px" }}
                  >
                    View All <MdKeyboardDoubleArrowRight size={18} />
                  </p>
                </Typography>
                <Divider />
                <List
                  sx={{ padding: 2 }}
                  style={{ maxHeight: "97vh", overflowY: "auto" }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center py-2"
                    style={{ borderBottom: "1px solid #EEEEEE" }}
                  >
                    <ul>
                      <li className="d-flex gap-2 align-items-center">
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={orderDelivered}
                          style={{ maxWidth: "3.5rem" }}
                          alt="star"
                        />
                        <div>
                          <p className="fb-fs-18 fw-600 mb-0">
                            New Order Received
                          </p>
                          <p className="mb-0" style={{ fontSize: "12.2px" }}>
                            Order #7890 placed by Rahul ₹2,49. Payment...
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li style={{ width: "100%" }}>
                        <p
                          className="text-mid-grey mb-0 me-2 w-100"
                          style={{ fontSize: "13px" }}
                        >
                          1 Day ago
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center py-2"
                    style={{ borderBottom: "1px solid #EEEEEE" }}
                  >
                    <ul>
                      <li className="d-flex gap-2 align-items-center">
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={orderDelivered}
                          style={{ maxWidth: "3.5rem" }}
                          alt="star"
                        />
                        <div>
                          <p className="fb-fs-18 fw-600 mb-0">
                            New Order Received
                          </p>
                          <p className="mb-0" style={{ fontSize: "12.2px" }}>
                            Order #7890 placed by Rahul ₹2,49. Payment...
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li style={{ width: "100%" }}>
                        <p
                          className="text-mid-grey mb-0 me-2"
                          style={{ fontSize: "13px" }}
                        >
                          1 Day ago
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center py-2"
                    style={{ borderBottom: "1px solid #EEEEEE" }}
                  >
                    <ul>
                      <li className="d-flex gap-2 align-items-center">
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={notificationIcon}
                          style={{ maxWidth: "3.5rem" }}
                          alt="star"
                        />
                        <div>
                          <p className="fb-fs-18 fw-600 mb-0">
                            New Order Received
                          </p>
                          <p className="mb-0" style={{ fontSize: "12.2px" }}>
                            Order #7890 placed by Rahul ₹2,49. Payment...
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li style={{ width: "100%" }}>
                        <p
                          className="text-mid-grey mb-0 me-2"
                          style={{ fontSize: "13px" }}
                        >
                          1 Day ago
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center py-2"
                    style={{ borderBottom: "1px solid #EEEEEE" }}
                  >
                    <ul>
                      <li className="d-flex gap-2 align-items-center">
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={notificationBell}
                          style={{ maxWidth: "3.5rem" }}
                          alt="star"
                        />
                        <div>
                          <p className="fb-fs-18 fw-600 mb-0">
                            New Order Received
                          </p>
                          <p className="mb-0" style={{ fontSize: "12.2px" }}>
                            Order #7890 placed by Rahul ₹2,49. Payment...
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li style={{ width: "100%" }}>
                        <p
                          className="text-mid-grey mb-0 me-2"
                          style={{ fontSize: "13px" }}
                        >
                          1 Day ago
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center py-2"
                    style={{ borderBottom: "1px solid #EEEEEE" }}
                  >
                    <ul>
                      <li className="d-flex gap-2 align-items-center">
                        <img
                          className="img-fluid mt-1 mx-1"
                          src={orderDelivered}
                          style={{ maxWidth: "3.5rem" }}
                          alt="star"
                        />
                        <div>
                          <p className="fb-fs-18 fw-600 mb-0">
                            New Order Received
                          </p>
                          <p className="mb-0" style={{ fontSize: "12.2px" }}>
                            Order #7890 placed by Rahul ₹2,49. Payment...
                          </p>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li style={{ width: "100%" }}>
                        <p
                          className="text-mid-grey mb-0 me-2 w-100"
                          style={{ fontSize: "13px" }}
                        >
                          1 Day ago
                        </p>
                      </li>
                    </ul>
                  </div>
                </List>
                <Divider />
                <MenuItem onClick={handleNotificationsClose}>
                  <Link
                    to={"/admin/notifications"}
                    color="primary"
                    className="mx-auto text-orange"
                  >
                    View More...{" "}
                  </Link>
                </MenuItem>
              </Menu>
            </div>
            <IconButton sx={{ p: 0 }}>
              <Avatar
                alt="Avatar"
                src="your-avatar-url.png"
                style={{ padding: "1.4rem" }}
              />
            </IconButton>
            <button
              onClick={handleClick}
              className="ps-0 cursor-pointer border-0 bg-transparent d-inline-flex align-items-top gap-5"
            >
              <div className="ms-2 text-start">
                <p className="m-0 p-0 fw-500 fb-fs-14-same lh-normal">
                  Arun Kumar
                </p>
                <span
                  className="m-0 fb-fs-14-same fw-500"
                  style={{ color: "#737791" }}
                >
                  Admin
                </span>
              </div>
              <div className="ms-2 mt-1">
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
        <MenuItem onClick={handleLogout} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </MenuItem>
      </Menu>
    </>
  );
}
