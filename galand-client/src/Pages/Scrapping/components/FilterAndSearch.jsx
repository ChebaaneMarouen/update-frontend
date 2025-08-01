import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Col, Inputs } from "adminlte-2-react";
import { Form, Row } from "reactstrap";
import Select from "components/Select";
import { Feed, Medias } from "modules/ressources";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Text, DateTime } = Inputs;

class FilterAndSearch extends Component {
  constructor(props) {
    super(props);
    this.clear = this.clear.bind(this);
    this.getClearButton = this.getClearButton.bind(this);
  }

  componentWillMount() {
    const { getMedias } = this.props;
    getMedias();
  }

  clear(attr) {
    const { onChange } = this.props;
    onChange({
      target: {
        name: [attr],
        value: undefined,
      },
    });
  }

  getClearButton(attr) {
    const val = this.props.filter[attr];
    if (!val) return null;
    return (
      <Button
        type="danger"
        title="clear"
        icon="fa-trash"
        onClick={() => this.clear(attr)}
      />
    );
  }

  render() {
    const { t, medias, filter, onChange, permissions, hideSort } = this.props;
    const {
      multi_source,
      multi_media,
      before_created,
      after_created,
      all_text,
      hatespeech,
      verality,
    } = filter;
    let sorted = medias.sort((a, b) => {
      return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    });
    const hateSpeechDegrees = [
      { _id: 3, name: "..." },
      { _id: 0, name: t("LABEL_LOW") },
      { _id: 1, name: t("LABEL_MEDIUM") },
      { _id: 2, name: t("LABEL_HIGH") },
    ];
    const veralitySort = [
      { _id: 4, name: "..." },
      { _id: 0, name: t("LABEL_REACTIONS") },
      { _id: 1, name: t("LABEL_LIKES") },
      { _id: 2, name: t("LABEL_SHARES") },
      { _id: 3, name: t("LABEL_COMMENTS") },
    ];
    return (
      <Form className={"form-horizontal"} onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col sm={permissions["P_MEDIA"] > 0 ? 6 : 12}>
            <Select
              placeholder={t("LABEL_SOURCES")}
              iconLeft={"fas-share-alt"}
              name="multi_source"
              onChange={onChange}
              sm={12}
              labelSm={0}
              multiple={true}
              value={multi_source}
              options={[
                {
                  label: "Facebook",
                  value: "facebook",
                },
                { label: "Instagram", value: "instagram" },
                { label: "Twitter", value: "twitter" },
                { label: "Youtube", value: "youtube" },
                { label: "News Website", value: "website" },
                { label: "Facebook mentions", value: "facebook_mentions" },
                { label: "Twitter mentions", value: "twitter_mentions" },
              ]}
            />
            <DateTime
              iconLeft={"far-calendar"}
              small={true}
              startDate={"01/01/2019"}
              timeFormat={"HH:mm"}
              sm={12}
              labelSm={0}
              onChange={(d) => {
                onChange({
                  target: { name: "after_created", value: d.valueOf() },
                });
              }}
              name="after_created"
              placeholder={t("LABEL_AJOUTER_APRÉS_LE")}
              value={after_created}
              // buttonRight={this.getClearButton("after_created")}
            />
          </Col>

          <Col sm={permissions["P_MEDIA"] > 0 ? 6 : 12}>
            {permissions["P_MEDIA"] > 0 && (
              <Select
                placeholder={t("LABEL_MÉDIAS")}
                iconLeft={"fab-searchengin"}
                name="multi_media"
                onChange={onChange}
                sm={12}
                labelSm={0}
                multiple={true}
                value={multi_media}
                options={medias.map((m) => ({ label: m.name, value: m._id }))}
              />
            )}
            <DateTime
              iconLeft={"fas-calendar"}
              small={true}
              timeFormat={"HH:mm"}
              placeholder={t("LABEL_AJOUTER_AVANT_LE")}
              sm={12}
              labelSm={0}
              name={"before_created"}
              onChange={(d) => {
                onChange({
                  target: { name: "before_created", value: d.valueOf() },
                });
              }}
              value={before_created}
              // buttonRight={this.getClearButton("before_created")}
            />
          </Col>
          <Col sm={6}>
            <Text
              value={all_text}
              name="all_text"
              onChange={onChange}
              placeholder={t("LABEL_RECHERCHER_UN_MOT")}
              sm={12}
              labelSm={0}
            />
          </Col>
          <Col sm={!hideSort ? 3 : 6}>
            <Select
              placeholder={t("LABEL_SORT_HATESPEECH")}
              name="hatespeech"
              onChange={onChange}
              sm={12}
              isClearable
              labelSm={0}
              multiple={false}
              value={hatespeech}
              options={hateSpeechDegrees.map((m) => ({
                label: m.name,
                value: m._id,
              }))}
            />
          </Col>
          {!hideSort && (
            <Col sm={3}>
              <Select
                placeholder={t("LABEL_SORT_VERALITY")}
                name="verality"
                onChange={(e) => onChange(e, false, true)}
                isClearable
                sm={12}
                labelSm={0}
                multiple={false}
                value={verality}
                options={veralitySort.map((m) => ({
                  label: m.name,
                  value: m._id,
                }))}
              />
            </Col>
          )}
        </Row>
      </Form>
    );
  }
}

FilterAndSearch.propTypes = {
  className: PropTypes.string,
  medias: PropTypes.array,
  definedDictionaries: PropTypes.array,
  filter: PropTypes.object,
  advancedFilter: PropTypes.object,
};

FilterAndSearch.defaultProps = {
  medias: [],
  definedDictionaries: [],
};

function mapStateToProps(state) {
  return {
    medias: state.data.medias,
    permissions: state.persistedData.permissions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMedias: () => dispatch(Medias.get()),
    filterFeed: (data) => dispatch(Feed.search(data)),
  };
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(FilterAndSearch)
);
