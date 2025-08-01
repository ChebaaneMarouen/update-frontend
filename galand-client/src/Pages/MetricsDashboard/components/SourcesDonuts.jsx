import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function SourcesDonuts({ t, data }) {
  const {
    facebookCount,
    twitterCount,
    websiteCount,
    instagramCount,
    youtubeCount,
  } = data;
  const options = {
    responive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: t("TEXT_SOURCES_BEAKDOWN"),
      },
    },
  };
  const dataDonuts = {
    labels: [
      "Facebook" + " (" + facebookCount + ")",
      "Twitter" + " (" + twitterCount + ")",
      "Website" + " (" + websiteCount + ")",
      "Instagram" + " (" + instagramCount + ")",
      "Youtube" + " (" + youtubeCount + ")",
    ],
    datasets: [
      {
        label: t("TEXT_SOURCES_BEAKDOWN"),
        data: [
          facebookCount,
          twitterCount,
          websiteCount,
          instagramCount,
          youtubeCount,
        ],
        backgroundColor: [
          "#0866ff",
          "#1DA1F2",
          "#AAB8C2",
          "#F56040",
          "#FF0000",
        ],
        borderColor: ["#0866ff", "#1DA1F2", "#AAB8C2", "#F56040", "#FF0000"],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={dataDonuts} options={options} />;
}
