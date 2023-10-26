import React, { useContext, useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import { BootstrapInput } from './Login';
import axios from "axios";
import AuthContext from "../store/AuthStore";
import EndPointProvider from "../util/EndPointProvider";
import DutifyMark from "../images/dutifymark.svg"
import { useNavigate } from "react-router-dom"

const Signed: React.FC = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);
    const authStore = useContext(AuthContext);

    return (
        <Box className="login-container">
            <Grid flexDirection='column' className={`login-box ${shake ? 'shake' : ''}`} sx={{
                height: 288,
                mx: 2,
                p: 5,
                px: 2,
                pb: 6
            }}>
                <Box height={24} display='flex' alignItems='center'>
                    <img src={DutifyMark} alt="Logo" className="login-logo" />
                </Box>
                <Box sx={{ width: '100%' }} display='flex' alignItems='center' flexDirection='column'>
                    <Typography variant='h3'>Thanks for signing up!</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)'
                        }}>Your account has been succesfully created.</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '100%' }} alignItems='center' display='flex' flexDirection='column' gap={1}>
                    <Button variant="contained" color="primary" onClick={() => {}} sx={{
                        background: 'rgba(185, 121, 249, 1)',
                        boxShadow: '0px 4px 16px 0px rgba(185, 121, 249, 0.32)',
                        borderRadius: '20px',
                        color: 'white',
                        width: 298,
                        maxWidth: '100%' 
                    }}>
                        Log in now →
                    </Button>
                </Box>
            </Grid>
        </Box >
    );
};

export default Signed;