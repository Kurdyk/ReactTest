import { useState } from "react"
import { SensorChartData, SensorChartDataType, TimeScale } from "./type";
import LineGraphComponent from "utils/LineGraph";
import BarGraphComponent from "utils/barGraph";

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
        const len = [...data].length; // .lenght doesn't directly work for some reason
        // console.log(`len : ${len}, data : ${data}, ${typeof data}`)
        switch (timeScale) {
            case "Jour" as TimeScale:
                setChartData([{name:dataType, stroke:"orange", 
                data:data.map((value:number, index:number) => { // set the values
                    return {
                        key: `J-${Math.abs(index-len)}`,
                        value: value,
                    }
                })}])
                break;
            case "Semaine" as TimeScale:
                setChartData([{name:dataType, stroke:"orange", 
                data:data.map((value:number, index:number) => { // set the values
                    return {
                        key: `S-${Math.abs(index-len)}`,
                        value: value,
                    }
                })}])
                break;
            case "Mois" as TimeScale:
                setChartData([{name:dataType, stroke:"orange", 
                data:data.map((value:number, index:number) => { // set the values
                    return {
                        key: `M-${Math.abs(index-len)}`,
                        value: value,
                    }
                })}])
                break;
            case "Années" as TimeScale:
                setChartData([{name:dataType, stroke:"orange", 
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
    const toogleButtons = [{id:1, value:"Wear", buttonText:"Wear"}, {id:2, value:"Usage", buttonText:"Usage"}]
    const changeHandler = () => {
        if (dataType === "Wear") {
            setDataType("Usage")
        } else {
            setDataType("Wear")
        }
    };

    const display = () => {
        if (dataType === "Wear") {
            return <LineGraphComponent lines={chartData} id={'WearGraph'} />
        } else {
            return <BarGraphComponent bars={chartData} id={"UsageGraoh"} />
        }
    }

    return ({
        timeScale, 
        setTimeScale,
        dataType,
        setDataType,
        setChartData,
        display,
        toogleButtons,
        changeHandler,
    })
}