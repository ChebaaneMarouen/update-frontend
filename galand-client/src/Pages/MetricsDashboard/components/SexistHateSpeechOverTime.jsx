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

export function SexistHateSpeechOverTime({ sexistHateSpeech, dates, t }) {
  const categories = ["Anti-Feminism/Misogyny", "Other"];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: t("TEXT_SEXIST_HATE_SPEECH_OVER_TIME"),
      },
    },
  };

  const datasets = categories.map((category) => ({
    label: category,
    data: dates.map(
      (date) =>
        (sexistHateSpeech[date] && sexistHateSpeech[date][category]) || 0
    ),
    borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
  }));

  const data = { labels: dates, datasets };

  return <Line options={options} data={data} />;
}
