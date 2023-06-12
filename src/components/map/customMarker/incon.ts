import L from 'leaflet';
import img from 'leaflet/dist/images/marker-icon.png'

const myIcon = new L.Icon({
    iconUrl: img,
    iconRetinaUrl: img,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});

export { myIcon };