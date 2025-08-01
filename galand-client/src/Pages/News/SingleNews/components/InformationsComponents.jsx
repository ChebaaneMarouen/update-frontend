import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "../../News.css";
import Tag from "../../../../components/Tags/Tag";
import { Form, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileComponent from "components/File";
import CoverImage from "../../components/CoverImage";
import { newsFilePath } from "modules/ressources";
import { Col, Inputs, Button } from "adminlte-2-react";
import Select from "components/Select";
import { connect } from "react-redux";
import { News, ActorRessource } from "modules/ressources";

const { Text } = Inputs; 

function getTime(date) {
  if (date) return new Date(date).toISOString().replace("T", " ").replace(/\..*/, "");
}
class InformationsComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news,
    };
  }
  componentDidMount(){
    const {initFunction} = this.props;
    this.setState({
      news: this.props.news,
    })
    initFunction()
  }
  componentDidUpdate(prevProps){
    if(this.props.news !== prevProps.news){
      this.setState({
        news : this.props.news
      })
    }
  }
  formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }
  formatTime(date) {
    let d = new Date(date),
      hours = "" + (d.getHours() + 1),
      minutes = "" + d.getMinutes();

    if (hours.length < 2) hours = "0" + hours;
    if (minutes.length < 2) minutes = "0" + minutes;

    return [hours, minutes].join(":");
  }
  getContentCategoriesOptions(t) {
    return [
      {
        label: t("TEXT_POLITICS"),
        value: 0,
        description: t("DES_TEXT_POLITICS"),
      },
      {
        label: t("TEXT_ENVIRONMENT"),
        value: 1,
        description: t("DES_TEXT_ENVIRONMENT"),
      },
      {
        label: t("TEXT_SOCIAL_ISSUES"),
        value: 2,
        description: t("DES_TEXT_SOCIAL_ISSUES"),
      },
      {
        label: t("TEXT_TECHNOLOGY"),
        value: 3,
        description: t("DES_TEXT_TECHNOLOGY"),
      },
      {
        label: t("TEXT_SPORTS_ENTERTAINMENT"),
        value: 4,
        description: t("DES_TEXT_SPORTS_ENTERTAINMENT"),
      },
      {
        label: t("TEXT_OTHER"),
        value: 8,
        description: t("DES_TEXT_1_OTHER"),
      }
    ];
  }

  getToneOptions(t) {
    return [
      { label: t("TEXT_POSITIVE"), value: 0 },
      { label: t("TEXT_NEGATIVE"), value: 1 },
      { label: t("TEXT_NEUTRAL"), value: 2 }
    ];
  }

