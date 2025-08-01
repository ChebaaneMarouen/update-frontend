import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import MyModal from "@shared/Components/MyModal";
import { Button, Inputs, Col } from "adminlte-2-react";
import { Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PropTypes from "prop-types";
import Select from "components/Select";
const { DateTime, Checkbox } = Inputs;

class GeneratePdfModal extends Component {
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
      source: this.state.source,
      taskType: this.state.taskType,
      translate: this.state.translate,
    });
    this.setState({
      after_created: undefined,
      before_created: undefined,
      source: undefined,
      taskType: undefined,
      translate: undefined,
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
      taskType,
      source,
      translate,
    } = this.state;
    const { t } = this.props;

    return (
      <MyModal
        className={"inline"}
        button={
          <div
            style={{
              display: "flex",
              fontSize: "1.2em",
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={["fas", "download"]} />
          </div>
        }
        submitText={t("BTN_EXPORT")}
        submitType={"success"}
        submit={this.submit}
        title={t("TEXT_GENERATE_REPORT")}
      >
        <Form className={"form-horizontal"}>
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
          <Col>
            <Select
              placeholder={t("LABEL_TASK_TYPE")}
              label={t("LABEL_TASK_TYPE")}
              name="taskType"
              onChange={(d) => {
                this.onChange({
                  target: { name: "taskType", value: d.valueOf() },
                });
              }}
              sm={8}
              isClearable
              labelSm={4}
              multiple={false}
              value={taskType?.target?.value || ""}
              options={[
                {
                  label: t("LABEL_TASK_SUMMARY"),
                  value: "summary",
                },
                {
                  label: t("LABEL_TASK_TRENDING"),
                  value: "trending",
                },
              ]}
            />
          </Col>
          <Col>
            <Select
              placeholder={t("LABEL_SOURCES")}
              label={t("LABEL_SOURCES")}
              name="source"
              onChange={(d) => {
                this.onChange({
                  target: { name: "source", value: d.valueOf() },
                });
              }}
              sm={8}
              isClearable
              labelSm={4}
              multiple={false}
              value={source?.target?.value || ""}
              options={[
                {
                  label: t("TEXT_FACEBOOK"),
                  value: "facebook",
                },
                {
                  label: t("TEXT_TWITTER"),
                  value: "twitter",
                },
                {
                  label: t("TEXT_YOUTUBE"),
                  value: "youtube",
                },
                {
                  label: t("TEXT_WEBSITE"),
                  value: "website",
                },
                {
                  label: t("TEXT_INSTAGRAM"),
                  value: "instagram",
                },
              ]}
            />
          </Col>
          <Col>
            <Checkbox
              text={t("LABEL_TRANSLATE_TO_ENGLISH")}
              sm={12}
              labelSm={0}
              name="translate"
              value={!!translate}
              onChange={() =>
                this.onChange({
                  target: { name: "translate", value: !translate },
                })
              }
            />
          </Col>
        </Form>
      </MyModal>
    );
  }
}
GeneratePdfModal.propTypes = {
  size: PropTypes.string,
};
GeneratePdfModal.defaultProps = {
  t: String,
  size: "xs",
};

export default withTranslation()(GeneratePdfModal);
