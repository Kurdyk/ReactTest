import React from 'react'
import ScaleSelectorComponent from 'utils/atoms/scaleSelector'
import { useData } from './hook';
import Box from '@mui/material/Box';

const SensorComponent: React.FC = () => {

    const {timeScale, setTimeScale} = useData();
    
    return (
        <Box id="SensorWrapper">
            <ScaleSelectorComponent
                value={timeScale}
                valueDispatcher={setTimeScale} 
                authorizedValues={["Jour", "Semaine", "Mois", "Années"]}
                id={'TimeScaleSelector'}
                label="Choix d'échelle"
                />
        </Box>)

}

export default SensorComponent