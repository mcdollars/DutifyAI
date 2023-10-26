import React from 'react';
import '../styles/Calls.css';
import CallScreen from "./call/CallScreen";

const Calls: React.FC = () => {
    return (
        <div className="calls-content">
            <div>
                <CallScreen/>
            </div>
        </div>
    );
};

export default Calls;