import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/Menu.css';
import DutifyMark from "../images/dutifymark.svg"
import Avatar from "../images/avatar.svg"
import Burger from "../images/burger.svg"

interface MenuProps {
  onMenuClick: (menu: string) => void;
  selectedMenu: string;
  isMobile: boolean;
  isSmallScreen: boolean;
}

const Menu: React.FC<MenuProps> = ({ onMenuClick, selectedMenu, isMobile, isSmallScreen }) => {
  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    if (isMobile) {
      setToggle(false)
    }
  }, [isMobile])

  return (
    <Box className="menu-container" sx={{
      position: isMobile ? 'fixed' : '',
      width: isMobile ? '100%' : isSmallScreen ? 200 : 304,
      minWidth: isMobile ? '100%' : isSmallScreen ? 200 : 304,
      px: 2,
      py: isMobile ? 2 : 3,
      transition: 'all 0.5s',
      height: !isMobile ? '100vh' : toggle ? 317 : 64,
      overflow: 'hidden',
      boxShadow: isMobile && toggle ? '0px 2px 8px 0px rgba(24, 28, 48, 0.1)' : '',
      backgroundColor: toggle ? 'white' : ''
    }} gap={isMobile ? 6 : 4.5}>
      <Box ml={isMobile ? 0 : 0.5} display='flex' justifyContent='space-between'>
        <Box height={32} display='flex' alignItems='center'>
          <img src={DutifyMark} width='105px' alt="Logo" />
        </Box>
        { isMobile && <Box height={32} display='flex' alignItems='center' sx={{
          cursor: 'pointer'
        }} onClick={() => setToggle(!toggle)}>
          <img src={Burger} />
        </Box>}
      </Box >
      {(!isMobile || toggle) && <Box display='flex' flexDirection='column' gap={isMobile ? 4 : 3.5} sx={{ mb: 4 }}>
        <Box display='flex' mb={isMobile ? 2 : 0}>
          <img src={Avatar} />
          <Typography variant={isMobile ? 'body2' : 'body1'} ml={0.5}>Username</Typography>
        </Box>
        <Typography variant={isMobile ? 'h3' : 'h6'}
          color={selectedMenu === 'Calls' ? "primary.main" : ''}
          sx={{ cursor: 'pointer', fontWeight: 600 }}
          onClick={() => onMenuClick('Calls')} >Calls</Typography>
        <Typography variant={isMobile ? 'h3' : 'h6'}
          color={selectedMenu === 'Integrations' ? "primary.main" : ''}
          sx={{ cursor: 'pointer' }}
          onClick={() => onMenuClick('Integrations')}>Integrations</Typography>
      </Box>}
    </Box>
  );
};

export default Menu;