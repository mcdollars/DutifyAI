import { Box, Typography } from '@mui/material'
import React from 'react'

type StatusProps = {
  text: string,
  color: string
}

const Status: React.FC<StatusProps> = ({
  text,
  color
}) => {
  const greenColor = {
    color: '#2ACB57',
  }
  const greenBgColor = {
    backgroundColor: 'rgba(42, 203, 87, 0.16)',
  }
  const blueColor = {
    color: '#31B1E8',
  }
  const blueBgColor = {
    backgroundColor: 'rgba(49, 177, 232, 0.16)'
  }
  return (
    <Box px={1.5} py={0.5}
      borderRadius={2.5}
      sx={color === 'green' ? greenBgColor : blueBgColor}>
      <Typography variant='body1'
        display='flex'
        alignItems='center'
        sx={color === 'green' ? greenColor : blueColor}
        fontWeight={600} height={16}>{text}</Typography>
    </Box>
  )
}

export default Status