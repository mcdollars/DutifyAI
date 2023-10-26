import React from "react";
import "../../styles/Main.css";

interface ProcessedSignProps {
    processed: boolean;
}

const ProcessedSign: React.FC<ProcessedSignProps> = ({ processed }) => {
    const className = processed ? 'processed-sign' : 'not-processed-sign';
    const text = processed ? 'ready' : 'processing';

    return (
        <div className={className}>
            {text}
        </div>
    );
}

export default ProcessedSign;