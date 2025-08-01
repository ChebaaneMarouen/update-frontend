import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import CronBuilderInput from "components/CronBuilderInput";
import Select from "components/Select";
import { Row, Col, Inputs } from "adminlte-2-react";
const { Text, ImportWrapper, Checkbox } = Inputs;

const timeLimitList = ["LABEL_NO_LIMIT","LABEL_LAST_HOUR", "LABEL_LAST_3_HOURS", "LABEL_LAST_6_HOURS", "LABEL_LAST_12_HOURS", "LABEL_LAST_DAY", "LABEL_LAST_2_DAYS", "LABEL_LAST_3_DAYS" ,"LABEL_LAST_WEEK", "LABEL_LAST_2_WEEKS", "LABEL_LAST_MONTH", "LABEL_LAST_3_MONTHS", "LABEL_LAST_6_MONTHS","LABEL_LAST_YEAR"];

class MediaUrlForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange, value } = this.props;
    const { name } = e.target;
    const itemValue = e.target.value;
    onChange({
      target: {
        value: {
          ...value,
          [name]: itemValue
        }
      }
    });
  }

  render() {
    const { buttonRight, mediaList, value, onChange, t } = this.props;
    return (
      <ImportWrapper labelSm={0} sm={12} buttonRight={buttonRight}>
        <Row>
          <Col sm={value.source === "facebook" || value.source === "twitter"?"2":"4"}>
            <Text
              iconLeft={"fa-link"}
              placeholder={t("LABEL_URL")}
              value={value.url}
              sm={12}
              labelSm={0}
              inputType="url"
              name="url"
              onChange={this.onChange}
            />
          </Col>
          <Col sm={value.source === "facebook" || value.source === "twitter"?"2":"3"}>
            <Select
              placeholder={t("LABEL_MEDIA_TYPE")}
              options={mediaList.map(t => ({
                label: t,
                value: t
              }))}
              sm={12}
              labelSm={0}
              name="source"
              value={value.source}
              onChange={this.onChange}
            />
          </Col>
          {value.source === "website" ? <Col sm="2">
            <Text
              placeholder={t("LABEL_PSEUDO_URL")}
              sm={12}
              labelSm={0}
              name="pseudoUrl"
              value={value.pseudoUrl}
              onChange={this.onChange}
            />
            </Col> : null}
              {value.source === "twitter" ?
              <React.Fragment>              
              <Col sm="1">
              <Checkbox
                text={t("LABEL_TWITTER_SEARCH")}
                sm={12}
                labelSm={0}
                name="search_twitter"
                value={!!value.search_twitter}
                onChange={() =>
                  this.onChange({
                    target: { name: "search_twitter", value: !value.search_twitter }
                  })
                }
              />
              </Col>
              <Col sm="1">
            <Checkbox
              text={t("LABEL_SCRAPER_URL")}
              sm={12}
              labelSm={0}
              name="twitter_scrapper"
              value={!!value.twitter_scrapper}
              onChange={() =>
                this.onChange({
                  target: { name: "twitter_scrapper", value: !value.twitter_scrapper }
                })
              }
            />
            </Col>
              <Col sm="2">
              <Select
              placeholder={t("LABEL_TIME_LIMIT")}
              options={timeLimitList.map(tim => ({
                label: t(tim),
                value: tim
              }))}
              sm={12}
              labelSm={0}
              name="timeLimit"
              value={value.timeLimit}
              onChange={this.onChange}
            />
              </Col>
              </React.Fragment>: null
            }
            {value.source === "facebook" ? 
            <React.Fragment><Col sm="2">
            <Checkbox
              text={t("LABEL_CROWDTANGLE_URL")}
              sm={12}
              labelSm={0}
              name="crowdTangle"
              value={!!value.crowdTangle}
              onChange={() =>
                this.onChange({
                  target: { name: "crowdTangle", value: !value.crowdTangle }
                })
              }
            />
            </Col>
            <Col sm="2">
            <Checkbox
              text={t("LABEL_CROWDTANGLE_SEARCH")}
              sm={12}
              labelSm={0}
              name="search_crowdTangle"
              value={!!value.search_crowdTangle}
              onChange={() =>
                this.onChange({
                  target: { name: "search_crowdTangle", value: !value.search_crowdTangle }
                })
              }
            />
            </Col>
            </React.Fragment>: null}
          <Col sm={value.source === "facebook" || value.source === "twitter"? "2":"3"}>
            <CronBuilderInput
              placeholder={t("LABEL_SET_SCHEDULE")}
              name="schedule"
              value={value.schedule}
              onChange={this.onChange}
            />
          </Col>
        </Row>
      </ImportWrapper>
    );
  }
}

MediaUrlForm.propTypes = {
  mediaList: PropTypes.arrayOf(PropTypes.string).isRequired,
  t: PropTypes.func
};
MediaUrlForm.defaultProps = {
  t: String
};

export default withTranslation()(MediaUrlForm);
