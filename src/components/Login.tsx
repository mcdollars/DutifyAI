import React, { useContext, useState } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import '../styles/Login.css';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from "axios";
import AuthContext from "../store/AuthStore";
import EndPointProvider from "../util/EndPointProvider";
import DutifyMark from "../images/dutifymark.svg"
import { useNavigate } from 'react-router-dom';
interface LoginProps {
    onLoginSuccess: () => void;
}

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 14,
        border: '1px solid rgba(24, 28, 48, 0.16)',
        position: 'relative',
        backgroundColor: 'white',
        fontSize: 16,
        width: '100%',
        height: 16,
        padding: 16,
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderColor: 'rgb(185, 121, 249)'
        },
    },
}));

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);
    const authStore = useContext(AuthContext);
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
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
                console.log(response.data, "---------Success Login")
                localStorage.setItem('authToken', token);
                authStore.setToken(token);
                setError(''); // Clear error message
                onLoginSuccess();
                navigate('/call')
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
                mx: 2,
                p: 5,
                px: 2,
                pb: 6
            }} paddingX={{sm: 5}}>
                <Box height={24} display='flex' alignItems='center'>
                    <img src={DutifyMark} alt="Logo" className="login-logo" />
                </Box>
                <Box sx={{ width: '100%' }} display='flex' alignItems='center' flexDirection='column' gap={1}>
                    <Typography variant='h3'>Welcome back!</Typography>
                    <Box sx={{ display: 'flex' }} gap='2px'>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)'
                        }}>Don’t have an account?</Typography>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }} onClick={() => navigate('/signup')}>Sign up now</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: '100%' }} display='flex' flexDirection='column' >
                    <Box sx={{ width: '100%', mb: 2 }}>
                        <Typography variant='body1' sx={{
                            color: 'rgba(24, 28, 48, 0.48)',
                            mb: 0.5
                        }}>
                            Username
                        </Typography>
                        <BootstrapInput
                            inputProps={{
                                style: { border: error && '1px solid rgba(241, 105, 101, 1)' }
                            }}
                            fullWidth onChange={handleUsernameChange} />
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
                    <Box display='flex' visibility={error ? 'visible' : 'hidden'} justifyContent='center'>
                        <Typography variant='body1' sx={{
                            color: 'rgba(241, 105, 101, 1)',
                            marginTop: 1,
                            marginBottom: 1.5,
                            height: 16
                        }}>Wrong username or password</Typography>
                    </Box>
                    <Box sx={{ width: '100%' }} alignItems='center' display='flex' flexDirection='column' gap={1}>
                        <Button variant="contained" color="primary" onClick={login} fullWidth sx={{
                            background: 'rgba(185, 121, 249, 1)',
                            boxShadow: '0px 4px 16px 0px rgba(185, 121, 249, 0.32)',
                            borderRadius: '20px',
                            color: 'white'
                        }}>
                            Log in
                        </Button>
                        <Typography variant='body1' sx={{
                            fontSize: 12,
                            color: 'rgba(24, 28, 48, 0.48)',
                            textDecoration: 'underline'
                        }}>Forgot your password?</Typography>
                    </Box>
                </Box>
            </Grid>
        </Box >
    );
};

export default Login;