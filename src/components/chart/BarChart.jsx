import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     success: 2400,
//   },
//   {
//     name: "Page B",
//     success: 1398,
//   },
//   {
//     name: "Page C",
//     success: 9800,
//   },
//   {
//     name: "Page D",
//     success: 3908,
//   },
//   {
//     name: "Page E",
//     success: 4800,
//   },
//   {
//     name: "Page F",
//     Success: 3800,
//   },
//   {
//     name: "Page G",
//     success: 4300,
//     amt: 2100,
//   },

//   {
//     name: "Page G",
//     success: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Page G",
//     success: 4300,
//     amt: 2100,
//   },
//   {
//     name: "Page G",
//     success: 4300,
//     amt: 2100,
//   },
// ];

const data = [];

for (var i = 0; i < 31; i++) {
  data.push({
    name: i,
    success: 100,
    fail: 100,
  });
}

const BasicBarChart = ({ status }) => {
  return (
    <ResponsiveContainer width="125%" height="100%">
      <BarChart
        width={700}
        height={300}
        data={data}
        margin={{
          top: 30,
        }}
      >
        <CartesianGrid strokeOpacity={0} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={status}
          fill={
            status === "success"
              ? "rgba(55, 152, 219, 1)"
              : "rgba(231, 76, 60, 1)"
          }
          barSize={3}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BasicBarChart;
