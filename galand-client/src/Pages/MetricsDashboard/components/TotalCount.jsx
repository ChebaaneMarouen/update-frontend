import React from "react";
const TotalCount = ({ t, todayCount, yesterdayCount }) => {
  const rapport = ((todayCount - yesterdayCount) / (yesterdayCount || 1)) * 100;
  return (
    <div style={styles.totalVolume}>
      <div>
        <h4>{t("TITLE_TOTAL_COUNT")}</h4>
        <div className="d-flex" style={{ alignItems: "center", gap: "10px" }}>
          <div
            style={{
              fontSize: "50px",
              color: "#757575",
            }}
          >
            {todayCount} /
          </div>

          <div className="d-flex flex-column">
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "#28a745",
                display: "flex",
                alignItems: "center",
              }}
            >
              {rapport > 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.63595 18.364C5.24542 17.9734 5.24542 17.3403 5.63595 16.9498L16.9497 5.63605C17.3402 5.24553 17.9733 5.24553 18.3639 5.63605C18.7544 6.02658 18.7544 6.65974 18.3639 7.05026L7.05016 18.364C6.65963 18.7545 6.02647 18.7545 5.63595 18.364Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.6568 15.8284C17.1045 15.8284 16.6568 15.3807 16.6568 14.8284L16.6568 7.34316L9.17148 7.34316C8.61919 7.34316 8.17148 6.89544 8.17148 6.34316C8.17148 5.79087 8.61919 5.34316 9.17148 5.34316L17.6568 5.34316C18.209 5.34316 18.6568 5.79087 18.6568 6.34316L18.6568 14.8284C18.6568 15.3807 18.209 15.8284 17.6568 15.8284Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.63603 5.63607C6.02655 5.24554 6.65972 5.24554 7.05024 5.63607L18.3639 16.9498C18.7545 17.3403 18.7545 17.9735 18.3639 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L5.63603 7.05028C5.2455 6.65976 5.2455 6.02659 5.63603 5.63607Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.17156 17.6569C8.17156 17.1046 8.61928 16.6569 9.17156 16.6569L16.6568 16.6569V9.1716C16.6568 8.61932 17.1046 8.1716 17.6568 8.1716C18.2091 8.1716 18.6568 8.61932 18.6568 9.1716L18.6568 17.6569C18.6568 18.2092 18.2091 18.6569 17.6568 18.6569L9.17156 18.6569C8.61928 18.6569 8.17156 18.2092 8.17156 17.6569Z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}{" "}
              {rapport.toFixed(2)}%
            </div>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                color: "#757575",
              }}
            >
              {t("LABEL_PREVIOUS")} :{" "}
              <b className="color-black">{yesterdayCount}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const styles = {
  totalVolume: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default TotalCount;
