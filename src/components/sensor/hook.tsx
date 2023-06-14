import { useState } from "react"
import { SensorChartData, SensorChartDataType, TimeScale } from "./type";

export const fetchData = (timeScale:TimeScale, sensorId:number,
                         dataType:SensorChartDataType, 
                         setChartData:React.Dispatch<React.SetStateAction<SensorChartData>>) => {


    const url = `http://localhost:5555/sensor/${sensorId}/${dataType}/${timeScale}`;
    const requestData = (async () => {
        const rawResponse = await fetch(url, {
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
        const data = content["content"];
        return data;
    });

    requestData().then((data) => {
        const len = data.lenght;
        switch (timeScale) {
            case "Jour" as TimeScale:
                setChartData([{name:dataType, stroke:"red", 
                data:data.map((value:number, index:number) => { // set the values
                    return {
                        key: `J-${Math.abs(index-len)}`,
                        value: value,
                    }
                })}])
                break;
            case "Semaine" as TimeScale:
                setChartData([{name:dataType, stroke:"red", 
                data:data.map((value:number, index:number) => { // set the values
                    return {
                        key: `S-${Math.abs(index-len)}`,
                        value: value,
                    }
                })}])
                break;
            case "Mois" as TimeScale:
                setChartData([{name:dataType, stroke:"red", 
                data:data.map((value:number, index:number) => { // set the values
                    return {
                        key: `M-${Math.abs(index-len)}`,
                        value: value,
                    }
                })}])
                break;
            case "Années" as TimeScale:
                setChartData([{name:dataType, stroke:"red", 
                data:data.map((value:number, index:number) => { // set the values
                    return {
                        key: `A-${Math.abs(index-len)}`,
                        value: value,
                    }
                })}])
                break;
        }
    })
    
}

export const useData = () => {

    const [timeScale, setTimeScale] = useState<TimeScale>("Jour");
    const [dataType, setDataType] = useState<SensorChartDataType>("Wear");
    const [chartData, setChartData] = useState<SensorChartData>([]);

    return ({
        timeScale, 
        setTimeScale,
        dataType,
        setDataType,
        chartData,
        setChartData,
    })
}