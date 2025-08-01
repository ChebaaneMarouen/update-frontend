import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Tabs from "components/Tabs";
import { Button, TabContent, Content, Box } from "adminlte-2-react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Feed, Tags, Monitors, Medias } from "modules/ressources";
import FilterAndSearch from "./components/FilterAndSearch";
import AddCustomSearch from "../SavedSearches/components/AddCustomSearch";
import AdvancedSearchBar from "./components/AdvancedSearchBar";
import ProjectSelector from "./components/ProjectSelector";
import ModelsSelector from "./components/ModelsSelector";
import CustomSearchWidget from "../SavedSearches/components/CustomSearchWidget";
import SortBar from "./components/SortBar";
import ScrappingList from "./components/ScrappingList";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import DictionariesFilter from "./components/DictionariesFilter";
import _ from "lodash";
import ExcelModal from "./components/ExcelModal";
import { saveAs } from "file-saver";
import axios from "axios";
import { feedApiEndpoint } from "config";
import Spinner from "../../assests/spinner.gif";

function Hook({ callback, isRequesting }) {
  useBottomScrollListener(() => {
    if (!isRequesting) callback();
  });
  return null;
}

class ListView extends Component {
  constructor(props) {
    super(props);
    let { postId } = props.match.params;
    postId = postId ? decodeURIComponent(postId) : undefined;
    this.state = {
      displayType: 6,
      models: [],
      filter: {},
      dictionariesFilter: [],
      customDictionariesFilter: [],
      advancedFilter: {
        _id: postId,
      },
      sort: [],
      page: 0,
      pageCharged: true,
    };
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChange = this.onChange.bind(this);

    const { getFeed, describeFeed, getDisplayConfig } = this.props;
    this.callback = async () => {
      const { filter, advancedFilter, page, sort } = this.state;
      this.setState({
        page: page + 1,
      });
      getFeed({ ...filter, ...advancedFilter }, page + 1, sort, true);
    };
    this.switchDisplay = this.switchDisplay.bind(this);

    describeFeed();
    getDisplayConfig();
    this.initialSearch = { filter: {}, advancedFilter: {}, sort: [] };
    this.resetSearch = this.resetSearch.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { getFeed } = this.props;
    const { advancedFilter, filter, sort } = this.state;
    if (
      prevState.filter !== filter ||
      prevState.sort !== sort ||
      prevState.advancedFilter !== advancedFilter
    ) {
      this.setState({
        page: 0,
        pageCharged: false,
      });
      clearTimeout(this.tid);
      this.tid = setTimeout(async () => {
        await getFeed({ ...filter, ...advancedFilter }, 0, sort);
        this.setState({
          pageCharged: true,
        });
      }, 500);
    }
  }
  componentWillMount() {
    const { getFeed, getTags, getMonitors, getMedias } = this.props;
    const { advancedFilter, filter = {}, sort = [] } = this.state;
    sort.push({ key: "created", order: "desc" });
    getFeed({ ...filter, ...advancedFilter }, 0, sort);
    getTags();
    getMonitors();
    getMedias();
  }

  resetSearch() {
    this.onChange(this.initialSearch);
  }
  onChange(data) {
    this.setState(data);
  }

