import React, {useContext, useEffect, useState} from 'react';
import {Button} from '@mui/material';
import '../../styles/Integrations.css';
import clickupLogo from "../../images/clickup.png";
import jiraLogo from "../../images/jira.png";
import EndPointProvider from "../../util/EndPointProvider";
import AuthContext from "../../store/AuthStore";
import axios from 'axios';
import {Integration} from "../../enum/Integration";

type UserIntegration = {
    integrationSystem: string,
    accessToken: string
}

const Integrations: React.FC = () => {
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

    let onClickUpConnect = () => {
        let clientId = "PUF01QPJUCHBJEHZ4XHDSTJ14WEHX839";
        let redirectUri = '';
        if (process.env.REACT_APP_LOCAL_START) {
            redirectUri = "http://localhost:3000";
        } else {
            redirectUri = "https://dutify.ai/hub";
        }
        window.location.replace(`https://app.clickup.com/api?client_id=${clientId}&redirect_uri=${redirectUri}`)
    }

    let onJiraConnect = () => {

    }

    return (
        <div className="integrations-content">
            <h2>Integrations</h2>
            <div className={"flex-column-container-integration"}>
                <div><h3>Task Systems</h3></div>
                <div className={"grid-container"}>
                    <div>
                        <img src={clickupLogo} alt={"clickup logo"} style={{width: '50px', height: '50px'}}/>
                    </div>
                    <div className={"name-cell"}>ClickUp</div>
                    <div>
                        {!isConnected(Integration.ClickUp) ?
                            <Button variant="contained" color="primary" onClick={onClickUpConnect}>
                                Connect
                            </Button> : ''}
                    </div>
                </div>
                <div className={"grid-container"}>
                    <div>
                        <img src={jiraLogo} alt={"jira logo"} style={{width: '50px', height: '50px'}}/>
                    </div>
                    <div className={"name-cell"}>Jira</div>
                    <div>
                        {!isConnected(Integration.Jira) ?
                            <Button variant="contained" color="primary" onClick={onJiraConnect}>
                                Connect
                            </Button> : ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Integrations;