getEmotionalTonesOptions(t) {
    return [
      {
        label: t("TEXT_HAPPY"),
        value: 0,
        description: t("DES_TEXT_HAPPY"),
      },
      {
        label: t("TEXT_SAD"),
        value: 1,
        description: t("DES_TEXT_SAD"),
      },
      {
        label: t("TEXT_ANGRY_DISGUSTED"),
        value: 2,
        description: t("DES_TEXT_ANGRY_DISGUSTED"),
      },
      {
        label: t("TEXT_FEARFUL"),
        value: 3,
        description: t("DES_TEXT_FEARFUL"),
      },
      {
        label: t("TEXT_CONFUSED_SURPRISED"),
        value: 4,
        description: t("DES_TEXT_CONFUSED_SURPRISED"),
      },
      {
        label: t("TEXT_RIDICULE_MOCKERY"),
        value: 5,
        description: t("DES_TEXT_RIDICULE_MOCKERY"),
      },
      {
        label: t("TEXT_NONE"),
        value: 6,
        description: t("DES_TEXT_NONE"),
      }
    ];
  }


  getYesOrNoOptions(t) {
    return [
      {
        label: t("TEXT_NO"),
        value: 0
      },
      {
        label: t("TEXT_YES"),
        value: 1
      },
    ];
  }
  onChange = (e) =>{
    const { news } = this.state;
    const { name, value } = e.target;
    this.setState({
      news: { ...news, monitor_social_media : {...news.monitor_social_media,[name]: value} }
    });
  }
  render() {
    const {news} = this.state
    const { topic_type, link_event, what_event, sentiment_post, overall_sentiment_post, sentiment_post_id, call_action, what_call_action, emotions_post, emotions_post_other } = news.monitor_social_media ? news.monitor_social_media : {};
    const { t, update, actors } = this.props;
  
    const inputSize = { labelMd: 3, md: 9, labelSm: 4, sm: 8 };
    console.log("physical reflection", this.state)
    console.log("actors", actors)
    if(!news._id) return null;
    return (
      <div>
        <div className={"margin-b-15"}>
          {news.subjects.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
          {news.categories.map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
        <CoverImage news={news} />
        <p className={"text-right help-block"}>
          <br />
          {news.creatorInfo.fName + " " + news.creatorInfo.lName + " - "}
          {this.formatDate(news.created) + " "} {this.formatTime(news.created)}
        </p>
        {/* {news.infraction.status ? <Infraction news={news} t={t} /> : null} */}
        <div className="box box-default">
          <div className="box-header with-border">
            <h3 className="box-title">
              <Label>
                <FontAwesomeIcon icon={["far", "comment"]} /> {t("LABEL_DESCRIPTION")}
              </Label>
            </h3>
            <div className="box-body">{news.text}</div>
          </div>
        </div>
        <div className="box box-default">
          <div className="box-header with-border">
            <h2 className=" text-center underlined margin-b-15">
              {t("TITLE_MONITOR_SOCIAL_MEDIA")}
            </h2>
            <div className="box-body">
            <Form onSubmit={()=>update(this.state.news)} className={"form-horizontal form-grid"}>
            <Col xs={12}>
              <Select
                placeholder={t("LABEL_TOPIC_TYPE")}
                iconLeft={"fa-tags"}
                value={topic_type} 
                options={this.getContentCategoriesOptions(t)}
                multiple={true}
                allowClear={true}
                {...inputSize}
                label={t("LABEL_TOPIC_TYPE") }
                name="topic_type"
                onChange={this.onChange}
                formatOptionLabel={(option) => (
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{option.label}</span>
                    <FontAwesomeIcon
                      icon="info-circle"
                      className="text-info ml-2"
                      title={option.description}
                      data-toggle="tooltip"
                    />
                  </div>
                )}
              />

              <Select
                name="overall_sentiment_post"
                placeholder={t("LABEL_OVERALL_SENTIMENT_POST")}
                iconLeft={"fa-tags"}
                value={overall_sentiment_post}
                options={this.getToneOptions(t)}
                {...inputSize}
                label={t("LABEL_OVERALL_SENTIMENT_POST") }
                onChange={this.onChange}
              />

              <Select
                name="emotions_post"
                placeholder={t("LABEL_EMOTIONS_POST")}
                iconLeft={"fa-tags"}
                value={emotions_post}
                options={this.getEmotionalTonesOptions(t)}
                {...inputSize}
                label={t("LABEL_EMOTIONS_POST") }
                onChange={this.onChange}
                formatOptionLabel={(option) => (
                  <div className="d-flex justify-content-between align-items-center">
                    <span>{option.label}</span>
                    <FontAwesomeIcon
                      icon="info-circle"
                      className="text-info ml-2"
                      title={option.description}
                      data-toggle="tooltip"
                    />
                  </div>
                )}
              />
              {emotions_post === 10 ?<React.Fragment>
              <Text
                labelClass={null}
                {...inputSize}
                placeholder={t("LABEL_EMOTIONS_POST_OTHER")}
                label={t("LABEL_EMOTIONS_POST_OTHER") }
                inputType={"text"}
                onChange={this.onChange}
                name="emotions_post_other"
                value={emotions_post_other}
              />
              </React.Fragment>: null}

              <Select
                name="link_event"
                placeholder={t("LABEL_LINK_EVENT")}
                iconLeft={"fa-tags"}
                value={link_event}
                options={this.getYesOrNoOptions(t)}
                {...inputSize}
                label={t("LABEL_LINK_EVENT") }
                onChange={this.onChange}
              />
              {link_event?<React.Fragment>
              <Text
                labelClass={null}
                {...inputSize}
                placeholder={t("LABEL_WHAT_EVENT")}
                label={t("LABEL_WHAT_EVENT") }
                inputType={"text"}
                onChange={this.onChange}
                name="what_event"
                value={what_event}
              />
              </React.Fragment>: null}

              {/*<Select
                name="sentiment_post"
                placeholder={t("LABEL_SENTIMENT_POST")}
                iconLeft={"fa-tags"}
                value={sentiment_post}
                options={this.getToneOptions(t)}
                {...inputSize}
                label={t("LABEL_SENTIMENT_POST") }
                onChange={this.onChange}
              />
              <Select
                placeholder={t("LABEL_SENTIMENT_POST_ID")}
                iconLeft={"fa-tags"}
                value={sentiment_post_id} 
                options={this.getTargetTypeOptions(t)}
                multiple={true}
                allowClear={true}
                {...inputSize}
                label={t("LABEL_SENTIMENT_POST_ID") }
                name="sentiment_post_id"
                onChange={this.onChange}
              />

              <Select
                name="call_action"
                placeholder={t("LABEL_CALL_ACTION")}
                iconLeft={"fa-tags"}
                value={call_action}
                options={this.getCallToActionOptions(t)}
                {...inputSize}
                label={t("LABEL_CALL_ACTION") }
                onChange={this.onChange}
              />
              {call_action === 4 ?<React.Fragment>
              <Text
                labelClass={null}
                {...inputSize}
                placeholder={t("LABEL_WHAT_CALL_ACTION")}
                label={t("LABEL_WHAT_CALL_ACTION") }
                inputType={"text"}
                onChange={this.onChange}
                name="what_call_action"
                value={what_call_action}
              />
              </React.Fragment>: null}*/}
              
              <div className="d-flex justify-content-center">
                    <Button
                      block
                      onClick={() => update(this.state.news)}
                      icon={"fa-plus"}
                      type="success"
                      text={t("BTN_SAVED")}
                    />
                  <Button
                    block
                    disabled={this.state.news.finalized}
                    onClick={() =>
                      !this.state.news.finalized
                        ? update({ ...this.state.news, finalized: true })
                        : undefined
                    }
                    icon={"fa-check"}
                    type={!this.state.news.finalized ? "success" : "danger"}
                    text={t("BTN_FINALIZE")}
                  />
                  </div>
              </Col>
            </Form>
            </div>
          </div>
        </div>
        {/* <div className="box box-default">
          <div className="box-header with-border">
            <h3 className="box-title">
              <Label>
                <FontAwesomeIcon icon={["fas", "photo-video"]} />
                {" " + t("LABEL_PREUVES")}
              </Label>
            </h3>
            <div className="box-body">
              {news.files.map((fileItem) => (
                <FileComponent file={fileItem} key={fileItem.serverId} staticPath={newsFilePath} />
              ))}
            </div>
          </div>
        </div> */}
        {/* <div className="box box-default">
          <div className="box-header with-border">
            <h3 className="box-title">
              <Label>
                <FontAwesomeIcon icon={["fas", "link"]} /> {" " + t("LABEL_URLS")}
              </Label>
            </h3>
            <div className="box-body">
              {news.additionalLinks.map((link) => (
                <a href={link} target={"_blank"}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div> */}
        {/* {news.comments.map((c, i) => (
          <div key={i} className="box box-default">
            <div className="box-header with-border">
              <h2 className="box-title">
                <b> {c && c.user && c.user.fName + " " + c.user.lName}</b>
              </h2>
              <span className="pull-right text-info">{getTime(c.created)}</span>
            </div>
            <div className="box-body">{c.text}</div>
          </div>
        ))} */}
        {/* <div className="box box-default">
          <div className="box-header with-border">
            <Form className={"form-horizontal form-grid"}>{this.props.children}</Form>
          </div>
        </div> */}
        {/* <Form className={"form-horizontal form-grid"}>
          <Text
            rows={4}
            inputType={"textarea"}
            name={"userComment"}
            onChange={this.props.onChangeComment}
            value={this.props.userComment}
            labelSm={0}
            sm={12}
            placeholder={t("BTN_AJOUTER_UN_COMMENTAIRE")}
          />
          <Button
            block
            onClick={(e) => this.props.onSubmit(e)}
            value={"userComment"}
            icon={"fa-share"}
            type="success"
            text={t("BTN_AJOUTER_UN_COMMENTAIRE")}
          />
        </Form> */}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    update: (data, cb) => dispatch(News.update(data, cb)),
    initFunction: () => {
      dispatch(ActorRessource.get());
  },
  };
}
function mapStateToProps(state) {
  return {
      actors : state.data.actors,
  };
}
InformationsComponents.defaultProps = {
  actors : []
};
export default withTranslation()(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(InformationsComponents)
)