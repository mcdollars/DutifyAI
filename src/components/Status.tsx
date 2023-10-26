import { Box } from '@mui/material'
import React from 'react'

type StatusProps = {
  text: string,
  color: string
}

const Status: React.FC<StatusProps> = ({
  text,
  color
}) => {
  const greenCSS = {
    color: '#2ACB57',
    backgroundColor: 'rgba(42, 203, 87, 0.16)',
  }
  const blueCSS = {
    color: '#31B1E8',
    backgroundColor: 'rgba(49, 177, 232, 0.16)'
  }
  return (
    <Box className='status-badge' sx={color === 'green' ? greenCSS : blueCSS}>{text}</Box>
  )
}

export default Status