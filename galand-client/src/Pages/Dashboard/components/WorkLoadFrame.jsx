import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Box, SimpleTable } from "adminlte-2-react";
import { User } from "modules/ressources";

class WorkLoadFrame extends Component {
  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  getColumns(t) {
    return [
      { title: t("LABEL_USERS"), data: "user" },
      { title: t("LABEL_POSTS_ASSIGNED"), data: "assigned" },
      { title: t("LABEL_POSTS_FINALIZED"), data: "finalized" },
      { title: t("LABEL_ADVANCEMENT"), data: "advancement" },
    ];
  }

  render() {
    const { t, users, news } = this.props;

    const workLoadData = users.map((user) => {
      const allNews = (news && news.data) || [];
      const assignedPosts = allNews.filter((n) => n.monitor === user._id)
        .length;
      const finalizedPosts = allNews.filter(
        (n) => n.monitor === user._id && n.finalized === true
      ).length;
      const advancement =
        assignedPosts > 0
          ? ((finalizedPosts / assignedPosts) * 100).toFixed(1)
          : 0;

      return {
        user: `${user.fName} ${user.lName}`,
        assigned: assignedPosts,
        finalized: finalizedPosts,
        advancement: `${advancement}%`,
      };
    });

    return (
      <Box
        collapsable={false}
        border={false}
        type={"primary"}
        header={
          <div>
            <h4 className={"text-center text-lg"}>{t("TEXT_WORK_LOAD")}</h4>
          </div>
        }
      >
        <SimpleTable
          footer={true}
          hover={true}
          striped={true}
          border={true}
          responsive={true}
          columns={this.getColumns(t)}
          data={workLoadData}
        />
      </Box>
    );
  }
}

WorkLoadFrame.defaultProps = {
  users: [],
  news: { data: [] },
};

function mapStateToProps(state) {
  return {
    users: state.data.users,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(User.get()),
  };
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(WorkLoadFrame)
);
