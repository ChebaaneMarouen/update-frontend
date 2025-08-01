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

export function PortrayalOfViolenceOverTime({ portrayalOfViolence, dates, t }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: t("TEXT_PORTRAYAL_OF_VIOLENCE_OVER_TIME"), //"Portrayal of Violence Over Time",
      },
    },
  };
  const categories = ["Threats and Intimidation"];

  const datasets = categories.map((category) => ({
    label: category,
    data: dates.map(
      (date) =>
        (portrayalOfViolence[date] && portrayalOfViolence[date][category]) || 0
    ),
    borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
  }));

  const data = { labels: dates, datasets };

  return <Line options={options} data={data} />;
}
