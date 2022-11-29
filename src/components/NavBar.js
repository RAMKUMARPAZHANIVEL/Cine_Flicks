import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));

const Nav = () => {
  const navigate = useNavigate();
  const searchInput = (e) => {
    const query = e.target.value;
    console.log(e);
    console.log(query);
    if (e.code === "Enter") 
        navigate(`/search/?q=${query}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor : "#232629"}} className='nav-bar'>
        <Toolbar>
          <Link to="/">
            <img src="https://cdn-icons-png.flaticon.com/128/440/440597.png" color="white" width={40} height={40} alt="logo"/>
          </Link>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            ml={2}
          >
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              CINEFLICKS
            </Link>
          </Typography>
          <Search className="search-input">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyUp={searchInput}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
