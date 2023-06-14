import React, { useEffect } from 'react'
import ScaleSelectorComponent from 'utils/atoms/scaleSelector'
import { useData, fetchData } from './hook';
import Box from '@mui/material/Box';
import LineGraphComponent from 'utils/LineGraph';
import ToggleButtonGroupComponent from 'utils/atoms/buttonGroup/toggleButtonGroup';

const SensorComponent: React.FC = () => {

    const{
        timeScale, 
        setTimeScale,
        dataType,
        setDataType,
        chartData,
        setChartData,
        display,
    } = useData();

    useEffect(() => {
        console.log("test")
        fetchData(timeScale, 2, dataType, setChartData);
    }, [timeScale, dataType, setChartData])
    
    return (
        <Box id="SensorWrapper">
            <ToggleButtonGroupComponent toggleButtonPropsList={[{id:1, value:"Wear", buttonText:"Wear"},
                                                                {id:2, value:"Usage", buttonText:"Usage"}
                                                                ]} changeHandler={() => {
                                                                    if (dataType === "Wear") {
                                                                        setDataType("Usage")
                                                                    } else {
                                                                        setDataType("Wear")
                                                                    }
                                                                }}
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
        </Box>)

}

export default SensorComponent