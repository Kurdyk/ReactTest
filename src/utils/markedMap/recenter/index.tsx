import React, { useEffect } from 'react'
import { RecenterProps } from './type'
import { useMap } from 'react-leaflet';

const RecenterMapComponent: React.FC<RecenterProps> = ({position}) =>  {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, [position, map]);
    return null;
  
}

export default RecenterMapComponent