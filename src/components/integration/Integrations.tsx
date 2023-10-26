import React from 'react';
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
import { Box, Typography } from '@mui/material';

const Integrations: React.FC = () => {

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

	return (
		<div className="integrations-content">
			<h2 style={{ marginTop: "47px" }}>Integrations</h2>
			<Box width={320} display='flex' flexDirection='column' gap={6}>
				<Box display='flex' flexDirection='column' gap={2.5}>
					<Typography variant='body1' sx={{
						color: 'rgba(24, 28, 48, 0.48)'
					}}>Task Systems</Typography>
					<CustomIntegration imgSrc={clickupLogo} integrationName="ClickUp" clickFunc={onClickUpConnect} />
					<CustomIntegration imgSrc={jiraLogo} integrationName="Jira" clickFunc={onJiraConnect} />
					<CustomIntegration imgSrc={asanaLogo} integrationName="Asana" clickFunc={onAsanaConnect} />
					<CustomIntegration imgSrc={trelloLogo} integrationName="Trello" clickFunc={onTrelloConnect} />
				</Box>
				<Box display='flex' flexDirection='column' gap={2.5}>
					<Typography variant='body1' sx={{
						color: 'rgba(24, 28, 48, 0.48)'
					}}>Calendar</Typography>
					<CustomIntegration imgSrc={calendarLogo} integrationName="Calendar" clickFunc={onCalendarConnect} />
				</Box>
				<Box display='flex' flexDirection='column' gap={2.5}>
					<Typography variant='body1' sx={{
						color: 'rgba(24, 28, 48, 0.48)'
					}}>Communications</Typography>
					<CustomIntegration imgSrc={emailLogo} integrationName="Email" clickFunc={onEmailConnect} />
					<CustomIntegration imgSrc={slackLogo} integrationName="Slack" clickFunc={onSlackConnect} />
				</Box>
				<Box display='flex' flexDirection='column' gap={2.5}>
					<Typography variant='body1' sx={{
						color: 'rgba(24, 28, 48, 0.48)'
					}}>Knowledge Base</Typography>
					<CustomIntegration imgSrc={confluenceLogo} integrationName="Confluence" clickFunc={onConfluenceConnect} />
					<CustomIntegration imgSrc={notionLogo} integrationName="Notion" clickFunc={onNotionConnect} />
					<CustomIntegration imgSrc={googleLogo} integrationName="Google" clickFunc={onGoogleConnect} />
				</Box>
			</Box>
		</div>
	);
}

export default Integrations;