import { useState } from "react"
import { SensorChartData, SensorChartDataType, SensorPresentationInfo, TimeScale } from "./type";
import LineGraphComponent from "utils/LineGraph";
import BarGraphComponent from "utils/barGraph";
import { Box, Typography } from "@mui/material";

export const fetchData = (timeScale:TimeScale, sensorId:number,
                         dataType:SensorChartDataType, 
                         setChartData:React.Dispatch<React.SetStateAction<SensorChartData>>,
                         setPresentationInfo: React.Dispatch<React.SetStateAction<SensorPresentationInfo>>) => {

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
        // presentation data
        const presentationData = content["sensorInfo"] as SensorPresentationInfo;
        console.log(presentationData);
        setPresentationInfo(presentationData);

        // graph data
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

    // Init
    const [timeScale, setTimeScale] = useState<TimeScale>("Jour");
    const [dataType, setDataType] = useState<SensorChartDataType>("Wear");
    const [chartData, setChartData] = useState<SensorChartData>([]);
    const [presentationInfo, setPresentationInfo] = useState<SensorPresentationInfo>({
        roadName : "default",
        postalCode : -1,
        sensorId : -1,
        currentWear : -1,
        roadCoordinates : [[-1, -1], [1, 1]],
        sensorCoordinates : [0, 0],
    });
    const toogleButtons = [{id:1, value:"Wear", buttonText:"Wear"}, {id:2, value:"Usage", buttonText:"Usage"}]

    const changeHandler = () => {
        if (dataType === "Wear") {
            setDataType("Usage")
        } else {
            setDataType("Wear")
        }
    };

    // diplay functions
    const displayGraph = () => {
        if (dataType === "Wear") {
            return <LineGraphComponent lines={chartData} id={'WearGraph'} />
        } else {
            return <BarGraphComponent bars={chartData} id={"UsageGraph"} />
        }
    }

    const displayPresentation = () => {
        return (
            <Box id="SensorInfo">
                <Typography variant="h3">{`${presentationInfo?.roadName}\n${presentationInfo?.postalCode}`}</Typography>
                <Typography variant="h5">{`CAP_${presentationInfo?.postalCode}_${presentationInfo?.sensorId}`}</Typography>
                <Typography variant="h5">{`Taux d'usure actuel : ${presentationInfo?.currentWear}%`}</Typography>
            </Box>
        )
    }

    return ({
        timeScale, 
        setTimeScale,
        dataType,
        setChartData,
        display: displayGraph,
        toogleButtons,
        changeHandler,
        setPresentationInfo,
        displayPresentation,
        presentationInfo,
    })
}