import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const commonOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const generateFakeData = (labels) => {
  return labels.map(() => Math.floor(Math.random() * 100));
};

export const TopicOfContentChart = () => {
  const labels = [
    "Politics",
    "Elections",
    "Sports/Entertainment",
    "Business/Economics",
    "Technology",
    "Social Issues",
    "Other",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Topic of Content",
        data: generateFakeData(labels),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
        ],
      },
    ],
  };
  return (
    <Pie
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Topic of Content" },
        },
      }}
    />
  );
};

export const PurposeOfPostChart = () => {
  const labels = [
    "Informative",
    "Opinions/Reviews",
    "Promotion/Advertisement",
    "Advocacy",
    "Other",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Purpose of Post",
        data: generateFakeData(labels),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Purpose of Post" },
        },
      }}
    />
  );
};

export const EmotionConveyedChart = () => {
  const labels = [
    "Happy",
    "Sad",
    "Angry/Disgusted",
    "Fearful",
    "Ridicule/Mockery",
    "Confused/Shocked",
    "None",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Emotion Conveyed",
        data: generateFakeData(labels),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
        ],
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Emotion Conveyed" },
        },
      }}
    />
  );
};

export const CallToActionChart = () => {
  const labels = [
    "Yes, to vote",
    "Yes, to share",
    "Yes, to participate",
    "Yes, call to violence",
    "Yes, other",
    "No call to action",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Call to Action",
        data: generateFakeData(labels),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };
  return (
    <Line
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Call to Action" },
        },
      }}
    />
  );
};

export const CategoriesOfHateChart = () => {
  const labels = [
    "Threat",
    "Profanity",
    "Toxicity",
    "Insult",
    "Attack on Identity",
    "Sectarian",
    "Sectarian Affiliation",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Categories of Hate",
        data: generateFakeData(labels),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
        ],
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Categories of Hate" },
        },
      }}
    />
  );
};

export const TypeOfDisOrMisinformationChart = () => {
  const labels = [
    "Fabricated Content",
    "Manipulated Content",
    "Misleading Content",
    "Imposter Content",
    "Satire and Parody",
    "False Connections",
    "Propaganda",
    "Error",
    "Other",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Type of Dis/Misinformation",
        data: generateFakeData(labels),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
          "#C9CBCF",
          "#B7B7B7",
        ],
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Type of Dis/Misinformation" },
        },
      }}
    />
  );
};

export const PortrayalOfViolenceChart = () => {
  const labels = [
    "Incitement of Violence",
    "Threats and Intimidation",
    "Depictions of Incompetence",
    "Spreading Misleading News",
    "Marginalization",
    "Rape Threats",
    "Sexual Harassment",
    "Other",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Portrayal of Violence",
        data: generateFakeData(labels),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
          "#B7B7B7",
        ],
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Portrayal of Violence" },
        },
      }}
    />
  );
};

export const PositiveDiscourseAboutWomenChart = () => {
  const labels = ["True", "False"];
  const data = {
    labels,
    datasets: [
      {
        label: "Positive Discourse About Women",
        data: generateFakeData(labels),
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  return (
    <Pie
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Positive Discourse About Women" },
        },
      }}
    />
  );
};

export const DoesPostContainFalseInformationChart = () => {
  const labels = ["True", "False"];
  const data = {
    labels,
    datasets: [
      {
        label: "Does the Post Contain False Information?",
        data: generateFakeData(labels),
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };
  return (
    <Bar
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            display: true,
            text: "Does the Post Contain False Information?",
          },
        },
      }}
    />
  );
};

export const NatureOfDiscriminatoryLanguageChart = () => {
  const labels = [
    "Sexism/Misogyny",
    "Xenophobia",
    "Anti-western Sentiments",
    "Other",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Nature of Discriminatory Language",
        data: generateFakeData(labels),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };
  return (
    <Line
      data={data}
      options={{
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: { display: true, text: "Nature of Discriminatory Language" },
        },
      }}
    />
  );
};
