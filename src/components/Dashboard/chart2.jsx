import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  // {
  //   name: "Page A",
  //   uv: 4000,
  //   pv: 2400,
  //   amt: 2400,
  // },
  // {
  //   name: "Page B",
  //   uv: 3000,
  //   pv: 1398,
  //   amt: 2210,
  // },
  // {
  //   name: "Page C",
  //   uv: 2000,
  //   pv: 9800,
  //   amt: 2290,
  // },
  // {
  //   name: "Page D",
  //   uv: 2780,
  //   pv: 3908,
  //   amt: 2000,
  // },
  // {
  //   name: "Page E",
  //   uv: 1890,
  //   pv: 4800,
  //   amt: 2181,
  // },
  // {
  //   name: "Page F",
  //   uv: 2390,
  //   pv: 3800,
  //   amt: 2500,
  // },
  // {
  //   name: "Page G",
  //   uv: 3490,
  //   pv: 4300,
  //   amt: 2100,
  // },
];

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={600}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="uv"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const areaData = [
  // {
  //   name: "Page A",
  //   uv: 4000,
  //   pv: 2400,
  //   amt: 2400,
  // },
  // {
  //   name: "Page B",
  //   uv: 3000,
  //   pv: 1398,
  //   amt: 2210,
  // },
  // {
  //   name: "Page C",
  //   uv: 2000,
  //   pv: 9800,
  //   amt: 2290,
  // },
  // {
  //   name: "Page D",
  //   uv: 2780,
  //   pv: 3908,
  //   amt: 2000,
  // },
  // {
  //   name: "Page E",
  //   uv: 1890,
  //   pv: 4800,
  //   amt: 2181,
  // },
  // {
  //   name: "Page F",
  //   uv: 2390,
  //   pv: 3800,
  //   amt: 2500,
  // },
  // {
  //   name: "Page G",
  //   uv: 3490,
  //   pv: 4300,
  //   amt: 2100,
  // },
];

export class AreaExample extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/stacked-area-chart-ix341";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={600}
          height={400}
          data={areaData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* <Tooltip /> */}
          {/* <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
