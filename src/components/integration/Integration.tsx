import React, { useContext, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import '../../styles/Integrations.css';
import EndPointProvider from "../../util/EndPointProvider";
import AuthContext from "../../store/AuthStore";
import axios from 'axios';
import Status from '../Status';

type UserIntegration = {
  integrationSystem: string,
  accessToken: string
}

type CustomIntegrationProps = {
  imgSrc: string,
  integrationName: string,
  clickFunc: Function
}

const CustomIntegration: React.FC<CustomIntegrationProps> = ({ imgSrc, integrationName, clickFunc }) => {
  const authStore = useContext(AuthContext);
  const endpoint: string = EndPointProvider.getEndPoint() + "/user/integration";
  const [integrations, setIntegrations] = useState<UserIntegration[]>([]);

  useEffect(() => {
    const fetchUserIntegrations = async () => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });
        setIntegrations(response.data);
      } catch (error) {
        console.error("Error fetching user integrations:", error);
      }
    };
    fetchUserIntegrations();
  }, [authStore.token, endpoint]);

  const isConnected = (integration: string) => {
    return integrations.find(userIntegration => userIntegration.integrationSystem === integration) !== undefined;
  }
  return (
    <Box display='flex' justifyContent='space-between'>
      <Box display='flex' alignItems='center'>
        <img src={imgSrc} alt={"logo"} />
        <Box className={"name-cell"}>{integrationName}</Box>
      </Box> 
      <Box>
        {isConnected(integrationName)
          ? <Button variant="contained" color="primary" onClick={() => clickFunc()} sx={{
            width: "99px", minHeight: "28px", height: "28px",
            borderRadius: "10px", padding: "6px, 15px, 6px, 20px",
            color: "white", gap: "10px", fontSize: "12px", boxShadow: 0
          }}>
            Connect →
          </Button>
          : integrationName !== "Email"
            ? <Status text='coming soon' color='blue'/>
            : <Status text='connected' color='green'/>}
      </Box>
    </Box>
  );
}

export default CustomIntegration;