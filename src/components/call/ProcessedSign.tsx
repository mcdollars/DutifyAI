import React from "react";
import "../../styles/Main.css";
import { Box } from "@mui/material";
import Status from "../Status";

interface ProcessedSignProps {
    processed: boolean;
}

const ProcessedSign: React.FC<ProcessedSignProps> = ({ processed }) => {
    
    const css = processed ? 'green' : 'blue';
    const text = processed ? 'ready' : 'processing';

    return <Status text={text} color={css}/>
}

export default ProcessedSign;