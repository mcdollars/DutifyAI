import ClickUpService from "../../service/clickUpService";
import { useContext, useState } from "react";
import Toastify from "../../util/Toastify";
import AuthContext from "../../store/AuthStore";
import "../../styles/Calls.css";
import { Button, Box, Typography, withStyles } from "@mui/material";

export default function ChangedTask(props: any) {
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
        console.log(data);
        if (data.isSuccessful) {
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
      clickupService.changeTaskFields(recordingId, task.id).then(data => {
        console.log(data);
        if (data.isSuccessful) {
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

      {task.taskChanges.map((taskChange: any) =>
        <Box display='flex' flexDirection='column' gap={0.5}>
          <Typography variant="body1" sx={{
            color: '#181C30',
            opacity: 0.48
          }}>{taskChange.field}</Typography>
          <Typography variant="body1">{taskChange.oldValue} → {taskChange.newValue}</Typography>
        </Box>
      )}
      <Box>
        {canApplyChanges && <Button color="primary" onClick={applyChanges}
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 3,
            px: 2.5,
            py: 1.25,
            ':hover': {
              bgcolor: 'primary.light', // theme.palette.primary.main
              color: 'white',
            },
            minHeight: 36,
            maxHeight: 36
          }}
        >
          <Typography variant="body1" color='white'>
            {task.new ? 'Create' : 'Apply Changes'}
          </Typography>
        </Button>}
        {!canApplyChanges &&
          <Button color="primary" disabled sx={{
            bgcolor: 'primary.main',
            borderRadius: 3,
            px: 2.5,
            py: 1.25,
            ':hover': {
              bgcolor: 'primary.light', // theme.palette.primary.main
              color: 'white',
            },
            minHeight: 36,
            maxHeight: 36
          }}>
            <Typography variant="body1" color='white'>
              Applied
            </Typography>
          </Button>}
      </Box>
    </Box >
  )
}