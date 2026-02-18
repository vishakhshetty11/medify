import React, { useState } from "react";
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu,
    Container, Button, MenuItem
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import styles from "./Navbar.module.css"
import { Link } from "react-router-dom";
import MedifyButton from "./Utility/MedifyButton";

const Navbar = () => {
    const pages = ['Find Doctors', 'Hospitals', 'Medicines', 'Surgeries', 'Software Provider', 'Facilities'];
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <div className={styles.mainNavDiv}>
            <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', color: "#000" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box className="menuIcon" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem className={styles.pageName} key={page} onClick={handleCloseNavMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                    </MenuItem>
                                ))}
                                <MenuItem >
                                    <MedifyButton title="My Bookings" />
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Link>
                            <img src="src/assets/Logo.png" alt="Logo" className={styles.logoImage} />
                        </Link>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: "center", gap:"10px" } }}>
                            {pages.map((page) => (
                                <Button className={styles.pageName}
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                            <MedifyButton title="My Bookings" />
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Navbar;