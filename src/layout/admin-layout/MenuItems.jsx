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
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BadgeIcon from '@mui/icons-material/Badge';

function MenuItems() {
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const location = useLocation();

  const handleCategoryClick = () => {
    setCategoryOpen(!categoryOpen);
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

  // Reduce the icon minWidth
  const listItemIconStyle = {
    minWidth: '30px',
  };

  const listItemTextStyle = {
    fontWeight: '600', 
  };

  React.useEffect(() => {
    if (isActive("/category-one") || isActive("/category-two")) {
      setCategoryOpen(true);
    } else {
      setCategoryOpen(false);
    }
  }, [location.pathname]);

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
            <ListItemText primary="Dashboard"  sx={listItemTextStyle} />
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
          onClick={handleCategoryClick}
          sx={isActive("/category") || categoryOpen ? activeStyles : {}}
        >
          <ListItemIcon sx={listItemIconStyle}>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" sx={listItemTextStyle} />
          {categoryOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/category-one"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                sx={{
                  pl: 4,
                  ...(isActive("/category-one") ? activeColorOnly : {}),
                }}
              >
                <ListItemIcon sx={listItemIconStyle}>
                  <FiberManualRecordIcon fontSize="4x" />
                </ListItemIcon>
                <ListItemText primary="Category One" sx={listItemTextStyle} />
              </ListItemButton>
            </Link>
            <Link
              to="/category-two"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                sx={{
                  pl: 4,
                  ...(isActive("/category-two") ? activeColorOnly : {}),
                }}
              >
                <ListItemIcon sx={listItemIconStyle}>
                  <FiberManualRecordIcon fontSize="4x" />
                </ListItemIcon>
                <ListItemText primary="Category Two" sx={listItemTextStyle} />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Link
          to="/product"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton sx={isActive("/product") ? activeStyles : {}}>
            <ListItemIcon sx={listItemIconStyle}>
              <Inventory2Icon />
            </ListItemIcon>
            <ListItemText primary="Product" sx={listItemTextStyle} />
          </ListItemButton>
        </Link>
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
    </>
  );
}

export default MenuItems;
