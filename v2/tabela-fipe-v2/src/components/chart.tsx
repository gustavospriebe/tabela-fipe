import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function ChartComponent({ priceThreeMonths }: any) {
    return (
        <div>
            <LineChart
                width={600}
                height={400}
                data={priceThreeMonths}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="x" />
                <YAxis />
                <Line
                    type="monotone"
                    dataKey="y"
                    fill="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Tooltip
                    wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                />
            </LineChart>
        </div>
    );
}
