import React, { useCallback, useEffect, useState } from "react";
import { SourcesDonuts } from "./components/SourcesDonuts";
import { withTranslation } from "react-i18next";
import { SentimentOverTime } from "./components/SentimentOverTime";
import TotalCount from "./components/TotalCount";
import { EngagementOverTime } from "./components/EngagementOverTime";
import { apiEndpoint } from "config";
import FilterAndSearch from "Pages/Scrapping/components/FilterAndSearch";
import GeneratePdfModal from "./components/GeneratePdfModal";
import { saveAs } from "file-saver";
import axios from "axios";
import { reportApiEndpoint } from "config";
import { alerts } from "@shared/redux";
import { connect } from "react-redux";
import { HateSpeechOverTime } from "./components/HateSpeechOverTime";
import { GBVSpeechOverTime } from "./components/GBVSpeechOverTime";
import { SentimentsAnalysisOverTime } from "./components/SentimentsAnalysisOverTime";
import { EmotionsOverTime } from "./components/EmotionsOverTime";
import { SexistHateSpeechOverTime } from "./components/SexistHateSpeechOverTime";
import { SexOfTargetOverTime } from "./components/SexOfTargetOverTime";
import { WomenStereotypeOverTime } from "./components/WomenStereotypeOverTime";
import { FalseInformationOverTime } from "./components/FalseInformationOverTime";
import { IncitementOfViolenceOverTime } from "./components/IncitementOfViolenceOverTime";
import { PortrayalOfViolenceOverTime } from "./components/PortrayalOfViolenceOverTime";

const MetricsDashboard = ({ t, alert }) => {
  const [data, setData] = useState({
    todayCount: 0,
    yesterdayCount: 0,
    facebookCount: 0,
    twitterCount: 0,
    instagramCount: 0,
    websiteCount: 0,
    youtubeCount: 0,
    neutralData: {},
    positiveData: {},
    negativeData: {},
    dates: [],
    engagement: {
      shares: {},
      count_comments: {},
      likes_count: {},
    },
    hateSpeech: {},
    gbvSpeech: {},
    sentimentsAnalysis: {},
    emotions: {},
    sexistHateSpeech: {},
    sexOfTarget: {},
    womenStereotype: {},
    falseInformation: {},
    incitementOfViolence: {},
    portrayalOfViolence: {},
  });
  const [filter, setFilter] = useState({});
  const [showAlertConfirm, setShowAlertConfirm] = useState(false);

  const getData = useCallback(() => {
    fetch(apiEndpoint + "metrics", {
      method: "POST",
      body: JSON.stringify({
        filter,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [filter]);
  useEffect(() => {
    getData();
  }, [filter]);
  const onChangeFilter = (e) => {
    const name = e.target ? e.target.name : "";
    const value = e.target ? e.target.value : "";

    if (name === "hatespeech" && value === 3) {
      const filterState = filter;
      delete filterState.hatespeech;
    } else {
      setFilter({
        ...filter,
        [name]: value,
      });
    }
  };

  const handleSubmitPdf = async (data) => {
    const { before_created, after_created, taskType, source, translate } = data;
    console.log("pdf submit", data);

    try {
      const response = await axios({
        url: reportApiEndpoint,
        method: "POST",
        data: {
          before_created,
          after_created,
          taskType: taskType ? taskType.target.value : undefined,
          source: source ? source.target.value : undefined,
          translate: translate,
        },
        responseType: "blob",
        withCredentials: true,
      });

      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        .split(";")[1]
        .split("filename=")[1]
        .trim();
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });
      saveAs(blob, fileName);
    } catch (error) {
      console.log("Error details:", error);

      // Handle blob error response
      if (error.response?.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const errorData = JSON.parse(reader.result);
            alert({
              message: errorData.error || "ALERT_GENERATE_PDF_ERROR",
              type: "error",
            });
          } catch (e) {
            alert({
              message: "ALERT_GENERATE_PDF_ERROR",
              type: "error",
            });
          }
        };
        reader.readAsText(error.response.data);
      } else {
        // Handle regular error response
        const errorMessage =
          error.response?.data?.error || "ALERT_GENERATE_PDF_ERROR";
        alert({
          message: errorMessage,
          type: "error",
        });
      }
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      className="filter-and-search"
    >
      {showAlertConfirm && (
        <div className="alert">{t("ALERT_GENERATE_PDF_ERROR")}</div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1
          style={{
            textTransform: "uppercase",
            fontFamily: "gilroy-bold",
            fontSize: "1.8em",
            color: "#515659",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          {t("NAV_METRICS_DASHBOARD")}
        </h1>
        <GeneratePdfModal onSubmit={handleSubmitPdf} />
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "12px",
        }}
      >
        <FilterAndSearch filter={filter} onChange={onChangeFilter} hideSort />
      </div>

      <div style={styles.gridContainer}>
        <div style={styles.gridItem}>
          <TotalCount
            t={t}
            todayCount={data.todayCount}
            yesterdayCount={data.yesterdayCount}
          />
        </div>
        <div style={styles.gridItem}>
          <SourcesDonuts
            t={t}
            data={{
              facebookCount: data.facebookCount,
              twitterCount: data.twitterCount,
              instagramCount: data.instagramCount,
              websiteCount: data.websiteCount,
              youtubeCount: data.youtubeCount,
            }}
          />
        </div>
        <div style={styles.gridItem}>
          <SentimentOverTime
            t={t}
            dates={data.dates}
            neutralData={data.neutralData}
            positiveData={data.positiveData}
            negativeData={data.negativeData}
          />
        </div>
        <div style={styles.gridItem}>
          <EngagementOverTime
            t={t}
            engagement={data.engagement}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <HateSpeechOverTime
            t={t}
            hateSpeech={data.hateSpeech}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <GBVSpeechOverTime
            t={t}
            gbvSpeech={data.gbvSpeech}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <SentimentsAnalysisOverTime
            t={t}
            sentimentsAnalysis={data.sentimentsAnalysis}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <EmotionsOverTime t={t} emotions={data.emotions} dates={data.dates} />
        </div>
        <div style={styles.gridItem}>
          <SexistHateSpeechOverTime
            t={t}
            sexistHateSpeech={data.sexistHateSpeech}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <SexOfTargetOverTime
            t={t}
            sexOfTarget={data.sexOfTarget}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <WomenStereotypeOverTime
            t={t}
            womenStereotype={data.womenStereotype}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <FalseInformationOverTime
            t={t}
            falseInformation={data.falseInformation}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <IncitementOfViolenceOverTime
            t={t}
            incitementOfViolence={data.incitementOfViolence}
            dates={data.dates}
          />
        </div>
        <div style={styles.gridItem}>
          <PortrayalOfViolenceOverTime
            t={t}
            portrayalOfViolence={data.portrayalOfViolence}
            dates={data.dates}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // Two columns of equal width
    gridTemplateRows: "repeat(2, 1fr)", // Two rows of equal height
    height: "100vh", // Full height of the viewport
    gap: "10px", // Optional gap between sections
  },
  gridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ccc", // Optional border for clarity
    fontSize: "20px",
    padding: "20px",
    backgroundColor: "#ffffff", // Optional background color
  },
};

function mapDispatchToProps(dispatch) {
  return {
    alert: (data) => dispatch(alerts.addAlert(data)),
  };
}

export default withTranslation()(
  connect(null, mapDispatchToProps)(MetricsDashboard)
);
