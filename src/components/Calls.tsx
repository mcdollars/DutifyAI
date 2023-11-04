import React, { useContext, useEffect, useState } from 'react';
import '../styles/Calls.css';
import CallScreen from "./call/CallScreen";
import { Box, Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import EndPointProvider from "../util/EndPointProvider";
import axios from "axios";
import AuthContext from "../store/AuthStore";
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import ClickUpContext from '../store/ClickUpStore';

const Calls: React.FC = () => {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState('Calls');
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(1280))
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isSmallerScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(1000))
  let authStore = useContext(AuthContext);
  let clickUpStore = useContext(ClickUpContext);
  let [userZoomCalls, setUserZoomCalls] = useState([]);
  let [isLoaded, setIsLoaded] = useState(false);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (menu !== "Calls") {
      navigate(`/hub/integration`)
    }
  };

  async function requestRecordings() {
    let endpoint = EndPointProvider.getEndPoint();
    const token = authStore.token;
    return await axios.get(endpoint + "/usercall/all", {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  useEffect(() => {
    if (!clickUpStore.isRequestInProgress) {
      clickUpStore.setIsRequestInProgress(true)
      setIsLoaded(false)
      requestRecordings().then(callRecordings => {
        clickUpStore.setIsRequestInProgress(false)
        setIsLoaded(true);
        if (userZoomCalls.length === 0 && callRecordings.data.length !== 0) {
          setUserZoomCalls(callRecordings.data);
        }
      });
    }
  }, [])

  return (
    <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} >
      <Menu
        onMenuClick={handleMenuClick}
        selectedMenu={activeMenu}
        isMobile={isMobile}
        isSmallScreen={isSmallScreen}
      />
      <Box flexGrow={1} sx={{
        height: '100%',
        minHeight: '100vh',
        bgcolor: isMobile ? 'rgba(185, 121, 249, 0.08)' : ''
      }}>

        <Box sx={{
          p: isMobile ? 2 : 4,
          pr: isMobile ? 2 : isSmallerScreen ? 4 : isSmallScreen ? 29 : 42,
          ml: isMobile ? 0 : isSmallScreen ? '200px' : '304px'
        }}>
          <CallScreen isMobile={isMobile} userZoomCalls={userZoomCalls} isLoaded={isLoaded} />
        </Box>
      </Box>
    </Box>

  );
};

export default Calls;