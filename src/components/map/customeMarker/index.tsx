import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { CustomMarkerProps } from './type'

const customMarker: React.FC<CustomMarkerProps> = ({position, text}) => {
  return (
    <Marker position={position}>
        <Popup>
              {text}      A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
  )
}

export default customMarker