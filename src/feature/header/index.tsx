import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import React from "react";
import {Link, Outlet} from "react-router-dom";
import {Profile} from "./profile";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={'/'}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Yield Granter
            </Typography>
          </Link>

          <Button color={'secondary'} component={Link as any} to={'/add-project'}>
            Apply project
          </Button>

          <Profile />
        </Toolbar>
      </AppBar>

      <Box width={1024} m={'auto'} mt={4}>
        <Outlet/>
      </Box>
    </Box>
  )
}
