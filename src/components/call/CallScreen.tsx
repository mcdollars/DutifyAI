import "../../styles/Main.css";
import { useContext, useState } from "react";
import axios from "axios";
import { Collapse } from "antd";
import UserZoomCallData from "./UserZoomCallData";
import ProcessedSign from "./ProcessedSign";
import { Circles } from "react-loader-spinner";
import EndPointProvider from "../../util/EndPointProvider";
import AuthContext from "../../store/AuthStore";
import TimeUtil from "../../util/TimeUtil";
import ArrowRight from "../../images/arrowright.svg"
import ArrowDown from "../../images/arrowdown.svg"
import "../../styles/Calls.css";
import { Box, Typography } from "@mui/material";

interface PanelHeaderProps {
  userZoomCall: any,
  isMobile: boolean
}

const PanelHeader: React.FC<PanelHeaderProps> = ({ userZoomCall, isMobile }) => {
  let recording = userZoomCall.zoomCall.recordings[0];
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: isMobile ? 'column-reverse' : 'row',
    }} ml={0.5}>
      <Box display='flex' alignItems='center' mr={2}>
        <Box width={32} display='flex' alignItems='center'>
          <Typography variant="body1" sx={{
            fontWeight: 600
          }}>
            {TimeUtil.dateToTime(new Date((recording as any).createdAt))}
          </Typography>
        </Box>
        <Box ml={0.5} width={64} display='flex' alignItems='center'>
          <Typography variant="body1">
            {TimeUtil.dateToYMD(new Date((recording as any).createdAt))}
          </Typography>
        </Box>
      </Box>
      <Box display='flex' alignItems='center'>
        <Typography variant="body2" sx={{
          fontWeight: 600
        }}>
          {(recording as any).referenceV4}
        </Typography>
      </Box>
    </Box>
  )
}

type CallScreenProps = {
  isMobile: boolean
}

const CallScreen: React.FC<CallScreenProps> = ({
  isMobile
}) => {

  let authStore = useContext(AuthContext);
  let [isLoaded, setIsLoaded] = useState(false);
  let [userZoomCalls, setUserZoomCalls] = useState([]);


  async function requestRecordings() {
    let endpoint = EndPointProvider.getEndPoint();
    const token = authStore.token;
    return await axios.get(endpoint + "/usercall/all", {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  if (userZoomCalls.length === 0) {
    requestRecordings().then(callRecordings => {
      setIsLoaded(true);
      if (userZoomCalls.length === 0 && callRecordings.data.length !== 0) {
        setUserZoomCalls(callRecordings.data);
      }
    });
  }

  let items = userZoomCalls.map(recording => <UserZoomCallData key={(recording as any).id} recording={recording} />)
  items = userZoomCalls.filter((usz: any) => usz.zoomCall.recordings.length > 0)
    .sort((a, b) => new Date((b as any).zoomCall.recordings[0].createdAt).getTime() - new Date((a as any).zoomCall.recordings[0].createdAt).getTime()).map(userZoomCall =>
      <Collapse.Panel style={{
        boxShadow: '0px 2px 8px 0px rgba(24, 28, 48, 0.1)',
        borderRadius: 14,
      }} key={"" + (userZoomCall as any).id}
        header={<PanelHeader userZoomCall={userZoomCall} isMobile={isMobile}/>}
        extra={<ProcessedSign processed={((userZoomCall as any).zoomCall.recordings[0] as any).processed} />}>
        <Box>
          <UserZoomCallData userZoomCall={userZoomCall} />
        </Box>
      </Collapse.Panel>)


  return (
    <Box mt={6.875}>
      <Typography variant="h3">Your Calls</Typography>
      {isLoaded &&
        <Box sx={{
          mt: 3.125
        }} style={{ paddingBottom: "1vh" }}>
          {items.length > 0 &&
            <Collapse expandIconPosition={'start'}
              expandIcon={({ isActive }) =>
              (<div style={{ width: 24, height: 24, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: isActive ? 'rotate(90deg)' : '',
                    transition: 'all 0.2s'
                  }}>
                  <path d="M1 1L5 5L1 9" stroke={isActive ? "#B979F9" : "#181C30"} strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>)}
              style={{
                width: "100%",
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
              {items}
            </Collapse>}
        </Box>}
      {!isLoaded &&
        <div className={"flex-column-container"}>
          <div style={{ marginTop: "2vh" }}>
            <strong>Loading Call Data</strong>
          </div>
          <div style={{ marginTop: "2vh" }}>
            <Circles color='blue' />
          </div>
        </div>}
    </Box>
  )
}

export default CallScreen