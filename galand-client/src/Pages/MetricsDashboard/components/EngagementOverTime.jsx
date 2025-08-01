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

export function EngagementOverTime({ engagement, dates, t }) {
  const options = {
    responive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: t("TEXT_ENGAGEMENT_OVER_TIME"),
      },
    },
  };
  const data = {
    labels: dates,
    datasets: [
      {
        label: t("LABEL_LIKES"),
        data: dates.map((date) => engagement.likes_count[date]),
        borderColor: "green",
        backgroundColor: "green",
      },
      {
        label: t("LABEL_SHARES"),
        data: dates.map((date) => engagement.shares[date]),
        borderColor: "red",
        backgroundColor: "red",
      },
      {
        label: t("LABEL_COMMENTS"),
        data: dates.map((date) => engagement.count_comments[date]),
        borderColor: "grey",
        backgroundColor: "grey",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
