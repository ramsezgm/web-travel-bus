"use client";

import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './sidebar';
import { usePathname } from 'next/navigation';

const Layout = ({ children }) => {
  const pathname = usePathname();
  const showSidebar = !pathname.includes('/login');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {showSidebar && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
