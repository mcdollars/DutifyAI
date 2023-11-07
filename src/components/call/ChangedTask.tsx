import ClickUpService from "../../service/clickUpService";
import { useContext, useState } from "react";
import Toastify from "../../util/Toastify";
import AuthContext from "../../store/AuthStore";
import "../../styles/Calls.css";
import { Button, Box, Typography, withStyles } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ChangedTask(props: any) {
  const navigate = useNavigate()
  const {isMobile} = props
  let task = props.task;
  let recordingId = props.recordingId;
  let authStore = useContext(AuthContext);

  let isCanApplyChanges = false;
  task.taskChanges.forEach((change: any) => {
    if (!change.applied) isCanApplyChanges = true;
  })
  let [canApplyChanges, setCanApplyChanges] = useState(isCanApplyChanges);


  let applyChanges = () => {
    let clickupService = new ClickUpService(authStore);
    if (task.new) {
      clickupService.postNewTask(recordingId, task.id).then(data => {
        if (data.isSuccessful) {
          Toastify.success('🦄 Succesfully Updated!');
          setCanApplyChanges(false);
        } else {
          Toastify.error('Something Went Wrong!');
        }
      }).catch(error => {
        if (error.response.status === 401) {
          navigate("/hub")
        }
        Toastify.error('Something Went Wrong!');
      })
    } else {
      clickupService.changeTaskFields(recordingId, task.id).then(data => {
        console.log(data);
        if (data.isSuccessful) {
          Toastify.success('🦄 Succesfully Updated!');
          setCanApplyChanges(false);
        } else {
          Toastify.error('Something Went Wrong!');
        }
      }).catch(error => {
        if (error.response.status === 401) {
          navigate("/hub")
        }
        Toastify.error('Something Went Wrong!');
      })
    }

  }

  const isNewBage = task.new ? <div className={"task-new-bage"}>NEW</div> : '';

  const toFirstLetterUpper = (str: string) => {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }

  return (
    <Box sx={{
      background: '#B979F914',
      px: 2,
      py: 2.5,
      borderRadius: 2.5
    }} display='flex' flexDirection='column' gap={1.5}>
      <Typography variant="body1" sx={{
        fontWeight: 600,
        color: '#181C30'
      }}>{task.taskTitle}</Typography>

      {task.taskChanges.map((taskChange: any, index: number) =>
        <Box key={`taskChange-${task.id}-${index}`} display='flex' flexDirection='column' gap={0.5}>
          <Typography variant="body1" sx={{
            color: '#181C30',
            opacity: 0.48
          }}>{toFirstLetterUpper(taskChange.field)}</Typography>
          <Typography variant="body1">{taskChange.oldValue} → {taskChange.newValue}</Typography>
        </Box>
      )}
      <Box>
        {canApplyChanges && <Button color="primary" onClick={applyChanges}
          sx={{
            bgcolor: 'primary.main',
            borderRadius: isMobile ? 5 : 3,
            px: isMobile ? 4 : 2.5,
            py: isMobile ? 2 :1.25,
            ':hover': {
              bgcolor: 'primary.light', // theme.palette.primary.main
              color: 'white',
            },
            minHeight: isMobile ? 48 : 36,
            maxHeight: isMobile ? 48 : 36
          }}
        >
          <Typography variant={ isMobile ? "body2" : "body1"} color='white' fontWeight={600}>
            {task.new ? 'Create' : 'Apply Changes'}
          </Typography>
        </Button>}
        {!canApplyChanges &&
          <Button color="primary" disabled sx={{
            bgcolor: 'primary.main',
            borderRadius: isMobile ? 5 : 3,
            px: isMobile ? 4 : 2.5,
            py: isMobile ? 2 :1.25,
            ':hover': {
              bgcolor: 'primary.light', // theme.palette.primary.main
              color: 'white',
            },
            minHeight: isMobile ? 48 : 36,
            maxHeight: isMobile ? 48 : 36
          }}>
            <Typography variant={ isMobile ? "body2" : "body1"} color='white' fontWeight={600}>
              Applied
            </Typography>
          </Button>}
      </Box>
    </Box >
  )
}