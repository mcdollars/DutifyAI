import React, { useState, useEffect, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import MainContainer from './MainContainer';
import '../styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import EndPointProvider from "../util/EndPointProvider";
import AuthContext from "../store/AuthStore";
import axios from "axios";
import Toastify from '../util/Toastify';
import AuthService from "../service/authService"; // Import the static toastify class
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signed from './Signed';
import Calls from './Calls';
import Integrations from './integration/Integrations';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(185, 121, 249, 1)', // Light Purple color
      light: 'rgba(185, 121, 249, 0.83)'
    },
    secondary: {
      main: '#e6d6e9', // Another color in your gamma
    },
  },
  typography: {
    fontFamily: "Mona Sans",
    button: {
      textTransform: "none",
      height: '48px',
      maxHeight: '48px',
      minHeight: '48px',
    },
    body1: {
      fontSize: '12px',
    },
    body2: {
      fontSize: '14px'
    },
    h3: {
      fontSize: '28px',
      fontWeight: 600
    },
    h6: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '20px'
    }
  },
});

const App: React.FC = () => {
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authStore = useContext(AuthContext);
  const endpoint = EndPointProvider.getEndPoint() + "/clickup/oauth/token";
  const code = params.get("code");
  let isClickUpRelocation = code !== null;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      let authService = new AuthService(authStore);
      authService.getProtectedStatus().then(response => {
        if (response !== 401) {
        }
      }).catch(e => {
        if (e.response.status !== 401) {
          console.log(e);
        }
      });
    }
  }, [authStore]);

  useEffect(() => {
    if (isClickUpRelocation) {
      const fetchData = async () => {
        try {
          const response = await axios.post(endpoint, {
            code: code,
          }, {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          });
          if (response.status === 200) {
            window.location.href = EndPointProvider.getPageEndPoint();
            Toastify.success("Successfully connected to ClickUp");
          } else {
            Toastify.error("Failed to obtain ClickUp token");
          }
        } catch (error) {
          Toastify.error("Failed to obtain ClickUp token");
        }
      };
      fetchData();
    }
  }, [isClickUpRelocation, code, authStore.token, endpoint]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const PrivateRoute = ({ children }: { children: any }) => {
    if (authStore.token) {
      return children
    }
    return <Navigate to="/login" />
  }

  const BaseRoute = ({children}: {children: any}) => {
    if (authStore.token) {
      return <Navigate to="/call" />
    }
    return children
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BaseRoute><Login onLoginSuccess={handleLoginSuccess} /></BaseRoute>} />
          <Route path='/'>
            <Route path="call" element={<PrivateRoute><Calls /></PrivateRoute>} />
            <Route path="integration" element={<PrivateRoute><Integrations /></PrivateRoute>} />
            <Route path="login" element={<BaseRoute><Login onLoginSuccess={handleLoginSuccess} /></BaseRoute>} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signed" element={<Signed />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;