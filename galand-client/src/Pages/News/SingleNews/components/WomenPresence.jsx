import PropTypes, { any } from "prop-types";
import { withTranslation } from "react-i18next";
import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Inputs, Button } from "adminlte-2-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "reactstrap/es/Form";
import { News } from "modules/ressources";
import Select from "components/Select";
import MyModal from "@shared/Components/MyModal";

const { Text} = Inputs;

class WomanPresence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: this.props.news,
      step: "addingNews",
      divs:["div1"],
      comments_left : []
    };

    this.onChange = this.onChange.bind(this);
  }

  

  componentDidUpdate(prevProps) {
    const { news } = this.props;
    if (!_.isEqual(prevProps.news, news)) {
      this.setState({ news });
      if(news.data_comments && news.data_comments.data){
        let all_comments = news.data_comments.data;
        let selected_comments = news.woman_presence.selected_comments ? news.woman_presence.selected_comments : []; 
  
  
        for (let i = 0; i < all_comments.length; i++) {
          for (let j = 0; j < selected_comments.length; j++) {
            if(all_comments[i].comment === selected_comments[j].comment){
              all_comments = all_comments.slice(0,i).concat(all_comments.slice(i+1 , all_comments.length))
            }
          }
         
        }   
        this.setState({
          comments_left : all_comments
        })   
      }
      
    }
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
      }
    ];
  }

  getViolenceTypesOptions(t) {
    return [
      {
        label: t("TEXT_INCITEMENT_VIOLENCE"),
        value: 0,
        description: t("DES_TEXT_INCITEMENT_VIOLENCE"),
      },
      {
        label: t("TEXT_RAPE_THREATS"),
        value: 1,
        description: t("DES_TEXT_RAPE_THREATS"),
      },
      {
        label: t("TEXT_MARGINALIZATION_SHAMING"),
        value: 2,
        description: t("DES_TEXT_MARGINALIZATION_SHAMING"),
      },
      {
        label: t("TEXT_STEREOTYPING"),
        value: 3,
        description: t("DES_TEXT_STEREOTYPING"),
      },
      {
        label: t("TEXT_DISINFORMATION"),
        value: 4,
        description: t("DES_TEXT_DISINFORMATION"),
      },
      {
        label: t("TEXT_SEXUAL_VERBAL_HARASSMENT"),
        value: 5,
        description: t("DES_TEXT_SEXUAL_VERBAL_HARASSMENT"),
      },
      {
        label: t("TEXT_NONCONSENSUAL_SHARING"),
        value: 6,
        description: t("DES_TEXT_NONCONSENSUAL_SHARING"),
      },
      {
        label: t("TEXT_DOXING"),
        value: 7,
        description: t("DES_TEXT_DOXING"),
      },
      {
        label: t("TEXT_HOSTILE_POLITICAL_PROFILING"),
        value: 8,
        description: t("DES_TEXT_HOSTILE_POLITICAL_PROFILING"),
      },
      {
        label: t("TEXT_LEGAL_HARASSMENT_INTIMIDATION"),
        value: 9,
        description: t("DES_TEXT_LEGAL_HARASSMENT_INTIMIDATION"),
      },
      {
        label: t("TEXT_OTHER_PLEASE_SPECIFY"),
        value: 12,
        description: t("DES_TEXT_2_OTHERS"),
      }
    ];
  }

  getHateSpeechLevelsOptions(t) {
    return [
      {
        label: t("TEXT_DISAGREEMENT"),
        value: 0,
        description: t("DES_TEXT_DISAGREEMENT"),
      },
      {
        label: t("TEXT_NEGATIVE_ACTIONS"),
        value: 1,
        description: t("DES_TEXT_NEGATIVE_ACTIONS"),
      },
      {
        label: t("TEXT_NEGATIVE_CHARACTERIZATION"),
        value: 2,
        description: t("DES_TEXT_NEGATIVE_CHARACTERIZATION"),
      },
      {
        label: t("TEXT_DEMONIZING_DEHUMANIZING"),
        value: 3,
        description: t("DES_TEXT_DEMONIZING_DEHUMANIZING"),
      },
      {
        label: t("TEXT_VIOLENCE"),
        value: 4,
        description: t("DES_TEXT_VIOLENCE"),
      },
      {
        label: t("TEXT_DEATH"),
        value: 5,
        description: t("DES_TEXT_DEATH"),
      }
    ];
  }

  getTargetGenderOptions(t) {
    return [
      {
        label: t("TEXT_WOMEN"),
        value: 0,
        description: t("DES_TEXT_WOMEN"),
      },
      {
        label: t("TEXT_MEN"),
        value: 1,
        description: t("DES_TEXT_MEN"),
      },
      {
        label: t("TEXT_NONBINARY"),
        value: 2,
        description: t("DES_TEXT_NONBINARY"),
      },
      {
        label: t("TEXT_UNCLEAR"),
        value: 3,
        description: t("DES_TEXT_UNCLEAR"),
      },
      {
        label: t("TEXT_NOT_APPLICABLE"),
        value: 4,
        description: t("DES_TEXT_NOT_APPLICABLE"),
      }
    ];
  }

  getYesNoUnclearOptions(t) {
    return [
      {
        label: t("TEXT_YES"),
        value: 0,
      },
      {
        label: t("TEXT_NO"),
        value: 1,
      },
      {
        label: t("TEXT_UNCLEAR"),
        value: 2,
      }
    ];
  }

  getTargetRolesOptions(t) {
    return [
      {
        label: t("TEXT_JOURNALIST"),
        value: 0,
        description: t("DES_TEXT_JOURNALIST"),
      },
      {
        label: t("TEXT_RELIGIOUS_FIGURE"),
        value: 1,
        description: t("DES_TEXT_RELIGIOUS_FIGURE"),
      },
      {
        label: t("TEXT_POLITICIAN"),
        value: 2,
        description: t("DES_TEXT_POLITICIAN"),
      },
      {
        label: t("TEXT_ACADEMIC"),
        value: 3,
        description: t("DES_TEXT_ACADEMIC"),
      },
      {
        label: t("TEXT_GOVERNMENT_EMPLOYEE"),
        value: 4,
        description: t("DES_TEXT_GOVERNMENT_EMPLOYEE"),
      },
      {
        label: t("TEXT_CSO_REPRESENTATIVE"),
        value: 5,
        description: t("DES_TEXT_CSO_REPRESENTATIVE"),
      },
      {
        label: t("TEXT_OTHER_SPECIFY"),
        value: 6,
        description: t("DES_TEXT_3_OTHERS"),
      }
    ];
  }
  getAIContentTypesOptions(t) {
    return [
      {
        label: t("TEXT_ALTERED_PHOTO"),
        value: 0,
        description: t("DES_TEXT_ALTERED_PHOTO"),
      },
      {
        label: t("TEXT_ALTERED_VIDEO"),
        value: 1,
        description: t("DES_TEXT_ALTERED_VIDEO"),
      },
      {
        label: t("TEXT_AI_GENERATED_PHOTO"),
        value: 2,
        description: t("DES_TEXT_AI_GENERATED_PHOTO"),
      },
      {
        label: t("TEXT_AI_GENERATED_VIDEO"),
        value: 3,
        description: t("DES_TEXT_AI_GENERATED_VIDEO"),
      },
      {
        label: t("TEXT_DEEP_FAKES"),
        value: 4,
        description: t("DES_TEXT_DEEP_FAKES"),
      },
      {
        label: t("TEXT_AI_GENERATED_TEXT"),
        value: 5,
        description: t("DES_TEXT_AI_GENERATED_TEXT"),
      },
      {
        label: t("TEXT_NONE"),
        value: 6,
        description: t("DES_TEXT_NONE"),
      }
    ];
  }
  
