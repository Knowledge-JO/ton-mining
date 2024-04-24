import React from "react";
import { Chart } from "react-google-charts";
import { Box } from "@chakra-ui/react";

export const data = [
  ["Month", "Sales", "Expenses", "Norm"],
  ["SEP", 10000, 4000, 2000],
  ["OCT", 15600, 4600, 7800],
  ["NOV", 6600, 11200, 3190],
  ["DEC", 10300, 5400, 9800],
];

export const options = {
  //   title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom", textStyle: { color: "#fff" } },
  backgroundColor: "#8F6AFB",
  hAxis: {
    textStyle: { color: "#fff" },
    gridlines: { color: "transparent" },
  },
  vAxis: {
    textStyle: { color: "transparent" },
    gridlines: { color: "transparent" },
  },
  colors: ["#E3A6A6", "#501EE1", "#B41FAE"],
  isStacked: true,
};

export function MonthChart() {
  return (
    <Chart
      chartType="AreaChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}
export const computeData = [
  ["Month", "Sales", "Expenses", "Norm", "Who", "What"],
  ["17", 0, 30, 27, 40, 28],
  ["18", 33, 29, 13, 50, 26],
  ["19", 55, 30, 19, 26, 24],
  ["20", 24, 32, 14, 43, 24],
  ["21", 31, 25, 46, 17, 39],
];

export const computeOptions = {
  //   title: "Company Performance",
  curveType: "function",
  legend: { position: "none", textStyle: { color: "#fff" } },
  backgroundColor: "#301287",
  hAxis: {
    textStyle: { color: "#fff" },
    gridlines: { color: "transparent" },
  },
  vAxis: {
    textStyle: { color: "transparent" },
    gridlines: { color: "transparent" },
  },
  colors: ["#E3A6A6", "#501EE1", "#B41FAE"],
  isStacked: true,
};

export function ComputeChart() {
  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="300px"
      data={computeData}
      options={computeOptions}
    />
  );
}
