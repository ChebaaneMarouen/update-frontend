import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withTranslation } from "react-i18next";
import Tabs from "components/Tabs";
import { Button, TabContent, Content } from "adminlte-2-react";
import { TypedNews, News, Projects, User, Role } from "modules/ressources";
import CustomSearchWidget from "../../SavedSearches/components/CustomSearchWidget";
import AddCustomSearch from "../../SavedSearches/components/AddCustomSearch";
import AdvancedSearchBar from "../../Scrapping/components/AdvancedSearchBar";
import FilterAndSearch from "./components/FilterAndSearch";
import NewsList from "./components/NewsList";
import SortBar from "../../Scrapping/components/SortBar";
import SimilaritySearchTab from "../../Scrapping/components/SimilaritySearchTab";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import AddFakeModal from "Pages/Scrapping/components/AddFakeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { splitIcon } from "adminlte-2-react/src/components/Utilities";
import { Medias } from "modules/ressources";
import { element } from "prop-types";
import { NewsApiEndpoint } from "config";
import axios from "axios";
import { saveAs } from "file-saver";
import ExcelModal from "Pages/Scrapping/components/ExcelModal";
import LoadingScreen from "components/LoadingScreen";

function Hook({ callback, isRequesting }) {
  useBottomScrollListener(() => {
    if (!isRequesting) callback();
  });
  return null;
}

const exportType = "xls";

class ViewNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayType: 6,
      filter: {},
      advancedFilter: {},
      sort: [{ key: "created", order: "desc" }],
      page: 0,
      pageCharged: true,
    };
    this.switchDisplay = this.switchDisplay.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);
    this.onChange = this.onChange.bind(this);
    this.optionsFilter = this.optionsFilter.bind(this);
    this.initialSearch = {
      filter: {},
      advancedFilter: {},
      sort: [{ key: "created", order: "desc" }],
    };
    this.resetSearch = this.resetSearch.bind(this);

    const { type, describeNews, filterNews, getProject, userId } = this.props;

    const { projectId } = this.props.match.params;
    this.callback = () => {
      const { page, filter, advancedFilter, sort } = this.state;
      this.setState({
        page: page + 1,
      });
      filterNews(type, {
        filter: { ...filter, ...advancedFilter, projectId },
        page: page + 1,
        sort,
      });
    };
    describeNews();
    if (projectId)
      getProject(projectId).then((prj) => {
        let access = false;
        if (prj) {
          const assignees = prj["assignees"];
          const user = assignees.filter((el) => el === userId);
          if (user.length) {
            access = true;
          }
          prj.endProject < Date.now()
            ? this.setState({ projectExpired: true, access })
            : this.setState({ projectExpired: false, access });
        }
      });
  }
  componentWillMount() {
    const { getNews, type, getMedias, getUsers, getRoles } = this.props;
    const { projectId } = this.props.match.params;
    getNews(type, projectId);
    getMedias();
    getUsers();
    getRoles();
  }
  componentDidUpdate(prevProps, prevState) {
    const { filterNews, type, getProject, userId } = this.props;
    const { advancedFilter, filter, sort } = this.state;
    const { projectId } = this.props.match.params;
    let access = false;
    if (prevProps.match.params.projectId !== projectId) {
      getProject(projectId).then((prj) => {
        if (prj) {
          const assignees = prj["assignees"];
          const user = assignees.filter((el) => el === userId);
          if (user.length) {
            access = true;
          }
          prj.endProject < Date.now()
            ? this.setState({ projectExpired: true, access })
            : this.setState({ projectExpired: false, access });
        }
      });
    }
    if (
      prevProps.match.params.projectId !== projectId ||
      prevState.filter !== filter ||
      prevState.sort !== sort ||
      prevState.advancedFilter !== advancedFilter
    ) {
      this.setState({
        page: 0,
        pageCharged: false,
      });
      clearTimeout(this.tid);

      const { projectId } = this.props.match.params;
      this.tid = setTimeout(() => {
        filterNews(type, {
          filter: { ...filter, ...advancedFilter, projectId },
          page: 0,
          sort,
          pageCharged: true,
        });
      }, 500);
    }
  }

  resetSearch() {
    this.onChange(this.initialSearch);
  }

  onChange(data) {
    this.setState(data);
  }

  optionsFilter(option) {
    const parts = String(option).split(".");
    if (parts[0] === "form") {
      const { forms } = this.props.selectedProject;
      return forms.indexOf(parts[1]) >= 0;
    }
    return true;
  }

  onChangeSort(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onChangeFilter(e, isAdvancedFilter = false) {
    if (isAdvancedFilter) {
      return this.setState({
        advancedFilter: e,
      });
    }
    const { name, value } = e.target;
    this.setState({
      filter: {
        ...this.state.filter,
        [name]: value,
      },
    });
  }

  switchDisplay(displayType) {
    this.setState({ displayType });
  }

  exportFeedExcel = ({ after_created, before_created }) => {
    let { filter } = this.state;

    filter = { ...filter, after_created, before_created };

    const { lang } = this.props;
    axios({
      url: NewsApiEndpoint,
      method: "POST",
      data: { filter, size: 20000, page: 0, lang },
      responseType: "blob",
      withCredentials: true,
    }).then((response) => {
      const contentDisposition = response.headers["content-disposition"];
      const fileName = contentDisposition
        .split(";")[1]
        .split("filename=")[1]
        .trim();
      const blob = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, fileName);
    });
  };
  render() {
    const {
      selectedProject,
      type,
      t,
      isFetchingNews,
      newsDescription,
      lang,
      permissions,
      news,
      medias,
      tags,
    } = this.props;
    let labelType;
    switch (type) {
      case "projects":
        labelType = "ARTICLES";
        break;
      case "assigned":
        labelType = "ASSIGNED";
        break;
      case "fakenews":
        labelType = "FAKENEWS";
        break;
      case "added":
        labelType = "NEWS";
        break;
      default:
        labelType = "ALL";
        break;
    }
    const { projectId } = this.props.match.params;
    const { advancedFilter, filter, sort, projectExpired, access, pageCharged } = this.state;
    const title = projectId
      ? selectedProject.title
      : t("TITLE_LISTE_DES_" + labelType) +
        " ( " +
        (news?.count !== undefined ? news?.count : "--") +
        " " +
        t("LABEL_ARTICLE") +
        " )";

    return (
      <Content title={title} browserTitle={title}>
        {projectExpired ? (
          <div className="prj-exp">
            <h1>{t("PROJECT_CLOSED")}</h1>
            <h5>
              {new Date(selectedProject.endProject).toLocaleString(
                lang == "ar" ? "fr" : lang
              )}
            </h5>
            <FontAwesomeIcon
              className={"margin-r-5"}
              icon={splitIcon("fa-exclamation-triangle")}
            />
          </div>
        ) : (
          <Fragment>
            <Tabs
              dropdownMenu={
                permissions["P_CUSTOM_SEARCH"] > 0 && (
                  <CustomSearchWidget
                    searchType="NEWS"
                    initialSearch={this.initialSearch}
                    searchChanged={this.onChange}
                  />
                )
              }
              tabsActions={[
                <button
                  id=""
                  type="button"
                  className="btn btn-default btn-flat btn-toggle-search state-on"
                >
                  <i className="toggle-on"></i>
                  <i className="toggle-off"></i>
                </button>,
                <div title={t("BTN_SAVE_CUSTOM_SEARCH")}>
                  <AddCustomSearch
                    searchType="NEWS"
                    search={{ advancedFilter, filter, sort }}
                  />
                </div>,
                <div title={t("BTN_CLEAR_SEARCH")}>
                  <Button onClick={this.resetSearch} icon="fa-undo" flat />
                </div>,

                news &&
                news.data &&
                tags &&
                medias &&
                permissions["P_EXCEL"] ? (
                  <div title={t("TITLE_EXPORT_EXCEL")}>
                    <ExcelModal onSubmit={this.exportFeedExcel} />
                  </div>
                ) : null,
              ]}
              contentHeight="232px"
              defaultActiveKey={"filter"}
            >
              <TabContent
                title={t("TITLE_FILTRES_&_RECHERCHE")}
                eventKey="filter"
              >
                <FilterAndSearch
                  filter={filter}
                  onChange={this.onChangeFilter}
                />
              </TabContent>
              <TabContent title={t("TITLE_TRIER")} eventKey={"trier"}>
                <SortBar
                  sort={sort}
                  onChange={this.onChangeSort}
                  description={newsDescription}
                />
              </TabContent>
              <TabContent
                title={t("TITLE_SIMILARITY_SEARCH")}
                eventKey={"similarity"}
              >
                <SimilaritySearchTab
                  onChangeFilter={this.onChangeFilter}
                  showClearButton={!!filter.moreLike_}
                />
              </TabContent>
              <TabContent
                title={t("TITLE_ADVANCED_SEARCH")}
                eventKey={"advanced"}
              >
                <AdvancedSearchBar
                  description={newsDescription}
                  filter={advancedFilter}
                  optionsFilter={this.optionsFilter}
                  onChange={this.onChangeFilter}
                />
              </TabContent>
            </Tabs>
            <div>
              <NewsList
                projectId={projectId}
                displayType={this.state.displayType}
                type={type}
              />
              {lang === "ar" && pageCharged && <div style={{width: "100%"}}>
              <p
                className=" text-center color-blue pointer"
                onClick={() => !isFetchingNews && this.callback()}
              >
                {t("TEXT_SHOW_MORE")}...
              </p>
            </div>}
            
              {lang !== "ar" && <Hook callback={this.callback} isRequesting={isFetchingNews} />}
            </div>
            {type === "projects" && access && (
              <AddFakeModal projectId={projectId} fromProject={true} />
            )}
          </Fragment>
        )}
      </Content>
    );
  }
}

ViewNews.defaultProps = {
  selectedProject: {
    forms: [],
    users: [],
    roles: [],
  },
};

function mapStateToProps(state, ownProps) {
  return {
    isFetchingNews: _.get(state, "data.isFetching.news"),
    newsDescription: state.data.newsDescription,
    selectedProject: state.data.selectedProject,
    lang: state.persistedData.lang,
    userId: state.persistedData._id,
    permissions: state.persistedData.permissions,
    news: ownProps.news || state.data.news,
    tags: state.data.tags,
    medias: state.data.medias,
    users: state.data.users,
    roles: state.data.roles,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    describeNews: () => dispatch(News.describe()),
    getNews: (type, projectId) => dispatch(TypedNews(type, projectId).get()),
    getProject: (id) => dispatch(Projects.getOne(id, "selectedProject")),
    getMedias: () => {
      dispatch(Medias.get());
    },
    getUsers: () => dispatch(User.get()),
    getRoles: () => dispatch(Role.get()),
    filterNews: (type, { filter, page, sort = [] }) =>
      dispatch(
        TypedNews(type).search(
          { filter, sort },
          { page, append: Boolean(page) }
        )
      ),
  };
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ViewNews)
);
