import { FormGroup, InputLabel, Input, FormHelperText, Box, Button } from '@mui/material';
import React, { useContext, useState } from 'react'
import { parsePosition } from './utils';
import { MarkerContext } from '../context';
import { MarkerInfo } from '../type';
import { myIcon } from '../customeMarker/incon';

const MapInteractionComponent: React.FC = () =>  {

    const [position, setPosition] = useState([0, 0]);
    const [textMarker, setTextMarker] = useState("");
    const [list, dispatcher] = useContext(MarkerContext);

    return (
        <Box sx={{display:"flex", marginTop:"10px", flexDirection:"row", padding:"20px", maxWidth:"30%", flexWrap:"wrap"}}>
            <FormGroup sx={{display:"flex", margin:"auto", }}>
                <InputLabel htmlFor="positionInput">A new marker</InputLabel>
                <Input required placeholder="format: latitude, longitude" id="positionInput" aria-describedby="positionInput" onChange={(input) => {
                    setPosition(parsePosition(input.target.value));
                }}/>
                <FormHelperText id="positionInputHelper">Where do you want to put a marker?</FormHelperText>

                <Input required placeholder='Text for your marker?' value={textMarker} id="textMarkerInput" aria-describedby='textMarkerInput' onChange={(input) => {
                    setTextMarker(input.target.value);
                }}/>
            </FormGroup>

            <Box sx={{display:"flex", flexDirection: "column", margin:"auto", justifyContent:"space-around"}}>
                <Button variant="outlined" color="primary" onClick={() =>{
                    console.log(myIcon)
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