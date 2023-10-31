import { Box, Typography, Button } from "@mui/material";

export default function AIInsightCard(props: any) {
  let recording = props.recording;
  let fieldName = props.fieldName;
  let split = props.split;
  let showModal = props.showModal;
  let isApplied = props.isApplied;

  let headStyle = { backgroundColor: "#d9c8f5" }

  function titleCase(str: string) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  return (
    <Box display='flex' gap={2} flexDirection='column'>
      <Typography variant='body2' sx={{
        fontWeight: 600
      }}>{titleCase(fieldName)}</Typography>
      <Box sx={{
        background: '#B979F914',
        px: 2,
        py: 2.5,
        borderRadius: 2.5
      }} display='flex' flexDirection='column' gap={2}>
        {split ? recording[fieldName].split("\n")
          .map((point: any, index: number) =>
            <li key={`point-${index}`}>
              <Typography variant="body1">
                {point}
              </Typography>
            </li>)
          : <Typography variant="body1">{recording[fieldName]}</Typography>}

        <Box>
          {!isApplied &&
            <Button color="primary" sx={{
              bgcolor: 'primary.main',
              borderRadius: 3,
              px: 2.5,
              py: 1.25,
              color: 'white',
              ':hover': {
                bgcolor: 'primary.light', // theme.palette.primary.main
              },
              minHeight: 36,
              maxHeight: 36
            }} onClick={() => showModal(fieldName)}>
              <Typography variant="body1" color='white'>
                Add As Comment
              </Typography>
            </Button>}
          {isApplied &&
            <Button color="primary" sx={{
              bgcolor: 'primary.main',
              borderRadius: 3,
              px: 2.5,
              py: 1.25,
              color: 'white',
              ':hover': {
                bgcolor: 'primary.light', // theme.palette.primary.main
              },
              minHeight: 36,
              maxHeight: 36
            }} disabled>
              <Typography variant="body1" color='white'>
                Applied
              </Typography>
            </Button>}
        </Box>
      </Box>
    </Box>
    // <ul>
    //   {split ? recording[fieldName].split("\n").map((point: any) => <li key={point}>{point}</li>) : recording[fieldName]}
    // </ul>
    // <br />
  )
}