import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "adminlte-2-react";
import SweetAlert from "sweetalert-react";

class ConfirmModal extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      showAlertConfirm: false
    };
  }

  render() {
    const { action, buttonText, text } = this.props;
    return (
      <>
        <Button
          onClick={() => this.setState({ showAlertConfirm: true })}
          block={true}
            type={"NON_APPROUVER"}
          text={buttonText}
        />
        <SweetAlert
          showCancelButton
          show={this.state.showAlertConfirm}
          title="Cette action est irréversible"
          text={"Êtes-vous sûr de vouloir de continuer l'action ?"}
          type="warning"
          confirmButtonText="Confirmer"
          cancelButtonText="Annuler"
          confirmButtonColor="#00a65a"
          onCancel={() => {
            this.setState({ showAlertConfirm: false });
          }}
          onConfirm={() => {
            this.setState({ showAlertConfirm: false });
            action();
          }}
        />
      </>
    );
  }
}

export default ConfirmModal;
