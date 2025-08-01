import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ClonableInputs from "@shared/ClonableInputs/ClonableInputs";
import PropTypes from "prop-types";
import { Inputs } from "adminlte-2-react";
import MediaUrlForm from "./MediaUrlForm";
import { Form } from "reactstrap";
import "../Medias.css";
import Select from "components/Select";
import { connect } from "react-redux";

const { Text } = Inputs;

class MediasForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.mediaList = [
      "facebook",
      "twitter",
      "youtube",
      "instagram",
      "sitemap",
      "rss",
      "website",
    ];
    this.csvMediaList = [
      "facebook",
      "twitter",
      "youtube",
      "instagram",
      "website",
      "meta_facebook",
      "meta_instagram",
    ];
  }

  render() {
    const { t, onChange, item } = this.props;
    const { links, name, type, file, csv_source } = item;
    let DataSourcesTypes = this.props.settings?.filter(
      (setting) => setting._id == "Data Sources Types"
    )[0]
      ? this.props.settings.filter(
          (setting) => setting._id == "Data Sources Types"
        )[0].DataSourceType.value
      : [];

    return (
      <Form className={"form-horizontal"}>
        <Text
          onChange={onChange}
          name={"name"}
          labelClass={"required"}
          iconLeft={"fa-pen"}
          sm={8}
          labelSm={4}
          label={t("LABEL_NOM") + ":"}
          placeholder={t("LABEL_NOM")}
          value={name || ""}
        />
        <Select
          placeholder={t("LABEL_TYPE")}
          label={t("LABEL_TYPE")}
          iconLeft={"fas-share-alt"}
          name="type"
          sm={8}
          labelSm={4}
          onChange={onChange}
          value={type || ""}
          options={DataSourcesTypes.map((v) => ({
            label: v.name,
            value: v.name,
          })).concat([
            {
              label: "CSV",
              value: "CSV",
            },
          ])}
        />
        {type === "CSV" && (
          <>
            <div className="form-group">
              <label htmlFor="csv-input" class="control-label col-sm-4">
                {t("LABEL_CSV_FILE")}
              </label>
              <div className="col-sm-8">
                <div
                  className="input-group"
                  style={{
                    width: "100%",
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    height: "38px",
                  }}
                >
                  <label
                    htmlFor="csv-input"
                    style={{
                      position: "absolute",
                      top: "7px",
                      left: "10px",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    {!file ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8.68 20.1899H5.75C3.68 20.1899 2 18.5099 2 16.4399V13.5099C2 11.9699 2.6 10.5299 3.68 9.43994L9.9 3.21994C10.19 2.92994 10.67 2.92994 10.96 3.21994C11.25 3.50994 11.25 3.98994 10.96 4.27994L4.75 10.4999C3.95 11.2999 3.5 12.3699 3.5 13.5099V16.4399C3.5 17.6799 4.51 18.6899 5.75 18.6899H8.68C9.81 18.6899 10.88 18.2499 11.68 17.4499C13.53 15.5999 16.76 12.3799 19.13 10.0699C19.74 9.47994 20.09 8.64994 20.09 7.79994C20.09 6.94994 19.75 6.11994 19.14 5.51994L19.07 5.44994C18.48 4.85994 17.68 4.51994 16.83 4.52994C16 4.52994 15.19 4.87994 14.61 5.46994L7.58 12.6599C7.53 12.7099 7.5 12.7799 7.5 12.8499V14.4399C7.5 14.5799 7.61 14.6899 7.75 14.6899H9.34C9.41 14.6899 9.47 14.6599 9.52 14.6199L15.91 8.22994C16.2 7.93994 16.68 7.93994 16.97 8.22994C17.26 8.51994 17.26 8.99994 16.97 9.28994L10.58 15.6799C10.25 16.0099 9.81 16.1899 9.34 16.1899H7.75C6.78 16.1899 6 15.3999 6 14.4399V12.8499C6 12.3799 6.18 11.9499 6.51 11.6099L13.54 4.41994C14.4 3.53994 15.6 3.02994 16.83 3.02994H16.86C18.08 3.02994 19.28 3.51994 20.14 4.38994L20.21 4.45994C21.09 5.33994 21.6 6.55994 21.6 7.80994C21.6 9.05994 21.08 10.2799 20.19 11.1499C17.83 13.4599 14.6 16.6699 12.75 18.5199C11.66 19.5999 10.22 20.1999 8.69 20.1999L8.68 20.1899Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    ) : (
                      <span>{file.name}</span>
                    )}
                  </label>
                </div>
              </div>
              <input
                id="csv-input"
                onChange={onChange}
                style={{ display: "none" }}
                type="file"
                name={"file"}
              />
            </div>
            <Select
              placeholder={t("LABEL_MEDIA_TYPE")}
              label={t("LABEL_MEDIA_TYPE")}
              iconLeft={"fas-share-alt"}
              name="csv_source"
              sm={8}
              labelSm={4}
              onChange={onChange}
              value={csv_source || ""}
              options={this.csvMediaList.map((v) => ({
                label: v,
                value: v,
              }))}
            />
          </>
        )}
        {type !== "CSV" && (
          <ClonableInputs
            maxElements={10}
            minElements={0}
            value={links || []}
            initButtonText={t("BTN_AJOUTER_UN_LIEN")}
            name="links"
            defaultValue={{}}
            onChange={onChange}
          >
            <MediaUrlForm mediaList={this.mediaList} />
          </ClonableInputs>
        )}
      </Form>
    );
  }
}
MediasForm.propTypes = {
  settings: PropTypes.array,
};

MediasForm.defaultProps = {
  settings: [],
};

function mapStateToProps(state) {
  return {
    settings: state.data.settings,
  };
}

export default withTranslation()(connect(mapStateToProps, null)(MediasForm));
