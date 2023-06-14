import { Line } from "utils/LineGraph/type";
import { Bar } from "utils/barGraph/type";

export type Sensor = {
    sensorId: string,
    currentWear: number, // usure
    currentUsage: number,
    wearGraph: any,
    usageGraph: any,
    position: [number, number],
}

export type TimeScale = "Années" | "Mois" | "Semaine" | "Jour";
export type SensorChartDataType = "Wear" | "Usage"
export type SensorChartData = Line[] | Bar[] ;