import "../../styles/Main.css";
import {useContext, useState} from "react";
import axios from "axios";
import {Collapse} from "antd";
import UserZoomCallData from "./UserZoomCallData";
import ProcessedSign from "./ProcessedSign";
import {Circles} from "react-loader-spinner";
import EndPointProvider from "../../util/EndPointProvider";
import AuthContext from "../../store/AuthStore";
import TimeUtil from "../../util/TimeUtil";
import "../../styles/Calls.css";

interface PanelHeaderProps {
    userZoomCall: any
}

const PanelHeader : React.FC<PanelHeaderProps> = ({userZoomCall}) => {
    let recording = userZoomCall.zoomCall.recordings[0];

    return (
        <div className={"flex-base"}><div>{TimeUtil.dateToDateOfYearAndTimeString((recording as any).createdAt)}</div><div style={{marginLeft:"3vh"}}>{(recording as any).referenceV4}</div></div>
    )
}

export default function CallScreen() {

    let authStore = useContext(AuthContext);
    let [isLoaded, setIsLoaded] = useState(false);
    let [userZoomCalls, setUserZoomCalls] = useState([]);


    async function requestRecordings() {
        let endpoint = EndPointProvider.getEndPoint();
        const token = authStore.token;
        return await axios.get(endpoint + "/usercall/all", {
            headers: {Authorization: `Bearer ${token}`}
        });
    }

    if (userZoomCalls.length === 0) {
        requestRecordings().then(callRecordings => {
            setIsLoaded(true);
            if (userZoomCalls.length === 0 && callRecordings.data.length !== 0) {
                setUserZoomCalls(callRecordings.data);
                console.log(callRecordings.data);
            }
        });
    }

    let items = userZoomCalls.map(recording => <UserZoomCallData key={(recording as any).id} recording={recording}/>)
    items = userZoomCalls.filter((usz:any) => usz.zoomCall.recordings.length>0)
        .sort((a, b) => new Date((b as any).zoomCall.recordings[0].createdAt).getTime() - new Date((a as any).zoomCall.recordings[0].createdAt).getTime()).map(userZoomCall =>
        <Collapse.Panel key={"" + (userZoomCall as any).id} header={<PanelHeader userZoomCall={userZoomCall}/>}
                        extra={<ProcessedSign processed={((userZoomCall as any).zoomCall.recordings[0] as any).processed}/>}>
            <div>
                <UserZoomCallData userZoomCall={userZoomCall}/>
            </div>
        </Collapse.Panel>)


    return (
        <div className={"main-container flex-column-container"} style={{justifyContent: "flex-start"}}>
            <div className={"flex-container"}>
                <h3>Dutify.AI</h3>
            </div>
            {isLoaded &&
                <div className={"flex-column-container"} style={{width: "50vw", paddingBottom: "1vh"}}>
                    {items.length > 0 &&
                        <Collapse expandIconPosition={'start'}
                                  style={{backgroundColor: "#d9c8f5", width: "100%"}}>
                            {items}
                        </Collapse>}
                </div>}
            {!isLoaded &&
                <div className={"flex-column-container"}>
                    <div style={{marginTop: "2vh"}}>
                        <strong>Loading Call Data</strong>
                    </div>
                    <div style={{marginTop: "2vh"}}>
                        <Circles color='blue'/>
                    </div>
                </div>}
        </div>
    )
}