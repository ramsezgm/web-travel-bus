import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer, Toolbar, Typography, Divider, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RouteIcon from '@mui/icons-material/Route';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logout } from '../services/authService';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/auth'); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const getLinkStyle = (path) => {
    return router.pathname === path
      ? {
          backgroundColor: '#fff',
          color: '#162B4E',
          marginBottom: 3,
          borderRadius: 2,
          transition: 'all 0.3s ease-in-out',
          '&:hover': { backgroundColor: '#fff', color: '#162B4E' },
        }
      : {
          marginBottom: 3,
          borderRadius: 2,
          transition: 'all 0.3s ease-in-out',
          '&:hover': { backgroundColor: '#fff', color: '#162B4E' },
        };
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: 240, 
          boxSizing: 'border-box',
          backgroundColor: '#162B4E',
          color: '#fff',
          paddingTop: '10px',
        },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: '#fff' }} />
      <List sx={{ padding: '10px 0' }}>
        <Link href="/dashboard" passHref>
          <ListItem disablePadding>
            <ListItemButton sx={getLinkStyle('/dashboard')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Inicio" sx={{ color: 'inherit' }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/dashboard/routes" passHref>
          <ListItem disablePadding>
            <ListItemButton sx={getLinkStyle('/dashboard/routes')}>
              <ListItemIcon>
                <RouteIcon sx={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Rutas" sx={{ color: 'inherit' }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/dashboard/users" passHref>
          <ListItem disablePadding>
            <ListItemButton sx={getLinkStyle('/dashboard/users')}>
              <ListItemIcon>
                <PeopleIcon sx={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Usuarios" sx={{ color: 'inherit' }} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/dashboard/profile" passHref>
          <ListItem disablePadding>
            <ListItemButton sx={getLinkStyle('/dashboard/profile')}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: 'inherit' }} />
              </ListItemIcon>
              <ListItemText primary="Perfil" sx={{ color: 'inherit' }} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ borderColor: '#fff' }} />
      <ListItem disablePadding sx={{ padding: '10px 0' }} onClick={handleLogout}>
        <ListItemButton sx={getLinkStyle('/logout')}>
          <ListItemIcon>
            <ExitToAppIcon sx={{ color: 'inherit' }} />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" sx={{ color: 'inherit' }} />
        </ListItemButton>
      </ListItem>
    </Drawer>
  );
};

export default Sidebar;
