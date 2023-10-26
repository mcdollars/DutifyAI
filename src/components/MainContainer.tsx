import React, { useState } from 'react';
import { Box } from '@mui/material';
import Menu from './Menu';
import Calls from './Calls';
import Integrations from './integration/Integrations';

const MainContainer: React.FC = () => {
    const [activeMenu, setActiveMenu] = useState('Calls');

    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
    };

    return (
        <Box display="flex">
            <Menu onMenuClick={handleMenuClick} selectedMenu={activeMenu} />
            <Box flexGrow={1}>
                {activeMenu === 'Calls' ? <Calls /> : <Integrations />}
            </Box>
        </Box>
    );
};

export default MainContainer;