import React, { useEffect } from 'react'
import ScaleSelectorComponent from 'utils/atoms/scaleSelector'
import { useData, fetchData } from './hook';
import Box from '@mui/material/Box';
import ToggleButtonGroupComponent from 'utils/atoms/buttonGroup/toggleButtonGroup';
import MarkedMapComponent from 'utils/markedMap';
import { Typography } from '@mui/material';

const SensorComponent: React.FC = () => {

    const{
        timeScale, 
        setTimeScale,
        dataType,
        setDataType,
        setChartData,
        display,
        toogleButtons,
        changeHandler,
    } = useData();

    useEffect(() => {
        fetchData(timeScale, 2, dataType, setChartData);
    }, [timeScale, dataType, setChartData])
    
    return (
        <Box id="SensorWrapper">
            <Box id="SensorPresentation">
                <Box id="SensorInfo">
                    <Typography>A</Typography>
                    <Typography>B</Typography>
                    <Typography>C</Typography>
                </Box>
                <MarkedMapComponent id={'SensorMap'} center={[0, 0]} canInteract={false} defaultZoom={12} />
            </Box>

            <Box id="SensorGraphWrapper">
                <ToggleButtonGroupComponent toggleButtonPropsList={toogleButtons} changeHandler={changeHandler}
                                                                    selectedValue={dataType}
                                                                    id="DataTypeSelection" />
                <ScaleSelectorComponent
                    value={timeScale}
                    valueDispatcher={setTimeScale as React.Dispatch<React.SetStateAction<string>>} 
                    authorizedValues={["Jour", "Semaine", "Mois", "Années"]}
                    id={'TimeScaleSelector'}
                    label="Choix d'échelle"
                    />
                {display()}
            </Box>
        </Box>)

}

export default SensorComponent