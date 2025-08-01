import React, { Component } from "react";
import Form from "reactstrap/es/Form";
import { Inputs, Button, ICheck } from "adminlte-2-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const { Text, Checkbox, ImportWrapper } = Inputs;
class SignleFormPanelPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { onMount } = this.props;
    this.props.clear_switch_home();
    if (typeof onMount === "function") onMount.call(this);
    document.body.className = "hold-transition register-page";
  }

  componentDidUpdate(prevProps) {
    if (this.props.switch_home !== prevProps.switch_home) {
      if (this.props.switch_home) {
        window.location.href = "/";
      }
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state);
  }

  handleFileChange = (event) => {
    // Get the selected file(s) from the event object
    const file = event.target.files[0]; // For single file selection
    // For multiple file selection: const files = event.target.files;

    // Update the state with the selected file(s)
    this.setState({ file });
  };

  render() {
    const {
      footer,
      userFields,
      welcomeMsg,
      headerText,
      submitButtonText,
      submitButtonIcon,
      t,
    } = this.props;
    return (
      <div className="login-box container-fluid">
        <div className="row">
          <div className="col-left col-lg-6 bg-image">
            <div className="login-logo-left">
              <img src="https://res.cloudinary.com/natulyn/image/upload/v1718030320/emonitor/yffczvtuvhncog0d4les.png" />
              <h5>Nice to see you again</h5>
              <h1>Welcome back</h1>
              <span className="title-border"></span>
            </div>
          </div>
          <div className="col-right col-lg-6 login-side">
            <div className="loginbox-wrap">
              <div className="login-box-body">
                <div className="login-logo">
                  <b>{t(headerText)}</b>
                </div>
                <p className="login-box-msg">{t(welcomeMsg)}</p>
                <Form
                  className="form-horizontal margin-b-15"
                  onSubmit={this.onSubmit}
                >
                  {userFields.map((field) =>
                    field.name === "profile_picture" ? (
                      <div className="form-group">
                        <div className="col-sm-12 col-sm-offset-0">
                          <div
                            className="input-group"
                            style={{ width: "100%" }}
                          >
                            <span className="input-group-addon"></span>
                            <label for="fileInput">
                              {t(field.placeholder)}{" "}
                            </label>
                            <input
                              type="file"
                              id="fileInput"
                              className="form-control"
                              onChange={this.handleFileChange}
                              name={field.name}
                              placeholder={field.placeholder}
                            />
                            {this.state.file && (
                              <p>Selected file: {this.state.file.name}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <label for={field.name}>{t(field.placeholder)}</label>
                        <Text
                          id={field.name}
                          key={field.name}
                          placeholder={t(field.placeholder)}
                          inputType={field.type}
                          labelSm={0}
                          sm={12}
                          name={field.name}
                          onChange={this.onChange}
                          iconLeft={field.icon}
                        />
                      </>
                    )
                  )}
                  <Button
                    flat
                    icon={submitButtonIcon}
                    type="primary"
                    id="button-register"
                    block
                    text={t(submitButtonText)}
                    onClick={this.onSubmit}
                  />
                </Form>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SignleFormPanelPage.propTypes = {
  welcomeMsg: PropTypes.string,
  submitButtonText: PropTypes.string,
  submitButtonIcon: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  userFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerText: PropTypes.string,
  footer: PropTypes.element,
  onMount: PropTypes.oneOf([null, PropTypes.func]),
  t: PropTypes.func,
};
SignleFormPanelPage.defaultProps = {
  welcomeMsg: "",
  submitButtonText: "Submit",
  submitButtonIcon: "",
  headerText: "",
  footer: null,
  onMount: null,
  t: (text) => text,
};
function mapStateToProps(state) {
  return {
    switch_home: state.persistedData.switch_home,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    clear_switch_home: () =>
      dispatch({
        type: "authLogin",
        switch_home: false,
      }),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignleFormPanelPage);
