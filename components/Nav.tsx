import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "./Link";
import { IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent">
                <Toolbar variant="dense">
                    {/* <IconButton
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        variant="h6"
                        color="primary"
                        component={Link}
                        href="/"
                        noLinkStyle
                        sx={{ flexGrow: 1 }}
                    >
                        Cofactr
                    </Typography>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="settings"
                        color="inherit"
                        component={Link}
                        href="/settings"
                        noLinkStyle
                    >
                        <Settings />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Nav;
