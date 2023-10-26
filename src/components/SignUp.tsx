import React, { useContext, useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import { BootstrapInput } from './Login';
import axios from "axios";
import AuthContext from "../store/AuthStore";
import EndPointProvider from "../util/EndPointProvider";
import DutifyMark from "../images/dutifymark.svg"
import { useNavigate } from "react-router-dom"
interface SignUpProps {
    onLoginSuccess: () => void;
}


const SignUp: React.FC = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);
    const authStore = useContext(AuthContext);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const login = async () => {
        let endpoint = EndPointProvider.getEndPoint() + "/auth/login";

        try {
            const response = await axios.post(endpoint, { username, password });
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('authToken', token);
                authStore.setToken(token);
                setError(''); // Clear error message
                // onLoginSuccess();
            }
        } catch (error) {
            setError('Wrong username or password'); // Set error message
            setShake(true); // Trigger shake animation
            setTimeout(() => setShake(false), 500); // Reset shake after 0.5s
            console.error('Login error:', error);
        }
    };

    return (
        <Box className="login-container">
            <Grid flexDirection='column' className={`login-box ${shake ? 'shake' : ''}`} sx={{
                height: 560,
                mx: 2,
                p: 5,
                px: 2,
                pb: 6
            }} paddingX={{ sm: 5 }}>
                <Box height={24} display='flex' alignItems='center'>
                    <img src={DutifyMark} alt="Logo" className="login-logo" />
                </Box>
                <Box sx={{ width: '100%' }} display='flex' alignItems='center' flexDirection='column'>
                    <Typography className="login-header">Let's get started</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)'
                        }}>Already have an account?</Typography>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }} onClick={() => navigate('/login')}>Log in</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '100%' }} display='flex' flexDirection='column' >
                    <Box sx={{ width: '100%', mb: 2 }}>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)',
                            mb: 0.5
                        }}>Username</Typography>
                        <BootstrapInput
                            inputProps={{
                                style: { border: error && '1px solid rgba(241, 105, 101, 1)' }
                            }}
                            fullWidth onChange={handleUsernameChange} />
                    </Box>
                    <Box sx={{ width: '100%', mb: 2 }}>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)',
                            mb: 0.5
                        }}>Email</Typography>
                        <BootstrapInput type='email'
                            inputProps={{
                                style: { border: error && '1px solid rgba(241, 105, 101, 1)' }
                            }}
                            fullWidth onChange={handleEmailChange} />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)',
                            mb: 0.5
                        }}>Password</Typography>
                        <BootstrapInput type='password'
                            inputProps={{
                                style: { border: error && '1px solid rgba(241, 105, 101, 1)' }
                            }} fullWidth onChange={handlePasswordChange} />
                    </Box>
                </Box>
                <Box sx={{ width: '100%' }} alignItems='center' display='flex' flexDirection='column' gap={1}>
                    <Button variant="contained" color="primary" onClick={login} fullWidth sx={{
                        background: 'rgba(185, 121, 249, 1)',
                        boxShadow: '0px 4px 16px 0px rgba(185, 121, 249, 0.32)',
                        borderRadius: '20px',
                        color: 'white'
                    }}>
                        Sign up
                    </Button>
                </Box>
            </Grid>
        </Box >
    );
};

export default SignUp;