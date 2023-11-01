import React, { useState, useEffect, useContext } from 'react';
import CustomIntegration from './Integration';
import clickupLogo from "../../images/clickup.svg";
import jiraLogo from "../../images/jira.svg";
import asanaLogo from "../../images/Asana.svg";
import trelloLogo from "../../images/trello.svg";
import calendarLogo from "../../images/calendar.svg";
import emailLogo from "../../images/email.svg";
import slackLogo from "../../images/slack.svg";
import confluenceLogo from "../../images/confluence.svg";
import notionLogo from "../../images/notion.svg";
import googleLogo from "../../images/google.svg";
import '../../styles/Integrations.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Typography, Theme, CircularProgress } from '@mui/material';
import Menu from '../Menu';
import { useNavigate } from 'react-router-dom';
import EndPointProvider from "../../util/EndPointProvider";
import AuthContext from "../../store/AuthStore";
import axios from 'axios';
import ClickUpContext from '../../store/ClickUpStore';

type UserIntegration = {
	integrationSystem: string,
	accessToken: string
}

const Integrations: React.FC = () => {
	const navigate = useNavigate()
	const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(1280))
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const endpoint: string = EndPointProvider.getEndPoint() + "/user/integration";
	const [integrations, setIntegrations] = useState<UserIntegration[]>([]);
	const authStore = useContext(AuthContext);
	const clickUpStore = useContext(ClickUpContext)
	let [isLoaded, setIsLoaded] = useState(false);


	useEffect(() => {
		const fetchUserIntegrations = async () => {
			try {
				const response = await axios.get(endpoint, {
					headers: {
						Authorization: `Bearer ${authStore.token}`
					}
				});
				clickUpStore.setIsRequestInProgress(false)
				setIsLoaded(true)
				setIntegrations(response.data);
			} catch (error) {
				clickUpStore.setIsRequestInProgress(false)
				setIsLoaded(true)
				console.error("Error fetching user integrations:", error);
			}
		};
		if (!clickUpStore.isRequestInProgress) {
			clickUpStore.setIsRequestInProgress(true)
			fetchUserIntegrations();
		}
	}, [authStore.token, endpoint]);

	const onClickUpConnect = () => {
		const clientId = "PUF01QPJUCHBJEHZ4XHDSTJ14WEHX839";
		let redirectUri = '';
		if (process.env.REACT_APP_LOCAL_START) {
			redirectUri = "http://localhost:3000";
		} else {
			redirectUri = "https://dutify.ai/hub";
		}
		window.location.replace(`https://app.clickup.com/api?client_id=${clientId}&redirect_uri=${redirectUri}`)
		console.log("I am here-------------------------------")
	}

	const onJiraConnect = () => { }
	const onAsanaConnect = () => { }
	const onTrelloConnect = () => { }
	const onCalendarConnect = () => { }
	const onEmailConnect = () => { }
	const onSlackConnect = () => { }
	const onConfluenceConnect = () => { }
	const onNotionConnect = () => { }
	const onGoogleConnect = () => { }

	const mobileCSS = {
		p: '20px 16px 24px 16px',
		bgcolor: 'white',
		borderRadius: '14px',
		boxShadow: '0px 2px 8px 0px rgba(24, 28, 48, 0.1)'
	}
	const [activeMenu, setActiveMenu] = useState('Integrations');
	const handleMenuClick = (menu: string) => {
		setActiveMenu(menu);
		if (menu == "Calls") {
			navigate(`/call`)
		}
	};
	return (


		<Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
			<Menu
				onMenuClick={handleMenuClick}
				selectedMenu={activeMenu}
				isMobile={isMobile}
				isSmallScreen={isSmallScreen}
			/>
			<Box flexGrow={1} sx={{
				height: '100%',
				minHeight: '100vh',
				bgcolor: isMobile ? 'rgba(185, 121, 249, 0.08)' : '',
				ml: isMobile ? 0 : isSmallScreen ? '200px' : '304px'
			}}>
				<Box p={isMobile ? 2 : 4}>
					<Typography variant='h3' sx={{
						mt: isMobile ? '71px' : '55px',
						mb: isMobile ? 2.5 : '37px'
					}}>Integrations</Typography>

					{isLoaded && <Box width={isMobile ? '100%' : 320} display='flex' flexDirection='column' gap={isMobile ? 1 : 6}>
						<Box display='flex' flexDirection='column' gap={2.5} sx={isMobile ? mobileCSS : {}}>
							<Typography variant='body1' sx={{
								color: 'rgba(24, 28, 48, 0.48)',
								height: 16
							}}>Task Systems</Typography>
							<CustomIntegration imgSrc={clickupLogo} integrationName="ClickUp" clickFunc={onClickUpConnect}
								integrations={integrations} />
							<CustomIntegration imgSrc={jiraLogo} integrationName="Jira" clickFunc={onJiraConnect}
								integrations={integrations} />
							<CustomIntegration imgSrc={asanaLogo} integrationName="Asana" clickFunc={onAsanaConnect}
								integrations={integrations} />
							<CustomIntegration imgSrc={trelloLogo} integrationName="Trello" clickFunc={onTrelloConnect}
								integrations={integrations} />
						</Box>
						<Box display='flex' flexDirection='column' gap={2.5} sx={isMobile ? mobileCSS : {}}>
							<Typography variant='body1' sx={{
								color: 'rgba(24, 28, 48, 0.48)'
							}}>Calendar</Typography>
							<CustomIntegration imgSrc={calendarLogo} integrationName="Calendar" clickFunc={onCalendarConnect}
								integrations={integrations} />
						</Box>
						<Box display='flex' flexDirection='column' gap={2.5} sx={isMobile ? mobileCSS : {}}>
							<Typography variant='body1' sx={{
								color: 'rgba(24, 28, 48, 0.48)'
							}}>Communications</Typography>
							<CustomIntegration imgSrc={emailLogo} integrationName="Email" clickFunc={onEmailConnect}
								integrations={integrations} />
							<CustomIntegration imgSrc={slackLogo} integrationName="Slack" clickFunc={onSlackConnect}
								integrations={integrations} />
						</Box>
						<Box display='flex' flexDirection='column' gap={2.5} sx={isMobile ? mobileCSS : {}}>
							<Typography variant='body1' sx={{
								color: 'rgba(24, 28, 48, 0.48)'
							}}>Knowledge Base</Typography>
							<CustomIntegration imgSrc={confluenceLogo} integrationName="Confluence" clickFunc={onConfluenceConnect}
								integrations={integrations} />
							<CustomIntegration imgSrc={notionLogo} integrationName="Notion" clickFunc={onNotionConnect}
								integrations={integrations} />
							<CustomIntegration imgSrc={googleLogo} integrationName="Google" clickFunc={onGoogleConnect}
								integrations={integrations} />
						</Box>
					</Box>}
					{!isLoaded &&
						<Box className={"flex-column-container"}>
							<CircularProgress />
						</Box>
					}
				</Box>
			</Box>
		</Box>
	);
}

export default Integrations;