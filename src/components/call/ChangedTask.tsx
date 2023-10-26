import {Button, Card} from "antd";
import ClickUpService from "../../service/clickUpService";
import {useContext, useState} from "react";
import Toastify from "../../util/Toastify";
import AuthContext from "../../store/AuthStore";
import "../../styles/Calls.css";

export default function ChangedTask(props: any) {
    let task = props.task;
    let recordingId = props.recordingId;
    let authStore = useContext(AuthContext);

    let isCanApplyChanges = false;
    task.taskChanges.forEach((change:any) => {
        if(!change.applied) isCanApplyChanges = true;
    })
    let [canApplyChanges, setCanApplyChanges] = useState(isCanApplyChanges);


    let applyChanges = () => {
        let clickupService = new ClickUpService(authStore);
        if(task.new){
            clickupService.postNewTask(recordingId,task.id).then(data => {
                console.log(data);
                if(data.isSuccessful){
                    Toastify.success('🦄 Succesfully Updated!');
                    setCanApplyChanges(false);
                } else {
                    Toastify.error('Something Went Wrong!');
                }
            }).catch(error => {
                console.log(error);
                Toastify.error('Something Went Wrong!');
            })
        } else {
            clickupService.changeTaskFields(recordingId,task.id).then(data => {
                console.log(data);
                if(data.isSuccessful){
                    Toastify.success('🦄 Succesfully Updated!');
                    setCanApplyChanges(false);
                } else {
                    Toastify.error('Something Went Wrong!');
                }
            }).catch(error => {
                console.log(error);
                Toastify.error('Something Went Wrong!');
            })
        }

    }

    const isNewBage = task.new ? <div className={"task-new-bage"}>NEW</div> : '';

    return (
        <div className={"changed-task-container"}>
            <Card type="inner" title={task.taskTitle} extra={isNewBage} >
               <ul>
                   {task.taskChanges.map((taskChange:any) =>
                       <li key={taskChange.id}>
                           <div style={{fontWeight:"bold"}}>{taskChange.field}</div>
                           <div>{taskChange.oldValue}<strong>-&gt;</strong>{taskChange.newValue}</div>
                       </li>
                   )}
                   <br/>
                   {canApplyChanges && <Button type="primary" style={{backgroundColor:"#8c51a0"}} onClick={applyChanges}>
                       {task.new ? 'Create' : 'Apply Changes'}
                   </Button>}
                   {!canApplyChanges &&
                       <Button type="primary" style={{backgroundColor:"#f6e1ff"}} disabled>
                           Applied
                       </Button>}
               </ul>
            </Card>
        </div>
    )
}