import { FormGroup, InputLabel, Input, Box, Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import { parsePosition } from './utils';
import { MarkerContext } from '../context';
import { MarkerInfo } from '../type';

const MapInteractionComponent: React.FC = () =>  {

    const [position, setPosition] = useState([0, 0]);
    const [textMarker, setTextMarker] = useState("");
    const [list, dispatcher] = useContext(MarkerContext);

    return (
        <Box id="MapInteractionWrapper">
            <FormGroup id="MarkerForm">
                <InputLabel className="InputLabel" htmlFor="positionInput">A new marker</InputLabel>
                <Input required placeholder="format: latitude, longitude" id="positionInput" aria-describedby="positionInput" 
                onChange={(input) => {
                    setPosition(parsePosition(input.target.value));
                }}/>
                <InputLabel className="InputLabel">Where do you want to put a marker?</InputLabel>
                
                <Input required placeholder='Text for your marker?' value={textMarker} id="textMarkerInput" aria-describedby='textMarkerInput'
                onChange={(input) => {
                    setTextMarker(input.target.value);
                }}/>
            </FormGroup>

            <Box id="MapInterractionButtonWarpper">
                <Button variant="outlined" color="primary"
                onClick={() =>{
                    const newMarker = {
                        position:position,
                        text:textMarker,
                    }
                    const newList = [...list, newMarker] as MarkerInfo[];
                    dispatcher.apply(undefined, [newList])
                }}>
                    Add a new marker
                </Button>
            </Box>
        </Box>
  )
}

export default MapInteractionComponent