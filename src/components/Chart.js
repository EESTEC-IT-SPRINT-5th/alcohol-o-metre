import React from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

const Chart = (props) => {
    
    return (
        <div>
            <LineChart width={600} height={300} data={props.data}>
                <Line type="monotone" dataKey="per" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
        </div>
    )
}

export default Chart
