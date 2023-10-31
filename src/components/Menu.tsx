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
      height: !isMobile ? '100vh' : toggle ? 360 : 64,
      overflow: 'hidden',
      boxShadow: isMobile && toggle ? '0px 2px 8px 0px rgba(24, 28, 48, 0.1)' : '',
      backgroundColor: toggle ? 'white' : ''
    }} gap={isMobile ? 6 : 4.5}>
      <Box ml={isMobile ? 0 : 0.5} display='flex' justifyContent='space-between'>
        <Box height={32} display='flex' alignItems='center'>
          <img src={DutifyMark} width='105px' alt="Logo" />
        </Box>
        {isMobile && <Box height={32} display='flex' alignItems='center' sx={{
          cursor: 'pointer'
        }} onClick={() => setToggle(!toggle)}>
          <img src={Burger} />
        </Box>}
      </Box >
      {(!isMobile || toggle) && <Box display='flex' flexDirection='column' gap={isMobile ? 4 : 3.5} sx={{ mb: 4 }}>
        <Box display='flex' mb={isMobile ? 2 : 0} py={1} px={0.5} borderRadius={2.5} alignItems='start'
          sx={isMobile ? {} : {
            bgcolor: 'rgba(185, 121, 249, 0.08)'
          }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1.33325C7.34073 1.33325 6.69626 1.52875 6.1481 1.89502C5.59994 2.26129 5.17269 2.78189 4.9204 3.39097C4.66811 4.00006 4.6021 4.67028 4.73072 5.31689C4.85933 5.96349 5.1768 6.55743 5.64298 7.02361C6.10915 7.48978 6.7031 7.80725 7.3497 7.93587C7.9963 8.06449 8.66652 7.99848 9.27561 7.74618C9.8847 7.49389 10.4053 7.06665 10.7716 6.51849C11.1378 5.97032 11.3333 5.32586 11.3333 4.66659C11.3333 3.78253 10.9821 2.93468 10.357 2.30956C9.7319 1.68444 8.88406 1.33325 8 1.33325ZM8 6.66659C7.60444 6.66659 7.21776 6.54929 6.88886 6.32952C6.55996 6.10976 6.30362 5.7974 6.15224 5.43195C6.00087 5.0665 5.96126 4.66437 6.03843 4.2764C6.1156 3.88844 6.30608 3.53208 6.58579 3.25237C6.86549 2.97267 7.22186 2.78219 7.60982 2.70501C7.99778 2.62784 8.39991 2.66745 8.76537 2.81883C9.13082 2.9702 9.44318 3.22655 9.66294 3.55544C9.8827 3.88434 10 4.27102 10 4.66659C10 5.19702 9.78929 5.70573 9.41421 6.0808C9.03914 6.45587 8.53043 6.66659 8 6.66659ZM14 13.9999V13.3333C14 12.0956 13.5083 10.9086 12.6332 10.0334C11.758 9.15825 10.571 8.66659 9.33333 8.66659H6.66667C5.42899 8.66659 4.242 9.15825 3.36683 10.0334C2.49167 10.9086 2 12.0956 2 13.3333V13.9999H3.33333V13.3333C3.33333 12.4492 3.68452 11.6014 4.30964 10.9762C4.93477 10.3511 5.78261 9.99992 6.66667 9.99992H9.33333C10.2174 9.99992 11.0652 10.3511 11.6904 10.9762C12.3155 11.6014 12.6667 12.4492 12.6667 13.3333V13.9999H14Z"
              fill="rgba(185, 121, 249, 1)" />
          </svg>

          <Box ml={0.5}>
            <Typography variant={isMobile ? 'body2' : 'body1'} sx={{
              color: "rgba(185, 121, 249, 1)"
            }}>Username</Typography>
            <Typography variant={isMobile ? 'body2' : 'body1'} maxWidth={120}
              sx={isMobile ? {} : {
                overflowWrap: 'break-word',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }} className='text-wrap'>your-emailllll@gmail.com</Typography>
            <Box display='flex'>
              <Typography variant={isMobile ? 'body2' : 'body1'}>Log out</Typography>
              <Typography variant={isMobile ? 'body2' : 'body1'}>&nbsp;→</Typography>
            </Box>
          </Box>
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