getDisinformationTypeOptions(t) {
  return [
    { label: t("TEXT_ALTERED_PHOTO"), value: 0 },
    { label: t("TEXT_ALTERED_VIDEO"), value: 1 },
    { label: t("TEXT_AI_GENERATED_PHOTO"), value: 2 },
    { label: t("TEXT_AI_GENERATED_VIDEO"), value: 3 },
    { label: t("TEXT_DEEP_FAKES"), value: 4 },
    { label: t("TEXT_AI_GENERATED_TEXT"), value: 5 }
  ];
}

  //
 
  onChange(e) {
    const { news } = this.state;
    const { name, value } = e.target;   
    if (name.indexOf("hate_against_woman")>-1 && value ===0) {
      let hate_type = "hate_type_"+name.replace(/\D/g,'');
      let woman_presence = news.woman_presence;
      woman_presence[name] = value;
      woman_presence[hate_type] = null;
      return this.setState({
     news: { ...news, woman_presence  }
   });
   }

   if (name.indexOf("stereotype_woman")>-1 && value ===0) {
    let stereoDes = "description_stereotype_"+ name.replace(/\D/g,'');
    let stereoPara = "paragraph_stereotype_"+ name.replace(/\D/g,'');
    let woman_presence = news.woman_presence;
    woman_presence[name] = value;
    woman_presence[stereoDes] = null;
    woman_presence[stereoPara] = null;
    return this.setState({
      news: { ...news, woman_presence  }
 });
 }

   if (name.indexOf("positif_woman_speech")>-1 && value ===0) {
    let posSpeechDes = "positif_speech_description_"+ name.replace(/\D/g,'');
    let posSpeechPara = "positif_speech_paragraph_"+ name.replace(/\D/g,'');
    let woman_presence = news.woman_presence;
    woman_presence[name] = value;
    woman_presence[posSpeechDes] = null;
    woman_presence[posSpeechPara] = null;
    return this.setState({
      news: { ...news, woman_presence  }
 });
 }
     this.setState({
      news: { ...news, woman_presence : {...news.woman_presence,[name]: value} }
    });
  }

  addForm = (toggleModal) =>{
    let {news, selected_comment, comments_left} = this.state;
    let comment = comments_left.filter((el,i)=>i===selected_comment);
    let comments_number = news.woman_presence.divs.length;
    let selected_comments =news.woman_presence.selected_comments? news.woman_presence.selected_comments.concat(comment) : [comment[0]];
    let woman_presence = {...news.woman_presence,divs:news.woman_presence.divs.concat(["div"]), selected_comments}
    woman_presence[`comment_text_${comments_number}`] = comment[0].comment;
    woman_presence[`comment_author_${comments_number}`] = comment[0].userName;
    this.setState({
      news: { ...news, woman_presence} ,comments_left : comments_left.filter((el,i)=>i!==selected_comment) 
    });
    toggleModal()
  }

  deleteComment = (index) =>{
    let woman_presence = this.state.news.woman_presence;
    let comments_left = this.state.comments_left;
    let toBeOmitted = [];
    let divs = woman_presence.divs;
    let keys = Object.keys(woman_presence);

    let selected_comments = woman_presence.selected_comments;
    let new_selected_comments = selected_comments.filter(el=>el.comment !== woman_presence[`comment_text_${index}`]);
    let selected_comment = selected_comments.filter(el=>el.comment === woman_presence[`comment_text_${index}`]);
    keys.forEach(el=>{
      if(el.indexOf(String(index))>-1){
        toBeOmitted.push(el)
      }
    })
    toBeOmitted.forEach(el=>woman_presence[el]=null);
    keys = Object.keys(woman_presence);

    for (let i = index + 1 ; i < divs.length; i++) {
      for (let j = 0; j <  keys.length; j++) {
        if(keys[j].indexOf(String(i))>-1){
          let key = keys[j].replace(String(i), String(i-1));
          woman_presence[key] = woman_presence[keys[j]];
          woman_presence[keys[j]]=null;
        }
      }

    }
    divs.pop();
    
    woman_presence.divs = divs;
    woman_presence.selected_comments = new_selected_comments;
    comments_left.push(selected_comment[0])
    this.setState({
      news :  {...this.state.news, woman_presence }, comments_left
    })
  }

  render() {
    let {news, selected_comment, comments_left} = this.state
    const { t, update, lang } = this.props;
    if (!news.woman_presence){
      news.woman_presence = {
        divs:["div"]
      }
    }

    if (news.woman_presence && !news.woman_presence.divs){
      news.woman_presence["divs"] = ["div"];
      news.woman_presence["hate_exist_gbv_0"] = news.woman_presence["hate_exist_gbv"];
      news.woman_presence["motivator_of_gbv_0"] = news.woman_presence["motivator_of_gbv"];
      news.woman_presence["question_83_0"] = news.woman_presence["question_83"];
      news.woman_presence["indicator_of_gbv_0"] = news.woman_presence["indicator_of_gbv"];
      news.woman_presence["question_84_0"] = news.woman_presence["question_84"];
      news.woman_presence["harmful_weherd_0"] = news.woman_presence["harmful_weherd"];
      news.woman_presence["harmful_women_0"] = news.woman_presence["harmful_women"];
      news.woman_presence["target_of_gbv_0"] = news.woman_presence["target_of_gbv"];
      news.woman_presence["question_85_0"] = news.woman_presence["question_85"];
      news.woman_presence["lgbti_of_gbv_0"] = news.woman_presence["lgbti_of_gbv"];
      news.woman_presence["question_86_0"] = news.woman_presence["question_86"];
      news.woman_presence["actor_type_0"] = news.woman_presence["actor_type"];
      news.woman_presence["harmful_0"] = news.woman_presence["harmful"];
      news.woman_presence["disinformation_type_0"] = news.woman_presence["disinformation_type"];
      news.woman_presence["media_type_n_0"] = news.woman_presence["media_type_n"];
      news.woman_presence["explicit_or_gbv_0"] = news.woman_presence["explicit_or_gbv"];
      news.woman_presence["tone_of_gbv_0"] = news.woman_presence["tone_of_gbv"];
      news.woman_presence["responsable_of_gbv_0"] = news.woman_presence["responsable_of_gbv"];
      news.woman_presence["bias_of_gbv_0"] = news.woman_presence["bias_of_gbv"];
    }

    const inputSize = { labelMd: 2, md: 10, labelSm: 4, sm: 8 };
    return (
      <Form onSubmit={()=>update(this.state.news)} className={"form-horizontal form-grid"}>
        {
          news.woman_presence.divs.map((el,i)=><Col xs={12}>
            {i!==0?
            <React.Fragment>
              {lang !== "ar"? <div className="d-flex justify-content-between">
                <h3 className="margin-b-15">
                  {t("TITLE_COMMENT_NUMBER") + " " + i}
                </h3>
                <div>
                <Button
                    onClick={() => this.deleteComment(i)}
                    size={"md"}
                    icon={"fa-trash"}
                    type="danger"
                    className="margin-t-20"
                />
                </div>
              </div>:
              <div className="d-flex justify-content-between">
              <div>
              <Button
                  onClick={() => this.deleteComment(i)}
                  size={"md"}
                  icon={"fa-trash"}
                  type="danger"
                  className="margin-t-20"
              />
              </div>
              <h3 className="margin-b-15">
                {t("TITLE_COMMENT_NUMBER") + " " + i}
              </h3>

            </div>}

            <Text
                labelClass={null}
                {...inputSize}
                placeholder={t("LABEL_COMMENT_TEXT")}
                label={t("LABEL_COMMENT_TEXT") }
                rows={4}
                inputType={"textarea"}
                onChange={this.onChange}
                name={"comment_text_"+i}
                value={eval(`news.woman_presence.comment_text_${i}`) || ""}
            />
            <Text
                labelClass={null}
                {...inputSize}
                placeholder={t("LABEL_AUTHOR_NAME")}
                label={t("LABEL_AUTHOR_NAME") }
                inputType={"text"}
                onChange={this.onChange}
                name={"comment_author_"+i}
                value={eval(`news.woman_presence.comment_author_${i}`) || ""}
            />
            </React.Fragment>:
            null}
          
          { i === 0 ?
          <>
          {/*<Select
            name={"talk_about_woman_"+i}
            placeholder={t("LABEL_TALK_ABOUT_WOMAN")}
            iconLeft={"fa-stamp"}
            value={eval(`news.woman_presence.talk_about_woman_${i}`)|| 0}
            options={this.getGenderOptions(t)}
            {...inputSize}
            label={t("LABEL_TALK_ABOUT_WOMAN") + ":"}
            onChange={this.onChange}
          />*/}
          <Select
            name={"hate_exist_gbv_"+i}
            placeholder={t("LABEL_HATE_EXIST_GBV")}
            iconLeft={"fa-stamp"}
            value={eval(`news.woman_presence.hate_exist_gbv_${i}`)}
            options={this.getYesOrNoOptions(t)}
            {...inputSize}
            label={t("LABEL_HATE_EXIST_GBV") + ":"}
            onChange={this.onChange}
          />
        {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
          placeholder={t("LABEL_MOTIVATOR_OF_GBV")}
          iconLeft={"fa-tags"}
          value={eval(`news.woman_presence.motivator_of_gbv_${i}`)}
          options={this.getViolenceTypesOptions(t)}
          multiple={false}
          allowClear={true}
          {...inputSize}
          label={t("LABEL_MOTIVATOR_OF_GBV") + ":"}
          name={"motivator_of_gbv_"+i}
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
        />:null}
          {eval(`news.woman_presence.motivator_of_gbv_${i}`) === 12 ?
          <Text
              labelClass={null}
              {...inputSize}
              placeholder={t("LABEL_QUESTION_83")}
              label={t("LABEL_QUESTION_83") }
              inputType={"text"}
              onChange={this.onChange}
              name={"question_83_"+i}
              value={eval(`news.woman_presence.question_83_${i}`)}
            />
          :null}
        {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
            placeholder={t("LABEL_INDICATOR_OF_GBV")}
            iconLeft={"fa-tags"}
            value={eval(`news.woman_presence.indicator_of_gbv_${i}`)}
            options={this.getHateSpeechLevelsOptions(t)}
            multiple={false}
            allowClear={true}
            {...inputSize}
            label={t("LABEL_INDICATOR_OF_GBV") + ":"}
            name={"indicator_of_gbv_"+i}
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
        />:null}
          {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
            placeholder={t("LABEL_TARGET_OF_GBV")}
            iconLeft={"fa-tags"}
            value={eval(`news.woman_presence.target_of_gbv_${i}`)}
            options={this.getTargetGenderOptions(t)}
            multiple={false}
            allowClear={true}
            {...inputSize}
            label={t("LABEL_TARGET_OF_GBV") + ":"}
            name={"target_of_gbv_"+i}
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
        />:null}
        {eval(`news.woman_presence.hate_exist_gbv_${i}`) ?
          <Text
              labelClass={null}
              {...inputSize}
              placeholder={t("LABEL_QUESTION_84")}
              label={t("LABEL_QUESTION_84") }
              inputType={"text"}
              onChange={this.onChange}
              name={"question_84_"+i}
              value={eval(`news.woman_presence.question_84_${i}`)}
            />
          :null}
          
          {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
            placeholder={t("LABEL_HARMFUL_WEHRD")}
            iconLeft={"fa-tags"}
            value={eval(`news.woman_presence.harmful_weherd_${i}`)}
            options={this.getYesNoUnclearOptions(t)}
            multiple={false}
            allowClear={true}
            {...inputSize}
            label={t("LABEL_HARMFUL_WEHRD") + ":"}
            name={"harmful_weherd_"+i}
            onChange={this.onChange}
        />:null}
        
          {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
            placeholder={t("LABEL_HARMFUL_WOMEN")}
            iconLeft={"fa-tags"}
            value={eval(`news.woman_presence.harmful_women_${i}`)}
            options={this.getYesNoUnclearOptions(t)}
            multiple={false}
            allowClear={true}
            {...inputSize}
            label={t("LABEL_HARMFUL_WOMEN") + ":"}
            name={"harmful_women_"+i}
            onChange={this.onChange}
        />:null}

          {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
            placeholder={t("LABEL_LGBTI_OF_GBV")}
            iconLeft={"fa-tags"}
            value={eval(`news.woman_presence.lgbti_of_gbv_${i}`)}
            options={this.getTargetRolesOptions(t)}
            multiple={false}
            allowClear={true}
            {...inputSize}
            label={t("LABEL_LGBTI_OF_GBV") + ":"}
            name={"lgbti_of_gbv_"+i}
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
        />:null}
          {eval(`news.woman_presence.lgbti_of_gbv_${i}`) === 6 ?
          <Text
              labelClass={null}
              {...inputSize}
              placeholder={t("LABEL_QUESTION_86")}
              label={t("LABEL_QUESTION_86") }
              inputType={"text"}
              onChange={this.onChange}
              name={"question_86_"+i}
              value={eval(`news.woman_presence.question_86_${i}`)}
            />
            :null}
          {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
          placeholder={t("LABEL_BIAS_OF_GBV")}
          iconLeft={"fa-tags"}
          value={eval(`news.woman_presence.bias_of_gbv_${i}`)}
          options={this.getYesNoUnclearOptions(t)}
          multiple={false}
          allowClear={true}
          {...inputSize}
          label={t("LABEL_BIAS_OF_GBV") + ":"}
          name={"bias_of_gbv_"+i}
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
        />:null}
        {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Text
              labelClass={null}
              {...inputSize}
              placeholder={t("LABEL_HARMFUL")}
              label={t("LABEL_HARMFUL") }
              inputType={"text"}
              onChange={this.onChange}
              name={"harmful_"+i}
              value={eval(`news.woman_presence.harmful_${i}`)}
            />:null}
        {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
          placeholder={t("LABEL_DISINFORMATION_TYPE")}
          iconLeft={"fa-tags"}
          value={eval(`news.woman_presence.disinformation_type_${i}`)}
          options={this.getAIContentTypesOptions(t)}
          multiple={false}
          allowClear={true}
          {...inputSize}
          label={t("LABEL_DISINFORMATION_TYPE") + ":"}
          name={"disinformation_type_"+i}
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
        />:null}
          

          {/*{eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
          placeholder={t("LABEL_ACTOR_TYPE")}
          iconLeft={"fa-tags"}
          value={eval(`news.woman_presence.actor_type_${i}`)}
          options={this.getActorTypeOptions(t)}
          multiple={false}
          allowClear={true}
          {...inputSize}
          label={t("LABEL_ACTOR_TYPE") + ":"}
          name={"actor_type_"+i}
          onChange={this.onChange}
        />:null}
        
        {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Text
              labelClass={null}
              {...inputSize}
              placeholder={t("LABEL_O_MEDIA_TYPE")}
              label={t("LABEL_O_MEDIA_TYPE") }
              inputType={"text"}
              onChange={this.onChange}
              name={"media_type_n_"+i}
              value={eval(`news.woman_presence.media_type_n_${i}`)}
            />:null}
        {/*{eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
          placeholder={t("LABEL_EXPLICIT_OR_GBV")}
          iconLeft={"fa-tags"}
          value={eval(`news.woman_presence.explicit_or_gbv_${i}`)}
          options={this.getExplicitnessOptions(t)}
          multiple={false}
          allowClear={true}
          {...inputSize}
          label={t("LABEL_EXPLICIT_OR_GBV") + ":"}
          name={"explicit_or_gbv_"+i}
          onChange={this.onChange}
        />:null}
        {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
          placeholder={t("LABEL_TONE_OF_GBV")}
          iconLeft={"fa-tags"}
          value={eval(`news.woman_presence.tone_of_gbv_${i}`)}
          options={this.getToneAndContentOptions(t)}
          multiple={false}
          allowClear={true}
          {...inputSize}
          label={t("LABEL_TONE_OF_GBV") + ":"}
          name={"tone_of_gbv_"+i}
          onChange={this.onChange}
        />:null}
        {eval(`news.woman_presence.hate_exist_gbv_${i}`)?
          <Select
          placeholder={t("LABEL_RESPONSABLE_OF_GBV")}
          iconLeft={"fa-tags"}
          value={eval(`news.woman_presence.responsable_of_gbv_${i}`)}
          options={this.getResponseNatureOptions(t)}
          multiple={false}
          allowClear={true}
          {...inputSize}
          label={t("LABEL_RESPONSABLE_OF_GBV") + ":"}
          name={"responsable_of_gbv_"+i}
          onChange={this.onChange}
        />:null}*/}
        
        
        </>:null
            }
        </Col>)
        }

{comments_left.length ?<MyModal
        className={this.props.className}
        button={
          <Button
            block={false}
            icon={"fa-plus"}
            className={"col-md-4 pull-right"}
            type="success"
            pullRight={true}
            text={t("BTN_AJOUTER_UN_COMMENTAIRE")}
          />
        }
        submitText={t("BTN_AJOUTER")}
        title={t("BTN_AJOUTER_UN_COMMENTAIRE")}
        submit={this.addForm}
      >
        {
          comments_left.map(
            (el,i)=><div className={i === selected_comment ?"comment-box selected-comment" : "comment-box"} key={i} onClick={()=>this.setState({
              selected_comment : i
            })}>{el.comment}</div>)
            
        }
      </MyModal>:null}
        
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
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: (data, cb) => dispatch(News.update(data, cb)),
  };
}

function mapStateToProps(state) {
  return {
    lang : state.persistedData.lang
  };
}

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(WomanPresence)
);

WomanPresence.propTypes = {
  update: PropTypes.func.isRequired,
  news: PropTypes.object,
};
WomanPresence.defaultProps = {
  news: {}
};