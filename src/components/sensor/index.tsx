import React, { useEffect } from 'react'
import ScaleSelectorComponent from 'utils/atoms/scaleSelector'
import { useData, fetchData } from './hook';
import Box from '@mui/material/Box';
import ToggleButtonGroupComponent from 'utils/atoms/buttonGroup/toggleButtonGroup';
import MarkedMapComponent from 'utils/markedMap';
import { greenIcon } from 'components/accueil/accueilMap/const';
import { useParams } from 'react-router-dom';

const SensorComponent: React.FC = () => {

    const {sensorId} = useParams();
    console.log(sensorId);

    const{
        timeScale, 
        setTimeScale,
        dataType,
        setChartData,
        display,
        toogleButtons,
        changeHandler,
        setPresentationInfo,
        displayPresentation,
        presentationInfo,
    } = useData();

    useEffect(() => {
        fetchData(timeScale, 2, dataType, setChartData, setPresentationInfo);
    }, [timeScale, dataType, setChartData, setPresentationInfo])

    
    return (
        <Box id="SensorWrapper">
            <Box id="SensorPresentation">
                {displayPresentation()}
                <MarkedMapComponent id={'SensorMap'} center={presentationInfo.sensorCoordinates} canInteract={false} defaultZoom={13}
                markers={[{position: presentationInfo.sensorCoordinates, text:"", id:0, icon:greenIcon}]}
                lines={[{startPosition: presentationInfo.roadCoordinates[0], 
                        endPosition: presentationInfo.roadCoordinates[1],
                        color:"red",
                        id:0}]} />
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