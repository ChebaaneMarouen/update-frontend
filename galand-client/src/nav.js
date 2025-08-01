import React from "react";
import { Sidebar } from "adminlte-2-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { splitIcon } from "adminlte-2-react/src/components/Utilities";
import logo from "./assests/emonitor-logo.png";

const { Item, UserPanel } = Sidebar;
export default function getNav(permissions) {
  return function (page) {
    // TODO take care of roles
    switch (page) {
      case "dashboard":
        return true;
      case "news":
        return permissions["P_FAKENEWS"];
      case "assignedNews":
        return permissions["P_GET_ASSIGNED"];
      case "media":
        return permissions["P_MEDIA"];
      case "videos":
        return permissions["P_VIDEO"];
      case "scrapping":
        return permissions["P_ACCESS_SCRAPPING"];
      case "addDictionary":
        return permissions["P_DICTIONNARY"];
      case "projects":
        return permissions["P_PROJECT"];
      case "tags":
        return permissions["P_TAGS"];
      case "fakenewsInfractions":
        return permissions["P_FAKENEWS_INFRACTIONS"];
      case "monitoringInfractions":
        return permissions["P_MONITORING_INFRACTIONS"];
      case "rules":
        return permissions["P_RULES"];
      case "roles":
        return permissions["P_ROLES"];
      case "users":
        return permissions["P_USERS"];
      case "settings":
        return permissions["P_EDIT_SYSTEM_SEETINGS"];
      case "customSearch":
        return permissions["P_CUSTOM_SEARCH"];
      case "stats":
        return permissions["P_ACCESS_STATISTICS"];
      case "models":
        return permissions["P_MACHINE_LEARNING_MODELS"];
      case "classifications":
        return permissions["P_CLASSIFICATION"];
      case "forms":
        return permissions["P_FORM"];

      default:
        return true;
    }
  };
}
export function getSideBar(navFilter, t, projects, userId, fName, lName) {
  return [
    /*    <UserPanel username={fName + " " + lName} 
    key="user-pannel"
              imageUrl={"https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"}
              status={t("LABEL_CONNECTED")}
              statusType={"success"}/
	>,*/

    <div className="items-group items-dashboard">
      <div
        className="header header-dashboard"
        onClick={() => {
          var dashboard = document.getElementById("dashboard");
          const stateHidden = dashboard.className === "hidden";
          stateHidden
            ? dashboard.classList.remove("hidden")
            : dashboard.classList.add("hidden");
          var news = document.getElementById("news");
          var videos = document.getElementById("videos");
          var setting = document.getElementById("setting");
          var monitoring = document.getElementById("monitoring");
          var roles = document.getElementById("roles");
          var workspace = document.getElementById("workspace");
          workspace.classList.add("hidden");
          videos.classList.add("hidden");
          roles.classList.add("hidden");
          monitoring.classList.add("hidden");
          setting.classList.add("hidden");
          news.classList.add("hidden");
        }}
      >
        <img src={logo} className="mobile-logo" />
        <Item
          key="dashboard"
          text={t("NAV_DASHBOARD")}
          icon="fa-home"
          to="/dashboard"
        />
      </div>
      <ul id="dashboard" className="hidden">
        {navFilter("dashboard") && (
          <Item
            key="dashboard"
            text={t("NAV_USER_DASHBOARD")}
            icon="fa-tachometer-alt"
            to="/dashboard"
          />
        )}
        {navFilter("dashboard") && (
          <Item
            key="dashboard-analytic"
            text={t("NAV_ANALYTICAL_DASHBOARD")}
            icon="fa-tachometer-alt"
            to="/dashboard-analytic"
          />
        )}
        {navFilter("dashboard") && (
          <Item
            key="dashboard-metrics"
            text={t("NAV_METRICS_DASHBOARD")}
            icon="fa-tachometer-alt"
            to="/dashboard-metrics"
          />
        )}
      </ul>
    </div>,
    <div className="items-group items-dashboard">
      <div
        className="header header-dashboard"
        onClick={() => {
          var dashboard = document.getElementById("dashboard");
          var news = document.getElementById("news");
          var videos = document.getElementById("videos");
          var setting = document.getElementById("setting");
          var monitoring = document.getElementById("monitoring");
          var roles = document.getElementById("roles");
          var workspace = document.getElementById("workspace");
          const stateHidden = workspace.className === "hidden";
          stateHidden
            ? workspace.classList.remove("hidden")
            : workspace.classList.add("hidden");
          videos.classList.add("hidden");
          roles.classList.add("hidden");
          monitoring.classList.add("hidden");
          setting.classList.add("hidden");
          news.classList.add("hidden");
          dashboard.classList.add("hidden");
        }}
      >
        <Item
          key="news"
          text={t("NAV_WORKSPACE")}
          icon="fa-star"
          to="/news/assigned"
        />
      </div>
      <ul id="workspace" className="hidden">
        <Item
          key="view-list-assigned"
          text={t("NAV_FAKENEWS_ASSIGNÉ")}
          icon="fa-tasks"
          to="/news/assigned"
        />
        <Item
          key="view-list-added"
          text={t("NAV_FAKENEWS_AJOUTÉ")}
          icon="fa-list"
          to="/news/added"
        />
        {navFilter("fakenewsInfractions") >= 1 && (
          <Item
            key="infractions-list"
            text={t("NAV_INFRACTIONS")}
            icon="fa-times-circle"
            to="/infractions"
          />
        )}
        <Item
          key="view-list-fakenews"
          text={t("NAV_FAKE_NEWS")}
          icon="fa-list"
          to="/news/fakenews"
        />
      </ul>
    </div>,
    <div className="items-group items-news">
      <div
        className="header header-news"
        onClick={() => {
          var dashboard = document.getElementById("dashboard");
          var news = document.getElementById("news");
          const stateHidden = news.className === "hidden";
          stateHidden
            ? news.classList.remove("hidden")
            : news.classList.add("hidden");
          var videos = document.getElementById("videos");
          var setting = document.getElementById("setting");
          var monitoring = document.getElementById("monitoring");
          var roles = document.getElementById("roles");
          var workspace = document.getElementById("workspace");
          workspace.classList.add("hidden");
          videos.classList.add("hidden");
          roles.classList.add("hidden");
          monitoring.classList.add("hidden");
          setting.classList.add("hidden");
          dashboard.classList.add("hidden");
        }}
      >
        <Item
          key="news"
          text={t("NAV_FAKENEWS")}
          icon="fa-window-restore"
          to="/AddNews"
        />
      </div>
      <ul id="news" className="hidden">
        {navFilter("news") >= 2 && (
          <Item
            key="add-news"
            text={t("NAV_AJOUTER_UNE_FAKENEWS")}
            icon="fa-plus-square"
            to="/AddNews"
          />
        )}
        {navFilter("news") >= 1 && (
          <Item
            key="view-list"
            text={t("NAV_LISTE_DES_FAKENEWS")}
            icon="fa-newspaper"
            to="/news"
          />
        )}

        {navFilter("news") >= 1 && (
          <Item
            key="scrapping-fn"
            text={t("NAV_LISTE_DES_ARTICLES")}
            icon="fa-th-list"
            to="/scraping-fakenews"
          />
        )}
      </ul>
    </div>,

    /*<li className="header">{t("NAV_SOCIAL_MEDIA_MONITORING")}</li>,
    navFilter("projects") && (
      <Item key="projects" text={t("NAV_PROJECTS")} icon="fa-project-diagram">
        <Item key="manage-projects" text={t("NAV_GESTION_DES_PROJECTS")} icon="fa-pen" to="/projects" />
        {projects
        .filter(pro=>pro.assignees.find(assig=> assig === userId) !== undefined)
        .map((pr) => (
          <Item
            key={pr._id}
            text={`${pr.title} ${pr.endProject < Date.now() ? "*" : ""}`}
            icon={pr.endProject < Date.now() ? "fa-exclamation-triangle" : "fa-tasks"}
            to={"/projects/" + pr._id}
          />
        ))}
      </Item>
    ),
    navFilter("forms") && <Item key="forms" text={t("NAV_FORMS")} icon="fa-align-left" to="/forms" />,
    navFilter("monitoringInfractions") >= 1 && (
      <Item
        key="monitoring-infractions"
        text={t("NAV_INFRACTIONS")}
        icon="fa-times-circle"
        to="/monitoring-infractions"
      />
    ),
    navFilter("scrapping") && (
      <Item
        key="ViewScrappingList"
        text={t("NAV_LISTE_DES_ARTICLES")}
        icon="fa-th-list"
        to="/view-scrapping-list"
      />
    ),*/

    <div className="items-group items-videos">
      <div
        className="header header-videos"
        onClick={() => {
          var dashboard = document.getElementById("dashboard");
          var news = document.getElementById("news");
          var videos = document.getElementById("videos");
          const stateHidden = videos.className === "hidden";
          stateHidden
            ? videos.classList.remove("hidden")
            : videos.classList.add("hidden");
          var setting = document.getElementById("setting");
          var monitoring = document.getElementById("monitoring");
          var roles = document.getElementById("roles");
          var workspace = document.getElementById("workspace");
          workspace.classList.add("hidden");
          roles.classList.add("hidden");
          monitoring.classList.add("hidden");
          setting.classList.add("hidden");
          news.classList.add("hidden");
          dashboard.classList.add("hidden");
        }}
      >
        <Item
          key="videos"
          text={t("NAV_AUTOMATIC_ANALYSIS")}
          icon="fa-window-restore"
          to="/videos-preprocessing"
        />
      </div>
      <ul id="videos" className="hidden">
        {navFilter("videos") >= 2 && (
          <Item
            key="manage-videos"
            text={t("NAV_GESTION_DES_VIDEOS")}
            icon="fab-youtube"
            to="/videos-preprocessing"
          />
        )}

        {navFilter("classification") >= 1 && (
          <Item
            key="classifications"
            text={t("NAV_CLASSIFICATIONS")}
            icon="fa-server"
            to="/classifications"
          />
        )}
        {navFilter("models") && (
          <Item
            key="Models"
            text={t("NAV_MODELS")}
            icon="fa-laptop-code"
            to="/models"
          />
        )}
        {navFilter("sentiment-all") && (
          <Item
            key="sentiment"
            text={t("NAV_SENTIMENTS")}
            icon="fa-server"
            to="/sentiment-manager"
          />
        )}
        {navFilter("sentimentModels") && (
          <Item
            key="sentimentModels"
            text={t("NAV_MODELS")}
            icon="fa-laptop-code"
            to="/sentiment-models"
          />
        )}
        {navFilter("addDictionary") >= 1 && (
          <Item
            key="AddDict"
            text={t("NAV_DICTIONNAIRE")}
            icon="fa-book"
            to="/add-dictionary"
          />
        )}
        {navFilter("addDictionary") >= 1 && (
          <Item
            key="AddCustDict"
            text={t("NAV_CUST_DICTIONNAIRE")}
            icon="fa-atlas"
            to="/add-custom-dictionary"
          />
        )}
      </ul>
    </div>,
    <div className="items-group items-media">
      <div
        className="header header-setting"
        onClick={() => {
          var dashboard = document.getElementById("dashboard");
          var news = document.getElementById("news");
          var videos = document.getElementById("videos");
          var setting = document.getElementById("setting");
          const stateHidden = setting.className === "hidden";
          stateHidden
            ? setting.classList.remove("hidden")
            : setting.classList.add("hidden");
          var monitoring = document.getElementById("monitoring");
          var roles = document.getElementById("roles");
          var workspace = document.getElementById("workspace");
          workspace.classList.add("hidden");
          videos.classList.add("hidden");
          roles.classList.add("hidden");
          monitoring.classList.add("hidden");
          news.classList.add("hidden");
          dashboard.classList.add("hidden");
        }}
      >
        <Item
          key="media"
          text={t("NAV_CONFIGURATIONS")}
          icon="fa-cog"
          to="/manage-medias"
        />
      </div>
      <ul id="setting" className="hidden">
        {navFilter("media") && (
          <Item
            key="manage-medias"
            text={t("NAV_GESTION_DES_MÉDIAS")}
            icon="fab-searchengin"
            to="/manage-medias"
          />
        )}
        {navFilter("rules") >= 1 && (
          <Item
            key="rules"
            text={t("NAV_RULES")}
            icon="fa-file-word"
            to="/scrapping-config"
          />
        )}
        {navFilter("customSearch") >= 1 && (
          <Item
            key="customSearches"
            text={t("NAV_CUSTOM_SEARCH")}
            icon="fa-save"
            to="/custom-search"
          />
        )}
        {navFilter("tags") && (
          <Item
            key="sujets"
            text={t("NAV_GESTION_DES_SUJETS")}
            icon="fa-spell-check"
            to="/sujets"
          />
        )}
        {navFilter("tags") && (
          <Item
            key="categories"
            text={t("NAV_GESTION_DES_CATEGORIES")}
            icon="fa-copyright"
            to="/categories"
          />
        )}
        {navFilter("tags") && (
          <Item
            key="actors"
            text={t("NAV_GESTION_DES_ACTEURS")}
            icon="fa-users-cog"
            to="/actors"
          />
        )}
        {navFilter("tags") && (
          <Item
            key="lists"
            text={t("NAV_GESTION_DES_LIST")}
            icon="fa-users-cog"
            to="/lists"
          />
        )}
        {navFilter("tags") && (
          <Item
            key="civils"
            text={t("NAV_GESTION_DES_SOCIETE_CIVIL")}
            icon="fa-users-cog"
            to="/civils"
          />
        )}
        {navFilter("tags") && (
          <Item
            key="constituency"
            text={t("NAV_GESTION_DES_CIRCONSCRIPTION")}
            icon="fa-users-cog"
            to="/constituency"
          />
        )}
        {navFilter("settings") && (
          <Item
            key="settings"
            text={t("NAV_SETTINGS")}
            icon="fa-laptop-code"
            to="/ParserSettings"
          />
        )}
        {navFilter("settings") && (
          <Item
            key="settings-crawlers"
            text={t("NAV_SETTINGS_CRAWLER")}
            icon="fa-laptop-code"
            to="/CrawlerSettings"
          />
        )}
        {navFilter("settings") && (
          <Item
            key="settings-displays"
            text={t("NAV_SETTINGS_DISPLAY")}
            icon="fa-laptop-code"
            to="/DisplaySettings"
          />
        )}
        {navFilter("settings") && (
          <Item
            key="settings-more"
            text={t("NAV_SETTINGS_MORE")}
            icon="fa-laptop-code"
            to="/MoreSettings"
          />
        )}
        {navFilter("stats") && (
          <Item
            key="stats"
            text={t("NAV_STATISTIQUES")}
            icon="fa-chart-area"
            to="/statistique"
          />
        )}
      </ul>
    </div>,
    <div className="items-group items-monitoring-program">
      <div
        className="header header-monitoring-program"
        onClick={() => {
          var dashboard = document.getElementById("dashboard");
          var news = document.getElementById("news");
          var videos = document.getElementById("videos");
          var setting = document.getElementById("setting");
          var monitoring = document.getElementById("monitoring");
          const stateHidden = monitoring.className === "hidden";
          stateHidden
            ? monitoring.classList.remove("hidden")
            : monitoring.classList.add("hidden");
          var roles = document.getElementById("roles");
          var workspace = document.getElementById("workspace");
          workspace.classList.add("hidden");
          videos.classList.add("hidden");
          roles.classList.add("hidden");
          setting.classList.add("hidden");
          news.classList.add("hidden");
          dashboard.classList.add("hidden");
        }}
      >
        <Item
          key="monitoring-program"
          text={t("NAV_AUDIO_VISUAL_MONITORING")}
          icon="fa-laptop-code"
          to="/monitoring-program"
        />
      </div>
      <ul id="monitoring" className="hidden">
        <Item
          key="NAV_MONITORING_PROGRAM"
          text={t("NAV_MONITORING_PROGRAM")}
          icon="fa-laptop-code"
          to="/monitoring-program"
        />
        <Item
          key="NAV_MONITORING_PLURALITY"
          text={t("NAV_MONITORING_PLURALITY")}
          icon="fa-laptop-code"
          to="/monitoring-plurality"
        />
        <Item
          key="NAV_MONITORING_ELECTORAL_IRREGULARITIES"
          text={t("NAV_MONITORING_ELECTORAL_IRREGULARITIES")}
          icon="fa-laptop-code"
          to="/monitoring-electoral-irregularities"
        />
      </ul>
    </div>,
    <div className="items-group items-roles">
      <div
        className="header header-roles"
        onClick={() => {
          var dashboard = document.getElementById("dashboard");
          var news = document.getElementById("news");
          var videos = document.getElementById("videos");
          var setting = document.getElementById("setting");
          var monitoring = document.getElementById("monitoring");
          var roles = document.getElementById("roles");
          const stateHidden = roles.className === "hidden";
          stateHidden
            ? roles.classList.remove("hidden")
            : roles.classList.add("hidden");
          var workspace = document.getElementById("workspace");
          workspace.classList.add("hidden");
          videos.classList.add("hidden");
          monitoring.classList.add("hidden");
          setting.classList.add("hidden");
          news.classList.add("hidden");
          dashboard.classList.add("hidden");
        }}
      >
        <Item
          key="roles"
          text={t("NAV_USER_SETTINGS")}
          icon="fa-users"
          to="/roles"
        />
      </div>
      <ul id="roles" className="hidden">
        {navFilter("roles") && (
          <Item
            key="roles"
            text={t("NAV_GESTION_DES_ROLES")}
            icon="fa-users"
            to="/roles"
          />
        )}
        {navFilter("users") && (
          <Item
            key="users"
            text={t("NAV_GESTION_DES_UTILISATEURS")}
            icon="fa-users-cog"
            to="/Users"
          />
        )}
      </ul>
    </div>,
    // <Item key="logout" text={t("NAV_SE_DECONNECTER")} icon="fa-sign-out-alt" to="/logout" />
  ].filter(Boolean);
}
