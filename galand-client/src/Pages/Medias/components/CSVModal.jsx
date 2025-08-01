import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import MyModal from "@shared/Components/MyModal";
import { Button, Inputs, Col, Label } from "adminlte-2-react";
import { Form } from "reactstrap";

import PropTypes from "prop-types";
import Select from "components/Select";
const { DateTime } = Inputs;

class ExcelExportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(toggleModal) {
    const { onSubmit } = this.props;
    onSubmit({
      after_created: this.state.after_created,
      before_created: this.state.before_created,
      after_firstCrawlTime: this.state.after_firstCrawlTime,
      before_firstCrawlTime: this.state.before_firstCrawlTime,
      hatespeech: this.state.hatespeech
        ? this.state.hatespeech.target.value
        : "",
    });
    this.setState({
      after_created: undefined,
      before_created: undefined,
      after_firstCrawlTime: undefined,
      before_firstCrawlTime: undefined,
      hatespeech: undefined,
    });
    toggleModal();
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  clear(attr) {
    this.onChange({
      target: {
        name: [attr],
        value: undefined,
      },
    });
  }
  getClearButton(attr) {
    const val = this.state[attr];
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
    const {
      before_created,
      after_created,
      after_firstCrawlTime,
      before_firstCrawlTime,
      hatespeech,
    } = this.state;
    const { t, label, size, source } = this.props;

    const hateSpeechDegrees = [
      { _id: 3, name: "..." },
      { _id: 0, name: t("LABEL_LOW") },
      { _id: 1, name: t("LABEL_MEDIUM") },
      { _id: 2, name: t("LABEL_HIGH") },
    ];
    return (
      <MyModal
        className={"inline"}
        button={
          <Button
            onClick={() => this.openModal(false)}
            className={"margin-r-5"}
            size={size}
            icon={"fa-file-excel"}
            text={label}
            type="info"
          />
        }
        submitText={t("BTN_EXPORT")}
        submitType={"success"}
        submit={this.submit}
        title={t("TITLE_EXPORT_EXCEL")}
      >
        <Form className={"form-horizontal"}>
          {source === "scraping" && (
            <Col>
              <h3 className="text-center">{t("SHARING_DATE")}</h3>
            </Col>
          )}

          <Col>
            <DateTime
              iconLeft={"far-calendar"}
              small={true}
              startDate={"01/01/2019"}
              timeFormat={"HH:mm"}
              sm={8}
              labelSm={4}
              label={t("LABEL_AJOUTER_APRÉS_LE")}
              onChange={(d) => {
                this.onChange({
                  target: { name: "after_created", value: d.valueOf() },
                });
              }}
              name="after_created"
              placeholder={t("LABEL_AJOUTER_APRÉS_LE")}
              value={after_created}
              buttonRight={this.getClearButton("after_created")}
            />
          </Col>
          <Col>
            <DateTime
              iconLeft={"fas-calendar"}
              small={true}
              timeFormat={"HH:mm"}
              placeholder={t("LABEL_AJOUTER_AVANT_LE")}
              sm={8}
              labelSm={4}
              label={t("LABEL_AJOUTER_AVANT_LE")}
              name={"before_created"}
              onChange={(d) => {
                this.onChange({
                  target: { name: "before_created", value: d.valueOf() },
                });
              }}
              value={before_created}
              buttonRight={this.getClearButton("before_created")}
            />
          </Col>
          {source === "scraping" && (
            <Col>
              <h3 className="text-center">{t("SCRAPPING_DATE")}</h3>
            </Col>
          )}
          {source === "scraping" && (
            <Col>
              <DateTime
                iconLeft={"far-calendar"}
                small={true}
                startDate={"01/01/2019"}
                timeFormat={"HH:mm"}
                sm={8}
                labelSm={4}
                label={t("LABEL_AJOUTER_APRÉS_LE")}
                onChange={(d) => {
                  this.onChange({
                    target: {
                      name: "after_firstCrawlTime",
                      value: d.valueOf(),
                    },
                  });
                }}
                name="after_firstCrawlTime"
                placeholder={t("LABEL_AJOUTER_APRÉS_LE")}
                value={after_firstCrawlTime}
              />
            </Col>
          )}
          {source === "scraping" && (
            <Col>
              <DateTime
                iconLeft={"fas-calendar"}
                small={true}
                timeFormat={"HH:mm"}
                placeholder={t("LABEL_AJOUTER_AVANT_LE")}
                sm={8}
                labelSm={4}
                label={t("LABEL_AJOUTER_AVANT_LE")}
                name={"before_firstCrawlTime"}
                onChange={(d) => {
                  this.onChange({
                    target: {
                      name: "before_firstCrawlTime",
                      value: d.valueOf(),
                    },
                  });
                }}
                value={before_firstCrawlTime}
              />
            </Col>
          )}
          {source === "scraping" && (
            <Col>
              <Select
                placeholder={t("LABEL_SORT_HATESPEECH")}
                label={t("LABEL_SORT_HATESPEECH")}
                name="hatespeech"
                onChange={(d) => {
                  this.onChange({
                    target: { name: "hatespeech", value: d.valueOf() },
                  });
                }}
                sm={8}
                isClearable
                labelSm={4}
                multiple={false}
                value={hatespeech?.target?.value || ""}
                options={hateSpeechDegrees.map((m) => ({
                  label: m.name,
                  value: m._id,
                }))}
              />
            </Col>
          )}
        </Form>
      </MyModal>
    );
  }
}

ExcelExportModal.propTypes = {
  size: PropTypes.string,
};
ExcelExportModal.defaultProps = {
  t: String,
  size: "xs",
};

export default withTranslation()(ExcelExportModal);
