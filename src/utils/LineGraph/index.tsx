import React from 'react'
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Legend, ReferenceLine, Line, Tooltip } from 'recharts'
import { LineGraphComponenentProps } from './type';

const LineGraphComponent: React.FC<LineGraphComponenentProps> = ({lines, referenceLines, id}) => {
    return (
        <ResponsiveContainer id={id} className="LineGraphWrapper" width="95%" height="30%">
            <LineChart
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="key" />
                <YAxis />
                <Tooltip />
                <Legend />
                {
                    referenceLines?.map(({x, y, stroke, label, dashed}, index) => {
                        return <ReferenceLine x={x} y={y} stroke={stroke} label={label} strokeDasharray={dashed} key={index}/>
                    })
                }
                {
                    lines.map(({data, type, stroke, name}) => {
                        return <Line type={type} data={data} dataKey="value" name={name} stroke={stroke} key={name}/>
                    })
                }
            </LineChart>
        </ResponsiveContainer>);
}

export default LineGraphComponent;