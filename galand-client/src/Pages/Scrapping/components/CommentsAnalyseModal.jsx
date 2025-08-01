import React, { useState, useEffect } from "react";
import MyModal from "@shared/Components/MyModal";
import { Button, Tabs, TabContent, Row, Col } from "adminlte-2-react";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import SadFace from "../../../assests/sad-sad-face.gif";
import Negative from "../../../assests/neg.png";
import NegativePlus from "../../../assests/neg+.png";
import Positive from "../../../assests/pos.png";
import PositivePlus from "../../../assests/pos+.png";
import HappyFace from "../../../assests/swirling-happy-face.gif";
import NeutralFace from "../../../assests/pgsr-emoji-iphone-meu.gif";
import axios from "axios";
import {apiEndpoint} from "../../../config";
import Spinner from "components/Spinner/Spinner";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export default function CommentsAnalyse({ text, label, item, comment, t }) {
    const [modalState, setModalState] = useState(false);
    const [analyse, setAnalyse] = useState({});
    const [feed, setFeed] = useState(item);
    const [commentData, setCommentData] = useState(comment);

    useEffect(() => {
        setCommentData(comment);
        setFeed(item)
      }, [comment, item]);

   const analyseText = (data) => {
       if (!modalState && data && !feed.analysed) {
        axios({
            url : apiEndpoint + "comment-analyse",
            method :"POST",
            data : {
                text : data,
                feed,
            },
            timeout : 0
        }).then(res=>{
            setAnalyse(res.data);
            setFeed({...feed, analyse : res.data, analysed : true})
        })
        .catch(err=>{
            setAnalyse({sentiment : "error"});
        })
       }else{
        setAnalyse(feed.analyse)
       }
   
    };
    const analyseComment = (data) => {
        if (!modalState && data && !commentData.analysed) {
         axios({
             url : apiEndpoint + "comment-analyse",
             method :"POST",
             data : {
                 text : data,
                 feed,
                 comment : commentData
                },
             timeout : 0
         }).then(res=>{
             setAnalyse(res.data)
             setCommentData({...commentData, analyse : res.data, analysed : true})
         })
         .catch(err=>{
             setAnalyse({sentiment : "error"});
         })
        }else{
            setAnalyse(commentData.analyse)
        }
    
     };
     const analyseSentiment = (analyse) =>{
        let sentiment = {sent : "neut", per : 50};
         if (analyse["sentiment"]) {
             if((analyse["sentiment"]["positive"]) >= 0.8 ){
                sentiment = {sent : "pos+", per : Math.trunc(analyse["sentiment"]["positive"] * 100)}
             }else if((analyse["sentiment"]["positive"]) >= 0.55 ){
                sentiment = {sent : "pos", per : Math.trunc(analyse["sentiment"]["positive"] * 100)}
             }else if((analyse["sentiment"]["negative"]) >= 0.8 ){
                sentiment = {sent : "neg+", per : Math.trunc(analyse["sentiment"]["positive"] * 100)}
             }else if((analyse["sentiment"]["negative"]) >= 0.55 ){
                        sentiment = {sent : "neg", per : Math.trunc(analyse["sentiment"]["positive"] * 100)}
             }else {
                    sentiment = {sent : "neut", per : Math.trunc(analyse["sentiment"]["positive"] * 100)}
                }
        }
         return sentiment
     }
    
    const dictionaryOptions = {
        responsive: true,
          title: {
            display: false,
            text: t("LABEL_CUSTOM_DICTIONAIRES"),
          }
        };

    const hateOptions = {
        responsive: true,
            title: {
            display: false,
            text: t("TITLE_HATE_SPEECH"),
            },
            scales: {
                  y: {
                  beginAtZero: true,
                  max: 100, // Set the maximum value for the y-axis to 100
                  }
              }
            };

    const hateArabicOptions = {
        responsive: true,
            title: {
            display: false,
            text: t("HATE_ARABIC_ANALYSER"),
            },
            scales: {
                    y: {
                    beginAtZero: true,
                    max: 100, // Set the maximum value for the y-axis to 100
                    }
                }
            };
    
    const dictionaryLabels = analyse && analyse["custom_dictionary"]? Object.keys(analyse["custom_dictionary"]) : [];
    const hateLabels = analyse && analyse["hate_speech"]?[t("LABEL_INSULT"), t("LABEL_SEVERE_TOXICITY"), t("LABEL_TOXICITY"), t("LABEL_THREAT"), t("LABEL_IDENTITY_ATTACK"), t("LABEL_PROFANITY")] : [];
    const internalHateLabels = analyse && analyse["hate_speech"]?[t("LABEL_NORMAL"),t("LABEL_OFFENSIVE"), t("LABEL_ABUSIVE"), t("LABEL_HATEFUL")] : [];
    const detoxifyLabels = analyse && analyse["detoxify"]?[t("LABEL_INSULT"), t("LABEL_SEVERE_TOXICITY"), t("LABEL_TOXICITY"), t("LABEL_THREAT"), t("LABEL_IDENTITY_ATTACK"), t("LABEL_OBSCENE"), t("LABEL_SEXUAL_EXPLICIT")] : [];
    const hateSpeechArabicLabels = analyse && analyse["hate_speech_arabic"]?[t("LABEL_IDENTITY_ATTACK"), t("LABEL_NORMAL"), t("LABEL_INSULT"), t("LABEL_THREAT"), t("LABEL_OBSCENE")] : [];
    const motif_derriere_violenceLabels = analyse && analyse["motif_derriere_violence"]?[t("OPTION_NONE"), t("TEXT_ECONOMIC"), t("TEXT_DOCTRINAL"), t("TEXT_LEGAL"), t("TEXT_SOCIAL_NORMS"), t("OPTION_RACIAL"), t("OPTION_GENDER_SEXISM"), t("TEXT_PROCEDURAL")] : [];
    const types_violenceLabels = analyse && analyse["types_violence"]?[t("OPTION_NONE"), t("TEXT_HARASSMENT_AND_VERBAL_ASSAULT"), t("TEXT_INCITEMENT_TO_PHYSICAL_VIOLENCE"), t("TEXT_MARGINALIZATION_SOCIAL_EXCLUSION_AND_SHAME"), t("TEXT_THREATS_AND_INTIMIDATION_WITH_THE_AIM_OF_WITHDRAWING_FROM_THE_RACE"), t("TEXT_SPREADING_RUMORS"), t("TEXT_SARCASM_AND_PROVOCATION")] : [];
    const stereotype_egard_femmesLabels = analyse && analyse["stereotype_egard_femmes"]?[t("TEXT_NO"), t("TEXT_YES")] : [];
    const nautre_commentairesLabels = analyse && analyse["nautre_commentaires"]?[t("TEXT_DONT_MATCH"), t("TEXT_AGAINST_FOREIGNER"), t("TEXT_BAD_ABOUT_WOMAN"), t("TEXT_RACIST"), t("TEXT_TREACHERY")] : [];
    //const forme_extrémisme_violent = analyse && analyse["forme_extrémisme_violent"]?[t("LABEL_IDENTITY_ATTACK"), t("LABEL_NORMAL"), t("LABEL_INSULT"), t("LABEL_THREAT"), t("LABEL_OBSCENE")] : [];
    const gravity_violenceLabels = analyse && analyse["gravity_violence"]?[t("TEXT_NEGATIVE_ACTIONS"), t("OPTION_NONE"), t("TEXT_DESCRIBE_THE_CHARACTER_IN_A_NEGATIVE_WAY"), t("OPTION_NO_CALL_APPLAUSE"), t("TEXT_DEMONIZING_DEHUMINAZING"), t("INCITEMENT_TO_VIOLENCE_AND_RIOT"), t("TEXT_INCITEMENT_TO_PHYSICAL_VIOLENCE")] : [];
    const passionLabels = analyse && analyse["passion"]?[t("OPTION_SENTIMENT_2"), t("OPTION_SENTIMENT_4"), t("TEXT_NEUTRAL"), t("OPTION_SENTIMENT_1"), t("OPTION_SENTIMENT_5")] : [];
    const sentiment2Labels = analyse && analyse["sentiment2"]?[t("TEXT_FLOU"), t("TEXT_NEGATIVE"), t("TEXT_NEUTRAL"), t("TEXT_POSITIVE")] : [];
    const cible_discours_haineLabels = analyse && analyse["cible_discours_haine"]?[t("TEXT_SKIN_COLOUR"), t("LABEL_GENDER"), t("DONT_MATCH"), t("TEXT_DISABILITY"), t("TEXT_RACE"), t("TEXT_REFUGEES"), t("TEXT_RELIGIOUS_AFFILIATION")] : [];
    const contient_discours_haineLabels = analyse && analyse["contient_discours_haine"]?[t("LABEL_IDENTITY_ATTACK"), t("LABEL_NORMAL"), t("LABEL_INSULT"), t("LABEL_THREAT"), t("LABEL_OBSCENE")] : [];
    const contre_femmeLabels = analyse && analyse["contre_femme"]?[t("LABEL_IDENTITY_ATTACK"), t("LABEL_NORMAL"), t("LABEL_INSULT"), t("LABEL_THREAT"), t("LABEL_OBSCENE")] : [];
    const danger_discours_haineLabels = analyse && analyse["danger_discours_haine"]?[t("LABEL_IDENTITY_ATTACK"), t("LABEL_NORMAL"), t("LABEL_INSULT"), t("LABEL_THREAT"), t("LABEL_OBSCENE")] : [];
    const emotionsLabels = analyse && analyse["emotions"]?[t("LABEL_IDENTITY_ATTACK"), t("LABEL_NORMAL"), t("LABEL_INSULT"), t("LABEL_THREAT"), t("LABEL_OBSCENE")] : [];
    const subjectLabels = analyse && analyse["subject"]?[t("LABEL_IDENTITY_ATTACK"), t("LABEL_NORMAL"), t("LABEL_INSULT"), t("LABEL_THREAT"), t("LABEL_OBSCENE")] : [];


    let hateBackground = [];
    let internalHateBackground = [];
    let detoxifyBackground = [];
    let hateSpeechArabicBackground = [];
    let motifDerriereViolenceBackground = [];
    let typesViolenceBackground = [];
    let stereotypeEgardsFemmesBackground = [];
    let nautreCommentairesBackground = [];
    let formeExtremismeViolentBackground = [];
    let gravityViolenceBackground = [];
    let passionBackground = [];
    let sentiment2Background = [];
    let cibleDiscoursHaineBackground = [];
    let contientDiscoursHaineBackground = [];
    let contreFemmeBackground = [];
    let dangerDiscoursHaineBackground = [];
    let emotionsBackground = [];
    let subjectBackground = [];

    let dataHate = analyse && analyse["hate_speech"]? 
    [analyse["hate_speech"]["insult"],analyse["hate_speech"]["severe_toxicity"],analyse["hate_speech"]["toxicity"],analyse["hate_speech"]["threat"],analyse["hate_speech"]["identity_attack"],analyse["hate_speech"]["profanity"]] : [];
    let internalDataHate = analyse && analyse["hate_speech"]? 
    [analyse["hate_speech"]["normal_model"],analyse["hate_speech"]["offensive_model"],analyse["hate_speech"]["abusive_model"],analyse["hate_speech"]["hateful_model"]] : [];
    let detoxifyDataHate =analyse && analyse["detoxify"]? 
    [analyse["detoxify"]["insult"],analyse["detoxify"]["severe_toxicity"],analyse["detoxify"]["toxicity"],analyse["detoxify"]["threat"],analyse["detoxify"]["identity_attack"],analyse["detoxify"]["obscene"],analyse["detoxify"]["sexual_explicit"]] : [];
    let dataHateSpeechArabic =analyse && analyse["hate_speech_arabic"]? 
    [analyse["hate_speech_arabic"]["attaque_identita"],analyse["hate_speech_arabic"]["impliete"],analyse["hate_speech_arabic"]["insulte"],analyse["hate_speech_arabic"]["menace"],analyse["hate_speech_arabic"]["obscenite"]] : [];
    let dataMotifDerriereViolence =analyse && analyse["motif_derriere_violence"]? 
    [analyse["motif_derriere_violence"]["aucune"],analyse["motif_derriere_violence"]["economique"],analyse["motif_derriere_violence"]["idéologique"],analyse["motif_derriere_violence"]["legal"],analyse["motif_derriere_violence"]["normes_sociales"] ,analyse["motif_derriere_violence"]["prejuge_racial"],analyse["motif_derriere_violence"]["prejuges_sexistes"] ,analyse["motif_derriere_violence"]["procedurale"]] : [];
    let dataTypesViolence =analyse && analyse["types_violence"]? 
    [analyse["types_violence"]["aucune"],analyse["types_violence"]["harcelement_agression_verbale"],analyse["types_violence"]["incitation_violence_physique"],analyse["types_violence"]["marginalisation_exclusion_sociale_honte"],analyse["types_violence"]["menaces_intimidations_intentionnelles"],analyse["types_violence"]["repandre_rumeurs"],analyse["types_violence"]["repandre_rumeurs"]] : [];
    let dataStereotypeEgardsFemmes =analyse && analyse["stereotype_egard_femmes"]? 
    [analyse["stereotype_egard_femmes"]["non"],analyse["stereotype_egard_femmes"]["oui"]] : [];    
    let dataNautreCommentaires =analyse && analyse["nautre_commentaires"]? 
    [analyse["nautre_commentaires"]["aucune"],analyse["nautre_commentaires"]["contre_etranger"],analyse["nautre_commentaires"]["offensant_envers_femmes"],analyse["nautre_commentaires"]["raciste"],analyse["nautre_commentaires"]["trahison"]] : [];
    let dataFormeExtremismeViolent =analyse && analyse["forme_extrémisme_violent"]? 
    [analyse["forme_extrémisme_violent"]["aucune"],analyse["forme_extrémisme_violent"]["extremisme_fonde_genre"],analyse["forme_extrémisme_violent"]["extremisme_politique"],analyse["forme_extrémisme_violent"]["extremisme_racial_ethnique"],analyse["forme_extrémisme_violent"]["extremisme_religieux"]] : [];
    let dataGravityViolence =analyse && analyse["gravity_violence"]? 
    [analyse["gravity_violence"]["actions_negatives"],analyse["gravity_violence"]["aucune"],analyse["gravity_violence"]["decrire_maniere_negative"],analyse["gravity_violence"]["desaccord_violation"],analyse["gravity_violence"]["diabolisation_deshumanisation"],analyse["gravity_violence"]["incitation_meurtre"],analyse["gravity_violence"]["incitation_violence"]] : [];
    let dataPassion =analyse && analyse["passion"]? 
    [analyse["passion"]["faible"],analyse["passion"]["fort"],analyse["passion"]["neutre"],analyse["passion"]["tres_faible"],analyse["passion"]["tres_fort"]] : [];
    let dataSentiment2 =analyse && analyse["sentiment2"]? 
    [analyse["sentiment2"]["flou"],analyse["sentiment2"]["negatif"],analyse["sentiment2"]["neutre"],analyse["sentiment2"]["positif"]] : [];
    let dataCibleDiscoursHaine =analyse && analyse["cible_discours_haine"]? 
    [analyse["cible_discours_haine"]["couleur"],analyse["cible_discours_haine"]["genre"],analyse["cible_discours_haine"]["inconnue"],analyse["cible_discours_haine"]["invalidite"],analyse["cible_discours_haine"]["race"],analyse["cible_discours_haine"]["refugies"],analyse["cible_discours_haine"]["religieuse"]] : [];
    let dataContientDiscoursHaine =analyse && analyse["contient_discours_haine"]? 
    [analyse["contient_discours_haine"]["inconnue"],analyse["contient_discours_haine"]["non"],analyse["contient_discours_haine"]["oui"]] : [];
    let dataContreFemme =analyse && analyse["contre_femme"]? 
    [analyse["contre_femme"]["agression_verbale"],analyse["contre_femme"]["aucunne"],analyse["contre_femme"]["harcelement_sexuel"],analyse["contre_femme"]["menace_physique"],analyse["contre_femme"]["représentation_incompetence"]] : [];
    let datadDangerDiscoursHaine =analyse && analyse["danger_discours_haine"]? 
    [analyse["danger_discours_haine"]["aucune"],analyse["danger_discours_haine"]["extremiste"],analyse["danger_discours_haine"]["faible"],analyse["danger_discours_haine"]["haut"],analyse["danger_discours_haine"]["modere"]] : [];
    let dataEmotions =analyse && analyse["emotions"]? 
    [analyse["emotions"]["degoute"],analyse["emotions"]["en_colere"],analyse["emotions"]["heureux"],analyse["emotions"]["rien"],analyse["emotions"]["surpris"],analyse["emotions"]["triste"]] : [];
    let dataSubject =analyse && analyse["subject"]? 
    [analyse["subject"]["affaires"],analyse["subject"]["autre"],analyse["subject"]["divertissement"],analyse["subject"]["education"],analyse["subject"]["elections"],analyse["subject"]["environnement"],analyse["subject"]["politique"],analyse["subject"]["sante"],analyse["subject"]["sociales"],analyse["subject"]["sports"],analyse["subject"]["technologie"]] : [];




    for (let index = 0; index < hateLabels.length; index++) {
        if(dataHate[index] >= 0.5){
            hateBackground.push('#ba2227')
        } else{
            hateBackground.push('#4b6043')
        };
        
    }
    for (let index = 0; index < internalHateLabels.length; index++) {
        if(internalDataHate[index] >= 0.5){
            internalHateBackground.push('#ba2227')
        } else{
            internalHateBackground.push('#4b6043')
        };
        
    }
    for (let index = 0; index < detoxifyLabels.length; index++) {
        if(detoxifyDataHate[index] >= 0.5){
            detoxifyBackground.push('#ba2227')
        } else{
            detoxifyBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < hateSpeechArabicLabels.length; index++) {
        if(dataHateSpeechArabic[index] >= 0.5){
            hateSpeechArabicBackground.push('#ba2227')
        } else{
            hateSpeechArabicBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < motif_derriere_violenceLabels.length; index++) {
        if(dataMotifDerriereViolence[index] >= 0.5){
            motifDerriereViolenceBackground.push('#ba2227')
        } else{
            motifDerriereViolenceBackground.push('#4b6043')
        };
        
    }


    for (let index = 0; index < types_violenceLabels.length; index++) {
        if(dataTypesViolence[index] >= 0.5){
            typesViolenceBackground.push('#ba2227')
        } else{
            typesViolenceBackground.push('#4b6043')
        };
        
    }


    for (let index = 0; index < stereotype_egard_femmesLabels.length; index++) {
        if(dataStereotypeEgardsFemmes[index] >= 0.5){
            stereotypeEgardsFemmesBackground.push('#ba2227')
        } else{
            stereotypeEgardsFemmesBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < nautre_commentairesLabels.length; index++) {
        if(dataNautreCommentaires[index] >= 0.5){
            nautreCommentairesBackground.push('#ba2227')
        } else{
            nautreCommentairesBackground.push('#4b6043')
        };
        
    }

    // for (let index = 0; index < form.length; index++) {
    //     if(dataFormeExtremismeViolent[index] >= 0.5){
    //         formeExtremismeViolentBackground.push('#ba2227')
    //     } else{
    //         formeExtremismeViolentBackground.push('#4b6043')
    //     };
        
    // }

    for (let index = 0; index < gravity_violenceLabels.length; index++) {
        if(dataGravityViolence[index] >= 0.5){
            gravityViolenceBackground.push('#ba2227')
        } else{
            gravityViolenceBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < passionLabels.length; index++) {
        if(dataPassion[index] >= 0.5){
            passionBackground.push('#ba2227')
        } else{
            passionBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < sentiment2Labels.length; index++) {
        if(dataSentiment2[index] >= 0.5){
            sentiment2Background.push('#ba2227')
        } else{
            sentiment2Background.push('#4b6043')
        };
        
    }

    for (let index = 0; index < cible_discours_haineLabels.length; index++) {
        if(dataCibleDiscoursHaine[index] >= 0.5){
            cibleDiscoursHaineBackground.push('#ba2227')
        } else{
            cibleDiscoursHaineBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < contient_discours_haineLabels.length; index++) {
        if(dataContientDiscoursHaine[index] >= 0.5){
            contientDiscoursHaineBackground.push('#ba2227')
        } else{
            contientDiscoursHaineBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < contre_femmeLabels.length; index++) {
        if(dataContreFemme[index] >= 0.5){
            contreFemmeBackground.push('#ba2227')
        } else{
            contreFemmeBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < danger_discours_haineLabels.length; index++) {
        if(datadDangerDiscoursHaine[index] >= 0.5){
            dangerDiscoursHaineBackground.push('#ba2227')
        } else{
            dangerDiscoursHaineBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < emotionsLabels.length; index++) {
        if(dataEmotions[index] >= 0.5){
            emotionsBackground.push('#ba2227')
        } else{
            emotionsBackground.push('#4b6043')
        };
        
    }

    for (let index = 0; index < subjectLabels.length; index++) {
        if(dataSubject[index] >= 0.5){
            subjectBackground.push('#ba2227')
        } else{
            subjectBackground.push('#4b6043')
        };
        
    }

    const dictionaryData = {
        labels:dictionaryLabels,
        datasets: [
          {
            label :t("LABEL_CUSTOM_DICTIONAIRES"),
            data: analyse && analyse["custom_dictionary"]? Object.values(analyse["custom_dictionary"]) : [],
            backgroundColor: '#ba2227',
          }
        ],
      };
    const hateData = {
        labels:hateLabels,
        datasets: [
          {
            label :t("TITLE_HATE_SPEECH") + " %",
            data: dataHate.map(el=>el*100),
            backgroundColor: hateBackground,
          }
        ],
      };
      const internalHateData = {
        labels:internalHateLabels,
        datasets: [
          {
            label :t("TITLE_HATE_SPEECH")+ " %",
            data: internalDataHate.map(el=>el*100),
            backgroundColor: internalHateBackground,
          }
        ],
      };
      const detoxifyData = {
        labels:detoxifyLabels,
        datasets: [
          {
            label :t("TITLE_HATE_SPEECH")+ " %",
            data: detoxifyDataHate.map(el=>el*100) ,
            backgroundColor: detoxifyBackground,
          }
        ],
      };

      const hateSpeechArabicData = {
        labels:hateSpeechArabicLabels,
        datasets: [
          {
            label :t("HATE_ARABIC_ANALYSER")+ " %",
            data: dataHateSpeechArabic.map(el=>el*100) ,
            backgroundColor: hateSpeechArabicBackground,
          }
        ],
      };


      const motif_derriere_violenceData = {
        labels: motif_derriere_violenceLabels,
        datasets: [
          {
            label :t("MOTIF_VIOLENCE_ANALYSER")+ " %",
            data: dataMotifDerriereViolence.map(el=>el*100) ,
            backgroundColor: motifDerriereViolenceBackground,
          }
        ],
      };

      const types_violenceData = {
        labels:types_violenceLabels,
        datasets: [
          {
            label :t("TYPE_DE_VIOLENCE_ANALYSER")+ " %",
            data: dataTypesViolence.map(el=>el*100) ,
            backgroundColor: typesViolenceBackground,
          }
        ],
      };

      const stereotype_egard_femmesData = {
        labels:stereotype_egard_femmesLabels,
        datasets: [
          {
            label :t("STEREOTIPE_ANALYSER")+ " %",
            data: dataStereotypeEgardsFemmes.map(el=>el*100) ,
            backgroundColor: stereotypeEgardsFemmesBackground,
          }
        ],
      };

      const nautre_commentairesData = {
        labels: nautre_commentairesLabels,
        datasets: [
          {
            label :t("NAUTRE_COMMENTS_ANALYSER")+ " %",
            data: dataNautreCommentaires.map(el=>el*100) ,
            backgroundColor: nautreCommentairesBackground,
          }
        ],
      };

    //   const forme_extrémisme_violentData = {
    //     labels: formeExtremismeLabels,
    //     datasets: [
    //       {
    //         label :t("HATE_ARABIC_ANALYSER")+ " %",
    //         data: dataFormeExtremismeViolent.map(el=>el*100) ,
    //         backgroundColor: formeExtremismeViolentBackground,
    //       }
    //     ],
    //   };

      const gravity_violenceData = {
        labels: gravity_violenceLabels,
        datasets: [
          {
            label :t("GRAVITY_VIOLENCE_ANALYSER")+ " %",
            data: dataGravityViolence.map(el=>el*100) ,
            backgroundColor: gravityViolenceBackground,
          }
        ],
      };

      const passionData = {
        labels: passionLabels,
        datasets: [
          {
            label :t("PASSION_ANALYSER")+ " %",
            data: dataPassion.map(el=>el*100) ,
            backgroundColor: passionBackground,
          }
        ],
      };

      const sentiment2Data = {
        labels:sentiment2Labels,
        datasets: [
          {
            label :t("SENTIMENT_ANALYSER")+ " %",
            data: dataSentiment2.map(el=>el*100) ,
            backgroundColor: sentiment2Background,
          }
        ],
      };

      const cible_discours_haineData = {
        labels:cible_discours_haineLabels,
        datasets: [
          {
            label :t("CIBLE_DISCOURS_HAINE_ANALYSER")+ " %",
            data: dataCibleDiscoursHaine.map(el=>el*100) ,
            backgroundColor: cibleDiscoursHaineBackground,
          }
        ],
      };

      const contient_discours_haineData = {
        labels:contient_discours_haineLabels,
        datasets: [
          {
            label :t("CONTIENT_DISCOURS_HAINE_ANALYSER")+ " %",
            data: dataContientDiscoursHaine.map(el=>el*100) ,
            backgroundColor: contientDiscoursHaineBackground,
          }
        ],
      };

      const contre_femmeData = {
        labels:contre_femmeLabels,
        datasets: [
          {
            label :t("CONTRE_FEMME_ANALYSER")+ " %",
            data: dataContreFemme.map(el=>el*100) ,
            backgroundColor: contreFemmeBackground,
          }
        ],
      };

      const danger_discours_haineData = {
        labels:danger_discours_haineLabels,
        datasets: [
          {
            label :t("DANGER_DISCOURS_HAINE_ANALYSER")+ " %",
            data: datadDangerDiscoursHaine.map(el=>el*100) ,
            backgroundColor: dangerDiscoursHaineBackground,
          }
        ],
      };

      const emotionsData = {
        labels:emotionsLabels,
        datasets: [
          {
            label :t("EMOTIONS_ANALYSER")+ " %",
            data: dataEmotions.map(el=>el*100) ,
            backgroundColor: emotionsBackground,
          }
        ],
      };

      const subjectData = {
        labels:subjectLabels,
        datasets: [
          {
            label :t("SUBJECT_ANALYSER")+ " %",
            data: dataSubject.map(el=>el*100) ,
            backgroundColor: subjectBackground,
          }
        ],
      };
    return (
        <div onClick={()=>label === t("TEXT_ANALYSER") ? analyseText(text) : analyseComment(text)}>
            {text && text.length != 0 && (
                <MyModal
                    hideSubmit={true}
                    block
                    title={t("TEXT_ANALYSER")}
                    size={"lg"}
                    onToggle={setModalState}
                    button={
                        <Button
                            size={"xs"}
                            icon={"fa-chart-bar"}
                            pullRight={true}
                            type="danger"
                            text={label}
                        />
                    }
                >

                <Tabs
                defaultActiveKey={t("EXTERNAL_ANALYSER")}
                >
                    <TabContent
                    eventKey={t("EXTERNAL_ANALYSER")}
                    title={t("EXTERNAL_ANALYSER")}
                    style={{marginTop:"15px"}}
                    >
                    {modalState ?
                    analyse && analyse["sentiment"] ?
                    <div style={{ minHeight: "500px !important"}}>
                            <h4>
                               <b className="underlined"> {t("LABEL_SENTENCE")}</b> :
                            </h4> 
                            <p className="padd-5">{text } </p>
                                <Row>
                                    <Col sm={6}>
                                            <h4 className="text-center"><b>{t("LABEL_SENTIMENT")}</b></h4>
                                            <div className="text-center">
                                                {
                                                analyseSentiment(analyse).sent === "pos+" ?
                                                    <>
                                                        <img src={PositivePlus} width={"60px"} className="img-responsive" alt="positive+"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                    </>
                                                : analyseSentiment(analyse).sent === "pos" ?
                                                    <>
                                                        <img src={Positive} width={"60px"} className="img-responsive" alt="positive"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                    </>
                                                : analyseSentiment(analyse).sent === "neg+" ?
                                                    <>
                                                        <img src={NegativePlus} width={"60px"} className="img-responsive" alt="negative+"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                    </>
                                                : analyseSentiment(analyse).sent === "neg" ?
                                                    <>
                                                        <img src={Negative} width={"60px"} className="img-responsive" alt="negative"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                    </>
                                                :
                                                    <>
                                                        <img src={NeutralFace} width={"60px"} className="img-responsive" alt="neutral"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4> 
                                                    </>
                                                }
                                            </div>
                                           
                                    </Col>
                                    <Col sm={6}>
                                    {analyse && analyse["custom_dictionary"] ?
                                    <Bar options={dictionaryOptions} data={dictionaryData} />
                                    :
                                    null}

                                    </Col>
                                    <div className="line-separator dashed"></div>

                                    <Col sm={12}>
                                    {analyse && analyse["hate_speech"] ?
                                    <Bar options={hateOptions} data={hateData} />
                                    :
                                    null}

                                    </Col>
                                </Row>                            
                    </div>:
                    <Spinner/>:
                    null
                    }
                    </TabContent>
                    <TabContent
                    eventKey={t("INTERNAL_ANALYSER")}
                    title={t("INTERNAL_ANALYSER")}
                    >
{modalState ?
                    analyse && analyse["sentiment"] ?
                    <div style={{ minHeight: "500px !important"}}>
                            <h4>
                               <b className="underlined"> {t("LABEL_SENTENCE")}</b> :
                            </h4> 
                            <p className="padd-5">{text } </p>
                                <div className="row">
                                    <div className="col-sm-6">
                                            <h4 className="text-center"><b>{t("LABEL_SENTIMENT")}</b></h4>
                                            <div className="text-center">
                                                {
                                                analyseSentiment(analyse).sent === "pos+" ?
                                                    <>
                                                        <img src={PositivePlus} width={"60px"} className="img-responsive" alt="positive+"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                    </>
                                                : analyseSentiment(analyse).sent === "pos" ?
                                                    <>
                                                        <img src={Positive} width={"60px"} className="img-responsive" alt="positive"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                    </>
                                                : analyseSentiment(analyse).sent === "neg+" ?
                                                    <>
                                                        <img src={NegativePlus} width={"60px"} className="img-responsive" alt="negative+"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                    </>
                                                : analyseSentiment(analyse).sent === "neg" ?
                                                    <>
                                                        <img src={Negative} width={"60px"} className="img-responsive" alt="negative"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                    </>
                                                :
                                                    <>
                                                        <img src={NeutralFace} width={"60px"} className="img-responsive" alt="neutral"/>
                                                        <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4> 
                                                    </>
                                                }
                                            </div>
                                           
                                    </div>
                                    <div className="col-sm-6">
                                    {analyse && analyse["custom_dictionary"] ?
                                    <Bar options={dictionaryOptions} data={dictionaryData} />
                                    :
                                    null}

                                    </div>
                                    <div className="line-separator dashed"></div>
                                    <div className="col-sm-12">
                                    {analyse && analyse["hate_speech"] ?
                                    <Bar options={hateOptions} data={internalHateData} />
                                    :
                                    null}

                                    </div>
                                </div>                            
                    </div>:
                    <Spinner/>:
                    null
                    }

                    </TabContent>

                    <TabContent
                    eventKey={t("DETOXIFY_ANALYSER")}
                    title={t("DETOXIFY_ANALYSER")}
                    >
{modalState ?
                    analyse && analyse["sentiment"] ?
                    <div style={{ minHeight: "500px !important"}}>
                            <h4>
                               <b className="underlined"> {t("LABEL_SENTENCE")}</b> :
                            </h4> 
                            <p className="padd-5">{text } </p>
                                <div className="row">
                                    <div className="col-sm-6">
                                            <h4 className="text-center"><b>{t("LABEL_SENTIMENT")}</b></h4>
                                            <div className="text-center">
                                            {
                                                 analyseSentiment(analyse).sent === "pos+" ?
                                                 <>
                                                     <img src={PositivePlus} width={"60px"} className="img-responsive" alt="positive+"/>
                                                     <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                 </>
                                             : analyseSentiment(analyse).sent === "pos" ?
                                                 <>
                                                     <img src={Positive} width={"60px"} className="img-responsive" alt="positive"/>
                                                     <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                 </>
                                             : analyseSentiment(analyse).sent === "neg+" ?
                                                 <>
                                                     <img src={NegativePlus} width={"60px"} className="img-responsive" alt="negative+"/>
                                                     <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                 </>
                                             : analyseSentiment(analyse).sent === "neg" ?
                                                 <>
                                                     <img src={Negative} width={"60px"} className="img-responsive" alt="negative"/>
                                                     <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4>
                                                 </>
                                             :
                                                 <>
                                                     <img src={NeutralFace} width={"60px"} className="img-responsive" alt="neutral"/>
                                                     <h4 className="margin-t-10 text-bold">{analyseSentiment(analyse).per}%</h4> 
                                                 </>
                                             }
                                            </div>
                                           
                                    </div>
                                    <div className="col-sm-6">
                                    {analyse && analyse["custom_dictionary"] ?
                                    <Bar options={dictionaryOptions} data={dictionaryData} />
                                    :
                                    null}

                                    </div>
                                    <div className="line-separator dashed"></div>
                                    <div className="col-sm-12">
                                    {analyse && analyse["detoxify"] ?
                                    <Bar options={hateOptions} data={detoxifyData} />
                                    :
                                    null}

                                    </div>
                                </div>                            
                    </div>:
                    <Spinner/>:
                    null
                    }

                    </TabContent>

                    <TabContent
                    eventKey={t("HATE_ARABIC_ANALYSER")}
                    title={t("HATE_ARABIC_ANALYSER")}
                    >
                    {modalState ?
                        analyse && analyse["hate_speech_arabic"] ?
                            <Bar options={hateArabicOptions} data={hateSpeechArabicData} />
                            :
                            null
                            :
                    <Spinner/>
                    }

                    </TabContent>

                    <TabContent
                    eventKey={t("MOTIF_VIOLENCE_ANALYSER")}
                    title={t("MOTIF_VIOLENCE_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("MOTIF_VIOLENCE_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={motif_derriere_violenceData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("TYPE_DE_VIOLENCE_ANALYSER")}
                    title={t("TYPE_DE_VIOLENCE_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("TYPE_DE_VIOLENCE_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={types_violenceData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("STEREOTIPE_ANALYSER")}
                    title={t("STEREOTIPE_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("STEREOTIPE_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={stereotype_egard_femmesData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("NAUTRE_COMMENTS_ANALYSER")}
                    title={t("NAUTRE_COMMENTS_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("NAUTRE_COMMENTS_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={nautre_commentairesData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("GRAVITY_VIOLENCE_ANALYSER")}
                    title={t("GRAVITY_VIOLENCE_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("GRAVITY_VIOLENCE_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={gravity_violenceData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("PASSION_ANALYSER")}
                    title={t("PASSION_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("PASSION_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={passionData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("SENTIMENT_ANALYSER")}
                    title={t("SENTIMENT_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("SENTIMENT_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={sentiment2Data} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("CIBLE_DISCOUR_HAINE_ANALYSER")}
                    title={t("CIBLE_DISCOUR_HAINE_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("CIBLE_DISCOUR_HAINE_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={cible_discours_haineData} />:<Spinner/>}

                    </TabContent>


                    <TabContent
                    eventKey={t("CONTIENT_DISCOUR_HAINE_ANALYSER")}
                    title={t("CONTIENT_DISCOUR_HAINE_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("CONTIENT_DISCOUR_HAINE_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={contient_discours_haineData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("CONTRE_FEMME_ANALYSER")}
                    title={t("CONTRE_FEMME_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("CONTRE_FEMME_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={contre_femmeData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("DANGER_DISCOUR_HAINE_ANALYSER")}
                    title={t("DANGER_DISCOUR_HAINE_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("DANGER_DISCOUR_HAINE_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={danger_discours_haineData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("EMOTIONS_ANALYSER")}
                    title={t("EMOTIONS_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("EMOTIONS_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={emotionsData} />:<Spinner/>}

                    </TabContent>

                    <TabContent
                    eventKey={t("SUBJECT_ANALYSER")}
                    title={t("SUBJECT_ANALYSER")}
                    >
                    
                    {modalState ?      
                        <Bar options={{
                            responsive: true,
                                title: {
                                display: false,
                                text: t("SUBJECT_ANALYSER"),
                                },
                                scales: {
                                        y: {
                                        beginAtZero: true,
                                        max: 100, // Set the maximum value for the y-axis to 100
                                        }
                                    }
                                }} 
                            data={subjectData} />:<Spinner/>}

                    </TabContent>
                </Tabs>
                </MyModal>
            )}
        </div>
    );
}
