import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import MyModal from "@shared/Components/MyModal";
import { Button } from "adminlte-2-react";
import axios from "axios";
import { apiEndpoint } from "config";
import { supplyDataBasedLang } from "./questions";
import Spinner from "components/Spinner/Spinner";

const ChatGptAnswer = ({ t, text, label, item }) => {
  const [analyse, setAnalyse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [display, openModal] = useState(false);
  const { optionsObject, options, questions } = supplyDataBasedLang(t);

  const analyseText = async () => {
    setLoading(true);
    try {
      if (text) {
        const analyserSystem =
          "I will need you to act as a data annotation expert on misinformation, hate speech, online violence against women in politics, and emotional analysis. I will provide you with different social media posts/tweets in different languages, including Arabic, English, French, Spanish, and Portuguese. Your role is to analyze, annotate and label this social media data based on the following multiple-choice questions: NOTE: Don't answer quickly but give some time for thinking and analysis and then give me only the response. reply using the post/tweet language . ALways respond with the question and the answer and split the response with a new line. don't translate the question to the post/tweet language";

        const messages = questions
          .map(
            (el, i) => (i === 0 ? text + "\n\n" : "") + el + "\n" + options[i]
          )
          .join("\n\n");

        const response = await axios({
          url: apiEndpoint + "chat-gpt",
          method: "POST",
          data: {
            messages: messages,
            systems: analyserSystem,
            feed: item,
          },
          timeout: 0,
        });
        const data = response.data.response;
        setAnalyse(data);
        setLoading(false);
      }
    } catch (error) {
      setAnalyse([]);
      setLoading(false);
    }
  };
  return (
    <div
      onClick={() => {
        !display && analyseText();
        openModal(true);
      }}
    >
      {text && text.length && (
        <MyModal
          block
          size="lg"
          onToggle={openModal}
          button={
            <Button
              size={"xs"}
              onClick={() => openModal(false)}
              pullRight={true}
              type="danger"
              text={label}
            />
          }
          submitText={t("BTN_REGENERATE")}
          submitType={"success"}
          submit={() => analyseText()}
          title={t("CHAT_GPT_ANALYSER")}
        >
          {display && (
            <div>
              <h3 className="title">{text}</h3>
              {!loading ? (
                analyse.map((el, i) => (
                  <div key={i} className={"chat-gpt bg-skip-" + (i % 2)}>
                    <label>{el.message}</label>
                    {Object.keys(optionsObject[i]).map((option, j) =>
                      el.content[0] === option ? (
                        <p key={j}>
                          <b style={{ color: "#4f90fc" }}>
                            {option + ". " + optionsObject[i][option]}
                          </b>
                        </p>
                      ) : (
                        <p>{option + ". " + optionsObject[i][option]}</p>
                      )
                    )}
                  </div>
                ))
              ) : (
                <Spinner />
              )}
            </div>
          )}
        </MyModal>
      )}
    </div>
  );
};

export default withTranslation()(ChatGptAnswer);
