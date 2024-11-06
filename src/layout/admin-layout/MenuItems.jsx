import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BadgeIcon from "@mui/icons-material/Badge";
import { FaBox } from "react-icons/fa";
import { HiPhoto } from "react-icons/hi2";

function MenuItems() {
  const [openSections, setOpenSections] = React.useState({
    category: false,
    orders: false,
  });
  const location = useLocation();

  const handleToggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path);

  const activeStyles = {
    backgroundColor: "#FFEDE3",
    color: "#F26722",
    fontWeight: "bold",
    "& .MuiListItemIcon-root": {
      color: "#F26722",
    },
    "&:hover": {
      backgroundColor: "#FFEDE3",
      color: "#F26722",
    },
    fontFamily: "Poppins, sans-serif",
    borderRadius: "12px",
  };

  const activeColorOnly = {
    color: "#F26722",
    fontWeight: "bold",
    "& .MuiListItemIcon-root": {
      color: "#F26722",
    },
    "&:hover": {
      color: "#F26722",
    },
    fontFamily: "Poppins, sans-serif",
  };

  const listItemIconStyle = {
    minWidth: "30px",
  };

  const listItemTextStyle = {
    fontWeight: "600",
  };

  React.useEffect(() => {
    if (isActive("/category-one") || isActive("/category-two")) {
      setOpenSections((prev) => ({ ...prev, category: true }));
    } else if (isActive("/orders") || isActive("/returns-refunds")) {
      setOpenSections((prev) => ({ ...prev, orders: true }));
    }
  }, [location.pathname]);

  const renderCollapse = (section, items) => (
    <Collapse in={openSections[section]} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {items.map(({ path, label }) => (
          <Link
            to={path}
            style={{ textDecoration: "none", color: "inherit" }}
            key={path}
          >
            <ListItemButton
              sx={{
                pl: 4,
                ...(isActive(path) ? activeColorOnly : {}),
              }}
            >
              <ListItemIcon sx={listItemIconStyle}>
                <FiberManualRecordIcon fontSize="4x" />
              </ListItemIcon>
              <ListItemText primary={label} sx={listItemTextStyle} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Collapse>
  );

  return (
    <>
      <List>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={isActive("/dashboard") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
      </List>
      <Divider />
      <Typography
        sx={{ pl: 2, pt: 1, pb: 1 }}
        variant="subtitle2"
        color="textSecondary"
      >
        Items
      </Typography>
      <List>
        <ListItemButton
          onClick={() => handleToggle("category")}
          sx={
            isActive("/category") || openSections.category ? activeStyles : {}
          }
        >
          <ListItemIcon sx={listItemIconStyle}>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" sx={listItemTextStyle} />
          {openSections.category ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {renderCollapse("category", [
          { path: "/category", label: "Category" },
          { path: "/sub-category", label: "Sub Category" },
        ])}

        <Link
          to="/product"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={isActive("/product") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <FaBox />
            </ListItemIcon>
            <ListItemText primary="Products" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
        <ListItemButton
          onClick={() => handleToggle("orders")}
          sx={isActive("/orders") || openSections.orders ? activeStyles : {}}
        >
          <ListItemIcon sx={listItemIconStyle}>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="Orders" sx={listItemTextStyle} />
          {openSections.orders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {renderCollapse("orders", [
          { path: "/orders", label: "Orders" },
          { path: "/returns-refunds", label: "Returns & Refunds" },
        ])}
      </List>
      <Divider />
      <Typography
        sx={{ pl: 2, pt: 1, pb: 1 }}
        variant="subtitle2"
        color="textSecondary"
      >
        Manage Roles
      </Typography>
      <List>
        <Link
          to="/customers"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={isActive("/customers") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
        <Link
          to="/employees"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={isActive("/employees") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <BadgeIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
      </List>
      <Divider />
      <Typography
        sx={{ pl: 2, pt: 1, pb: 1 }}
        variant="subtitle2"
        color="textSecondary"
      >
        Business
      </Typography>
      <Link
          to="/banner"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={isActive("/banner") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
            <HiPhoto size={23} />
            </ListItemIcon>
            <ListItemText primary="Banners" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
    </>
  );
}

export default MenuItems;
