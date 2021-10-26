import React, { useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import { makeStyles, useTheme } from '@mui/styles';
import { Theme } from '@mui/material';

// Redux
import { useSelector } from 'react-redux';
import { AppState } from '../../../../store';
import { User } from '../../../types/User';

// Hooks
import useAuth from '../../../hooks/useAuth';

const useStyles = makeStyles((theme: Theme) => ({
  menuItemText: {
    fontFamily: theme.typography.fontFamily,
  },
}));

const AccountMenu = (): JSX.Element => {
  // Styles
  const theme = useTheme();
  const classes = useStyles(theme);
  // State
  const user: User = useSelector((state: AppState) => state.userState.user);

  const { logout } = useAuth();

  // Local state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }} src={user.photoURL} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            fontSize: '10pt',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar src={user.photoURL} />
          {' '}
          <text className={classes.menuItemText}>My account</text>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <text className={classes.menuItemText}>Logout</text>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
