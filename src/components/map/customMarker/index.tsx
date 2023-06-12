import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { CustomMarkerProps } from './type'
import { myIcon } from './incon'

const customMarker: React.FC<CustomMarkerProps> = ({position, text}) => {
  return (
    <Marker position={position} icon={myIcon}>
        <Popup>
              {text}
        </Popup>
    </Marker>
  )
}

export default customMarker