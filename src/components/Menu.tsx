import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/Menu.css';
import DutifyMark from "../images/dutifymark.svg"
import Avatar from "../images/avatar.svg"

interface MenuProps {
  onMenuClick: (menu: string) => void;
  selectedMenu: string;
}

const Menu: React.FC<MenuProps> = ({ onMenuClick, selectedMenu }) => {
  return (
    <Box className="menu-container" sx={{
      px: 2,
      py: 3
    }} gap={4.5}>
      <Box ml={0.5}>
        <img src={DutifyMark} alt="Logo" className="login-logo" />
      </Box >
      <Box display='flex' flexDirection='column' gap={3.5} >
        <Box display='flex'>
          <img src={Avatar} />
          <Typography variant='body1' ml={0.5}>Username</Typography>
        </Box>
        <Typography variant='h6'
          color={selectedMenu === 'Calls' ? "primary.main" : ''}
          sx={{ cursor: 'pointer' }}
          onClick={() => onMenuClick('Calls')} >Calls</Typography>
        <Typography variant='h6'
          color={selectedMenu === 'Integrations' ? "primary.main" : ''}
          sx={{ cursor: 'pointer' }}
          onClick={() => onMenuClick('Integrations')}>Integrations</Typography>
      </Box>
    </Box>
  );
};

export default Menu;