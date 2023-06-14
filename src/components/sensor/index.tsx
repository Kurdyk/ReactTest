import React, { useEffect } from 'react'
import ScaleSelectorComponent from 'utils/atoms/scaleSelector'
import { useData, fetchData } from './hook';
import Box from '@mui/material/Box';
import LineGraphComponent from 'utils/LineGraph';
import { Line } from 'utils/LineGraph/type';
import ToggleButtonGroupComponent from 'utils/atoms/buttonGroup/toggleButtonGroup';

const SensorComponent: React.FC = () => {

    const{
        timeScale, 
        setTimeScale,
        dataType,
        setDataType,
        chartData,
        setChartData,
    } = useData();

    useEffect(() => {
        console.log("test")
        fetchData(timeScale, 2, dataType, setChartData);
    }, [timeScale, dataType, setChartData])

    const lines =  [
        {
          name: 'Series 1',
          data: [
            { key: 'A', value: Math.random() },
            { key: 'B', value: Math.random() },
            { key: 'C', value: Math.random() },
          ],
          stroke : "red",
          type:"monotone",

        },
        {
          name: 'Series 2',
          data: [
            { key: 'B', value: Math.random() },
            { key: 'C', value: Math.random() },
            { key: 'D', value: Math.random() },
          ],
          stroke : "green",
          type:"monotone",
        },
        {
          name: 'Series 3',
          data: [
            { key: 'C', value: Math.random() },
            { key: 'D', value: Math.random() },
            { key: 'E', value: Math.random() },
          ],
          stroke : "blue",
          type:"monotone",
        },
      ] as Line[];
    
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
            <LineGraphComponent lines={chartData} id={'test'} />
        </Box>)

}

export default SensorComponent