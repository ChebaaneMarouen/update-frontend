export const apiEndpoint =
  (process.env.REACT_APP_HOST.split(",")[0] || "") + "/api/manager/";
export const apiEndpoint2 =
  (process.env.REACT_APP_HOST.split(",")[0] || "") + "/api/manager";
export const feedApiEndpoint =
  (process.env.REACT_APP_HOST.split(",")[0] || "") + "/api/manager/feed-excel";
export const NewsApiEndpoint =
  (process.env.REACT_APP_HOST.split(",")[0] || "") + "/api/manager/news-excel";
export const reportApiEndpoint =
  (process.env.REACT_APP_HOST.split(",")[0] || "") + "/api/manager/report-pdf";
export const excel_count = process.env.REACT_APP_HOST.split(",")[1] || 100;
export const analyticLink = process.env.REACT_APP_ANALYTIC;
export const processedVideoURL =
  window.location.protocol +
  "//" +
  window.location.host +
  "/api/video-preprocessed/files/";
export const googleSearchApi =
  "https://www.google.com/searchbyimage?encoded_image=&image_content=&filename=&hl=fr&image_url=";
export const roles = {
  Journaliste: 0,
  Moniteur: 1,
  "Super moniteur": 2,
  Décideur: 3,
  Administrateur: 4,
  0: "Journaliste",
  1: "Moniteur",
  2: "Super moniteur",
  3: "Décideur",
  4: "Administrateur",
};
const endPoint = "/api/manager/";
export const endPoint2 = "/api/manager";
export const socketConf = {
  path: `${endPoint}socket.io`,
};