  onChangeState(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onChangeFilter(e, isAdvancedFilter = false, sort) {
    const name = e.target ? e.target.name : "";
    const value = e.target ? e.target.value : "";
    if (isAdvancedFilter) {
      return this.setState({
        advancedFilter: e,
      });
    }
    if (sort) {
      const sortState = this.state.sort.filter((el) => el.key !== "verality");
      if (value === 0) {
        return this.setState({
          sort: [
            {
              key: "verality",
              order: "reactions",
            },
            ...sortState,
          ],
        });
      }
      if (value === 1) {
        return this.setState({
          sort: [
            {
              key: "verality",
              order: "likes",
            },
            ...sortState,
          ],
        });
      }
      if (value === 2) {
        return this.setState({
          sort: [
            {
              key: "verality",
              order: "shares",
            },
            ...sortState,
          ],
        });
      }
      if (value === 3) {
        return this.setState({
          sort: [
            {
              key: "verality",
              order: "comments",
            },
            ...sortState,
          ],
        });
      }
      if (value === 4) {
        return this.setState(sortState);
      }
    }
    if (name === "hatespeech" && value === 3) {
      const filterState = this.state.filter;
      delete filterState.hatespeech;
    } else {
      this.setState({
        filter: {
          ...this.state.filter,
          [name]: value,
        },
      });
    }
  }

  switchDisplay(displayType) {
    this.setState({ displayType });
  }
  exportFeedExcel = ({
    after_created,
    before_created,
    hatespeech,
    after_firstCrawlTime,
    before_firstCrawlTime,
  }) => {
    let { filter } = this.state;
    const { lang } = this.props;
    filter = {
      ...filter,
      after_created,
      before_created,
      hatespeech,
      after_firstCrawlTime,
      before_firstCrawlTime,
    };

    axios({
      url: feedApiEndpoint,
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
      advancedFilter,
      models,
      filter,
      sort,
      project,
      dictionariesFilter,
      customDictionariesFilter,
      pageCharged,
    } = this.state;
    let {
      isFetching,
      t,
      feedDescription,
      feedDisplayDescription,
      customDictionaries,
      dictionaries,
      permission,
      showProjectPanel,
      permissions,
      feed,
    } = this.props;
    const isFetchingFeed = isFetching.feed;
    return (
      permission >= 1 && (
        <Content
          title={
            t("MESSAGE_RÉSULTAT_DU_SCRAPING") +
            " ( " +
            (feed.count !== undefined ? feed.count : "--") +
            " " +
            t("LABEL_ARTICLE") +
            " )"
          }
          browserTitle={t("MESSAGE_RÉSULTAT_DU_SCRAPING")}
        >
          {showProjectPanel && (
            <Box
              style={{ overflowY: "visible" }}
              noPadding={true}
              collapsable={true}
              collapsed={false}
              title={t("TITLE_PROJECT_SELECTION")}
            >
              <ProjectSelector
                selectProject={this.onChange}
                project={project}
              />
              <br />
            </Box>
          )}
          <Tabs
            dropdownMenu={
              permissions["P_CUSTOM_SEARCH"] > 0 && (
                <CustomSearchWidget
                  searchType="SCRAPPING"
                  initialSearch={this.initialSearch}
                  searchChanged={this.onChange}
                  selecProjectCustSearchesIds={
                    project && project.customSearches
                  }
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
                  searchType="SCRAPPING"
                  search={{ advancedFilter, filter, sort }}
                />
              </div>,
              <div title={t("BTN_CLEAR_SEARCH")}>
                <Button
                  title={t("BTN_CLEAR_SEARCH")}
                  icon="fa-undo"
                  onClick={this.resetSearch}
                  flat
                />
              </div>,

              permissions["P_EXCEL"] ? (
                <div title={t("TITLE_EXPORT_EXCEL")}>
                  <ExcelModal
                    onSubmit={this.exportFeedExcel}
                    source="scraping"
                    filter={filter}
                  />
                </div>
              ) : null,
            ]}
            contentHeight="165px"
            defaultActiveKey={"filter"}
          >
            <TabContent
              title={t("TITLE_FILTRES_&_RECHERCHE")}
              eventKey="filter"
            >
              <FilterAndSearch
                filter={filter}
                advancedFilter={advancedFilter}
                onChange={this.onChangeFilter}
                sort={sort}
              />
            </TabContent>
            <TabContent title={t("TITLE_TRIER")} eventKey={"trier"}>
              <SortBar
                sort={sort}
                onChange={this.onChangeState}
                description={feedDescription}
              />
            </TabContent>

            {permissions["P_MACHINE_LEARNING_MODELS"] > 0 && (
              <TabContent title={t("TITLE_ML")} eventKey={"ML"}>
                <ModelsSelector
                  onChange={this.onChangeState}
                  selected={models}
                />
              </TabContent>
            )}
            {permissions["P_DICTIONNARY"] > 0 && (
              <TabContent
                title={t("LABEL_DICTIONAIRES")}
                eventKey={"dictionaries"}
              >
                <DictionariesFilter
                  onChange={this.onChangeState}
                  dictionaries={dictionaries}
                  customDictionaries={customDictionaries}
                  selecProjectCustDict={project && project.customDictionaries}
                  selecProjectDict={project && project.dictionaries}
                  t={t}
                />
              </TabContent>
            )}
            <TabContent
              title={t("TITLE_ADVANCED_SEARCH")}
              eventKey={"advanced"}
            >
              <AdvancedSearchBar
                description={feedDescription}
                filter={advancedFilter}
                onChange={this.onChangeFilter}
              />
            </TabContent>
          </Tabs>

          {pageCharged ? (
            <div>
              <ScrappingList
                showAddFakeNewsButton={!showProjectPanel}
                dictionariesFilter={dictionariesFilter}
                customDictionariesFilter={customDictionariesFilter}
                displayType={this.state.displayType}
                displayConfig={feedDisplayDescription}
                project={project}
                selectedModels={models}
                filter={filter}
                t={t}
                onChangeFilter={this.onChangeFilter}
              />
              {/* <Hook callback={this.callback} isRequesting={isFetchingFeed} /> */}
            </div>
          ) : (
            <div className="justify-content-center">
              <img src={Spinner} alt="spinner" width={"100px"} />
            </div>
          )}
          {pageCharged && (
            <div>
              <p
                className=" text-center color-blue pointer"
                onClick={() => !isFetchingFeed && this.callback()}
              >
                {t("TEXT_SHOW_MORE")}...
              </p>
            </div>
          )}
        </Content>
      )
    );
  }
}
ListView.propTypes = {
  className: PropTypes.string,
  feed: PropTypes.object,
  customDictionaries: PropTypes.array,
  dictionaries: PropTypes.array,
  isFetching: PropTypes.object,
  showProjectPanel: PropTypes.bool,
};

ListView.defaultProps = {
  feed: {
    data: [],
    count: 0,
  },
  isFetching: {},
  customDictionaries: [],
  dictionaries: [],
  showProjectPanel: false,
};

function mapStateToProps(state) {
  return {
    feed: state.data.feed,
    isFetching: state.data.isFetching,
    feedDescription: state.data.feedDescription,
    feedDisplayDescription: state.data.feedDisplayDescription,
    customDictionaries: state.data.customDictionaries,
    dictionaries: state.data.dictionaries,
    permissions: state.persistedData.permissions,
    tags: state.data.tags,
    medias: state.data.medias,
    lang: state.persistedData.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFeed: (filter, page, sort = [], append = false) =>
      dispatch(Feed.search({ filter, sort }, { page, append })),
    describeFeed: () => dispatch(Feed.describe()),
    getDisplayConfig: () => dispatch(Feed.getDisplayConfig()),
    getMonitors: () => dispatch(Monitors.get()),
    getTags: () => dispatch(Tags.get()),
    getMedias: () => {
      dispatch(Medias.get());
    },
  };
}

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ListView)
);
