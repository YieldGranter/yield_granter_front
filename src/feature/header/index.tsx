import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import React from "react";
import {Link, Outlet} from "react-router-dom";
import {Profile} from "./profile";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yield Granter
          </Typography>

          <Link to={'/project'} />

          <Profile />
        </Toolbar>
      </AppBar>

      <Outlet/>
    </Box>
  )
}
