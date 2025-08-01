import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function SentimentOverTime({
  negativeData,
  positiveData,
  neutralData,
  dates,
  t,
}) {
  const options = {
    responive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: t("TEXT_SENTIMENT_OVER_TIME"),
      },
    },
  };
  const data = {
    labels: dates,
    datasets: [
      {
        label: "positive",
        data: dates.map((date) => positiveData[date]),
        borderColor: "green",
        backgroundColor: "green",
      },
      {
        label: "Negative",
        data: dates.map((date) => negativeData[date]),
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: "Neutral",
        data: dates.map((date) => neutralData[date]),
        borderColor: "grey",
        backgroundColor: "grey",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
