import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ActionButtonProps } from "utils/atoms/buttonGroup/actionButtonGroup/type";
import { Road } from "./type";

const url = "http://localhost:5555/roads";

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

    useEffect(() => {
        const requestRoads = (async () => {
            const rawResponse = await fetch(url, {
                method: 'GET',
                headers:{
                  'Content-type':'application/json', 
                  "token":sessionStorage.getItem("token")!,
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
    
        
        requestRoads().then((response) => {
            const castRoads = castAll(response);
            setRoads(castRoads);
        });
    
    }, []);
    
    return {
        columns,
        roads,
    }
}