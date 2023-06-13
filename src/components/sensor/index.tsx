import React from 'react'
import ScaleSelectorComponent from 'utils/atoms/scaleSelector'
import { useData } from './hook';
import Box from '@mui/material/Box';
import LineGraphComponent from 'utils/LineGraph';
import { Line } from 'utils/LineGraph/type';

const SensorComponent: React.FC = () => {

    const {timeScale, setTimeScale} = useData();

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
            <ScaleSelectorComponent
                value={timeScale}
                valueDispatcher={setTimeScale} 
                authorizedValues={["Jour", "Semaine", "Mois", "Années"]}
                id={'TimeScaleSelector'}
                label="Choix d'échelle"
                />
            <LineGraphComponent lines={lines} id={'test'} />
        </Box>)

}

export default SensorComponent