import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { BiSolidCategory } from "react-icons/bi";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { IoReceiptSharp } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { FaUserCog } from "react-icons/fa";
import { TbMessageUser } from "react-icons/tb";

function MenuItems() {
  const [openSections, setOpenSections] = React.useState({
    category: false,
    orders: false,
    products: false,
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
    fontWeight: "500",
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
    fontWeight: "500",
    "& .MuiListItemIcon-root": {
      color: "#F26722",
    },
    "&:hover": {
      color: "#F26722",
    },
    fontFamily: "Poppins, sans-serif",
  };

  const listItemIconStyle = {
    minWidth: "1.875rem",
  };

  const listItemTextStyle = {
    fontWeight: "500",
  };

  React.useEffect(() => {
    if (isActive("/admin/category-one") || isActive("/admin/category-two")) {
      setOpenSections((prev) => ({ ...prev, category: true }));
    } else if (isActive("/admin/orders") || isActive("/admin/returns-refunds")) {
      setOpenSections((prev) => ({ ...prev, orders: true }));
    } else if (isActive("/admin/product-list")) {
      setOpenSections((prev) => ({ ...prev, products: true }));
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
          to="/admin/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={isActive("/admin/dashboard") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
      </List>
      <span className="d-inline-block w-100" style={{ border: "0.5px dashed #DADADA" }}></span>
      <Typography
        sx={{ pl: 2, pt: 1, pb: 1 }}
        variant="subtitle2"
        color="textSecondary"
      >
        ITEMS
      </Typography>
      <List>
        <ListItemButton
          onClick={() => handleToggle("category")}
          sx={isActive("/admin/category") || openSections.category ? activeStyles : {}}
        >
          <ListItemIcon sx={listItemIconStyle}>
            <BiSolidCategory fontSize={"1.3rem"} />
          </ListItemIcon>
          <ListItemText primary="Category" sx={listItemTextStyle} />
          {openSections.category ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {renderCollapse("category", [
          { path: "/admin/category", label: "Categories" },
          { path: "/admin/sub-category", label: "Sub Categories" },
        ])}
        <ListItemButton
          onClick={() => handleToggle("products")}
          sx={isActive("/admin/product-list") || openSections.products ? activeStyles : {}}
        >
          <ListItemIcon sx={listItemIconStyle}>
            <BsFillBoxSeamFill fontSize={"1.3rem"} />
          </ListItemIcon>
          <ListItemText primary="Products" sx={listItemTextStyle} />
          {openSections.products ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {renderCollapse("products", [
          { path: "/admin/product", label: "Product List" },
          { path: "/admin/nutrition", label: "Nutrition" },
        ])}
          {/* <ListItemButton
          onClick={() => handleToggle("nutrition")}
          sx={isActive("/admin/category") || openSections.category ? activeStyles : {}}>
          <ListItemIcon sx={listItemIconStyle}>
          <IoNutrition  size={24}/>
          </ListItemIcon>
          <ListItemText primary="Nutrition" sx={listItemTextStyle} />
          {openSections.category ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {renderCollapse("nutrition", [
          { path: "/admin/nutrition", label: "Nutrition" },
          { path: "/admin/nutrition-value", label: "Nutrition Value" },
        ])} */}
        <Link to="/admin/banner" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton sx={isActive("/admin/banner") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <BsImage fontSize={"1.3rem"} />
            </ListItemIcon>
            <ListItemText primary="Banners" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
        <ListItemButton
          onClick={() => handleToggle("orders")}
          sx={isActive("/admin/orders") || openSections.orders ? activeStyles : {}}
        >
          <ListItemIcon sx={listItemIconStyle}>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="Orders" sx={listItemTextStyle} />
          {openSections.orders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {renderCollapse("orders", [
          { path: "/admin/orders", label: "Order List" },
        ])}
        <Link
          to="/admin/coupons"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={isActive("/admin/coupons") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <BiSolidOffer size={23} />
            </ListItemIcon>
            <ListItemText primary="Coupons" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
      </List>
      <span className="d-inline-block w-100" style={{ border: "0.5px dashed #DADADA" }}></span>
      <Typography
        sx={{ pl: 2, pt: 1, pb: 1 }}
        variant="subtitle2"
        color="textSecondary">
        Manage Customers
      </Typography>
      <List>
        <Link
          to="/admin/customers"
          style={{ textDecoration: "none", color: "inherit" }} >
          <ListItemButton sx={isActive("/admin/customers") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
      </List>
      <span className="d-inline-block w-100" style={{ border: "0.5px dashed #DADADA" }}></span>
      <Typography
        sx={{ pl: 2, pt: 1, pb: 1 }}
        variant="subtitle2"
        color="textSecondary">
        Manage Employee
      </Typography>
      <List>
        <Link
          to="/admin/roles"
          style={{ textDecoration: "none", color: "inherit" }}>
          <ListItemButton sx={isActive("/admin/roles") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <FaUserCog size={23} />
            </ListItemIcon>
            <ListItemText primary="Roles" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
      </List>
      <span className="d-inline-block w-100" style={{ border: "0.5px dashed #DADADA" }}></span>
      <Typography
        sx={{ pl: 2, pt: 1, pb: 1 }}
        variant="subtitle2"
        color="textSecondary">
        Business
      </Typography>
      <Link to="/admin/contact" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton sx={isActive("/admin/contact") ? activeStyles : {}}>
          <ListItemIcon sx={listItemIconStyle}>
            <TbMessageUser size={24} />
          </ListItemIcon>
          <ListItemText primary="Contact" sx={listItemTextStyle} />
        </ListItemButton>
      </Link>
      <Link to="/admin/report" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton sx={isActive("/admin/report") ? activeStyles : {}}>
          <ListItemIcon sx={listItemIconStyle}>
            <IoReceiptSharp size={23} />
          </ListItemIcon>
          <ListItemText primary="Reports" sx={listItemTextStyle} />
        </ListItemButton>
      </Link>
    </>
  );
}

export default MenuItems;
