import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UsersIcon from '@mui/icons-material/Group';
import RolesIcon from '@mui/icons-material/Badge';
import OrdersIcon from '@mui/icons-material/ShoppingCart';
import ProductionsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Link } from 'react-router';

const drawerWidth = 240;

const links = [
  {label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />},
  {label: 'Users', path: '/users', icon: <UsersIcon />},
  {label: 'Roles', path: '/roles', icon: <RolesIcon />},
  {label: 'Orders', path: '/orders', icon: <OrdersIcon />},
  {label: 'Productions', path: '/productions', icon: <ProductionsIcon />}
];

export default function SideNav() {
  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {links.map((text) => (
                <Link to={text.path} key={text.label} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem key={text.label} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {text.icon}
                        </ListItemIcon>
                        <ListItemText primary={text.label} />
                        </ListItemButton>
                    </ListItem>
                </Link>

            ))}
          </List>
        </Box>
      </Drawer>
  );
}
