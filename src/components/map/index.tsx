import { Box } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet'
import { MarkerInfo } from './type';
import { useState } from 'react';
import MapInteractionComponent from './mapInteraction';
import { MarkerContext } from './context';

const MapComponent: React.FC = () => {

    const state = useState<MarkerInfo[]>([]);
    const [markersList, ] = state;

    return (
        <Box sx={{width:"100%", display:"flex", flexDirection:"column"}}>
            <MapContainer id="map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    markersList?.map(({position, text}) => {
						if (position === undefined) {
							return <></>
						}
                        return (
                            <Marker position={position} >
                                <Popup>
                                    {text}
                                </Popup>
                            </Marker>
                        )
                    })
                }
               
            </MapContainer>
            <MarkerContext.Provider value={state}>
                <MapInteractionComponent />
            </MarkerContext.Provider>
        </Box>
    )
}

export default MapComponent; 