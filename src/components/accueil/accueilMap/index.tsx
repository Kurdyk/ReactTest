import { Box } from '@mui/material'
import React from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { accueilMarkers, greenIcon } from './const'

const AccueilMapComponent: React.FC = () => {
  return (
    <Box sx={{width:"100%", display:"flex", flexDirection:"column"}}>
            <MapContainer id="mapAccueil" center={[48.866667, 2.333333]} zoom={15} scrollWheelZoom={false} zoomControl ={false} 
            attributionControl = {false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>   
            {
                accueilMarkers?.map((position) => {
                    if (position === undefined) {
                        return <></>
                    }
                    return (
                        <Marker position={position} icon={greenIcon} opacity={0.7}/>
                    )
                })
            }
            </MapContainer>
        </Box>
  )
}

export default AccueilMapComponent;