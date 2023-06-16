import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Profile } from "./profile";

export const Header = () => {
  return (
    <Box>
      <AppBar position="static" sx={{padding: 1}}>
        <Toolbar>
          <Grid container justifyContent={'space-between'} alignItems={'center'}>
            <Grid item>
              <Link to={'/'}>
                <Typography variant="h3" component="div">
                  YieldGranter
                </Typography>
              </Link>

              <Typography width={450}>
                Permissionless charity protocol where you can farm and donate simultaneously
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant={'outlined'}
                color={'primary'}
                component={Link as any}
                to={'/add-project'}
                sx={{
                  background: 'white',
                  marginRight: '16px',
                  "&:hover": {
                    backgroundColor: 'white',
                  }
                }}
              >
                Apply project
              </Button>

              <Profile />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box width={1024} m={'auto'} mt={4}>
        <Outlet/>
      </Box>
    </Box>
  )
}
