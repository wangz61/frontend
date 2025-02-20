import * as React from 'react';
import TopNav from './TopNav';
import SideNav from './SideNav';
import { Box } from '@mui/material';
import MainContent from './MainContent';

function Layout() {
  return (
    <>
        <TopNav />
        <Box>
            <SideNav />
            <MainContent />
        </Box>
    </>
  );
}

export default Layout;
