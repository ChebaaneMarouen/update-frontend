import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import Checked from "../../../assests/checked.png";
import { News } from "modules/ressources";
import { connect } from "react-redux";
import { Button } from "adminlte-2-react";

function mapDispatchToProps(dispatch) {
  return {
    updateNews: (data) => dispatch(News.update(data)),
    getNews: (id) => dispatch(News.getOne(id)),
  };
}

class DisplayOccurences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: {},
      loading: false,
    };
  }

  componentDidMount() {
    if (this.props.occurences.length > 0) {
      this.fetchNews();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.occurences !== this.props.occurences &&
      this.props.occurences.length > 0
    ) {
      this.fetchNews();
    }
  }

  fetchNews = async () => {
    try {
      const news = await this.props.getNews(this.props.occurences[0].newsId);
      this.setState({ newsData: news });
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  handleFinalize = async () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    try {
      await this.props.updateNews({ ...this.state.newsData, finalized: true });
      this.setState((prevState) => ({
        newsData: { ...prevState.newsData, finalized: true },
        loading: false,
      }));
    } catch (error) {
      console.error("Error finalizing news:", error);
      this.setState({ loading: false });
    }
  };
  render() {
    const { occurences, lang, t } = this.props;
    const { newsData, loading } = this.state;

    if (!occurences.length) return null;
    console.log("occurences", occurences);
    return (
      <div className={lang === "ar" ? "pull-left" : "pull-right"}>
        {occurences.map((occ, i) => (
          <div
            key={occ.name + i}
            className="d-flex align-items-center"
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginRight: "16px",
            }}
          >
            <a
              className="text-white"
              title={occ.newsTitle}
              href={"/news/" + occ.newsId}
            >
              <img className="img-fluid" src={Checked} alt="checked" />
            </a>
            {/*newsData ? (
              !newsData.finalized ? (
                <Button
                  className="ml-2"
                  onClick={this.handleFinalize}
                  disabled={loading}
                  style={{ backgroundColor: "#007bff" }}
                  text={t("BTN_FINALIZE") + " +"}
                />
              ) : (
                <Button
                  className="ml-2"
                  disabled
                  style={{ backgroundColor: "grey" }}
                  text={t("BTN_FINALIZED")}
                />
              )
            ) : null */}
          </div>
        ))}
      </div>
    );
  }
}

DisplayOccurences.defaultProps = {
  occurences: [],
};

DisplayOccurences.propTypes = {
  occurences: PropTypes.arrayOf(
    PropTypes.shape({
      newsId: PropTypes.string,
      type: PropTypes.string,
      newsTitle: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  lang: PropTypes.string,
  t: PropTypes.func.isRequired,
  updateNews: PropTypes.func.isRequired,
  getNews: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(withTranslation()(DisplayOccurences));
