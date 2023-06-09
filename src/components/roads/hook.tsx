import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { DispayableRoad, Road } from "./type";
import { Sensor } from "components/sensor/type";

const roadsUrl = "http://localhost:5555/roads";
const sensorsUrl = "http://localhost:5555/sensors";

// utils
const castToRowData = (roadString:string) => {
    const replaceRegex = /| |"/g;
    const filtered = roadString.replaceAll(replaceRegex, "");
    const roadObject = JSON.parse(filtered);
    return roadObject;
}

const castAll = (rawData:string[]) => {
    return rawData.map((userString, index) => {
        const asObject = castToRowData(userString);
        asObject["id"] = index;
        return asObject;
    })
}

const join = (sensors:Sensor[], roads:Road[]):DispayableRoad[] => {
    const result = Array<DispayableRoad>();
    var cmpt = 0;
    roads.forEach(({street, postalCode, city, sensorsIdList, roadId}) => {
        sensors.forEach(({currentWear, sensorId}) => {
            if (sensorId in sensorsIdList) {
                result.push({
                    road: `${street}\n${postalCode} ${city}`,
                    id:cmpt++,
                    sensor: `sensor${sensorId}`,
                    wear:currentWear,
                    usage:0
                } as DispayableRoad) 
            }      
        })
    })
    return result;
}

// UseData
export const useData = () => {

    // Columns
    const columns = [
        {
            field:"road",
            headerName:"Route",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
        {
            field:"sensor",
            headerName:"Capteur",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
        {
            field:"wear",
            headerName:"Usure",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
        {
            field:"usage",
            headerName:"Nb passages/jour",
            width: 150,
            align: "center",
            headerAlign: "center",
        },
    ] as GridColDef[];

    // Rows
    const [roads, setRoads] = useState<Road[]>([]);
    const [sensors, setSensors] = useState<Sensor[]>([]);

    useEffect(() => {
        const requestRoads = (async () => {
            const rawResponse = await fetch(roadsUrl, {
                method: 'GET',
                headers:{
                  'Content-type':'application/json', 
                }})
            
            if (rawResponse.status !== 200) {
                const error = await rawResponse.json()
                console.log(error["message"])
                return;
            }
            
            const content = await rawResponse.json();
            const roadData = content["content"]
            return roadData;
        });
    
        
        requestRoads().then((response) => {
            const castRoads = castAll(response);
            setRoads(castRoads);
        });
    
    }, []);

    useEffect(() => {
        const requestSensors = (async () => {
            const rawResponse = await fetch(sensorsUrl, {
                method: 'GET',
                headers:{
                  'Content-type':'application/json', 
                }})
            
            if (rawResponse.status !== 200) {
                const error = await rawResponse.json()
                console.log(error["message"])
                return;
            }
            
            const content = await rawResponse.json();
            const userData = content["content"]
            return userData;
        });
    
        
        requestSensors().then((response) => {
            const castSensors = castAll(response);
            setSensors(castSensors);
        });
    
    }, []);

    const displayableRoads = join(sensors, roads);
    
    return {
        columns,
        displayableRoads,
    }
}