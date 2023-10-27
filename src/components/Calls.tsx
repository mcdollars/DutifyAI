import React from 'react';
import '../styles/Calls.css';
import CallScreen from "./call/CallScreen";
import { Box, Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

type CallsProps = {
    isSmallScreen: boolean
    isMobile: boolean
}

const Calls: React.FC<CallsProps> = ({
    isSmallScreen,
    isMobile
}) => {
    const isSmallerScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(1000))
    return (
        <Box sx={{
            p: 4,
            pr: isSmallerScreen ? 4 : isSmallScreen ? 29 : 42
        }}>
            <CallScreen isMobile={isMobile}/>
        </Box>
    );
};

export default Calls;