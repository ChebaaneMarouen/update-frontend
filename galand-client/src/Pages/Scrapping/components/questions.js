export const supplyDataBasedLang = (t) => {
  const questions = [
    t("QUESTION_MAIN_TOPIC"),
    t("QUESTION_PURPOSE_TOPIC"),
    t("QUESTION_EMOTION_OPTION"),
    t("QUESTION_EMOTION_STRENGTH"),
    t("QUESTION_OVERALL_SENTIMENT"),
    t("QUESTION_SENTIMENT_TOWOARD"),
    t("QUESTION_HATE_SEVERITY"),
    t("QUESTION_HATE_FORM"),
    t("QUESTION_HATE_TARGETTING"),
    t("QUESTION_HATE_WOMAN"),
    t("QUESTION_HATE_MOTIVE"),
  ];

  const optionsObject = [
    {
      A: t("OPTION_ELECTIONS"),
      B: t("OPTION_POLITICS"),
      C: t("OPTION_SPORTS"),
      D: t("OPTION_ENTERTAINEMNT"),
      E: t("OPTION_BUSINESS"),
      F: t("OPTION_TECHNOLOGY"),
      G: t("OPTION_HEALTH"),
      H: t("OPTION_ENVIRNMENT"),
      I: t("OPTION_EDUCATION"),
      J: t("OPTION_SOCIAL_ISSUES"),
      K: t("OPTION_OTHER_SPECIFY"),
    },
    {
      A: t("OPTION_INFORMATIVE"),
      B: t("OPTION_OPINIONS"),
      C: t("OPTION_PROMOTION"),
      D: t("OPTION_ADVOCACY"),
      E: t("OPTION_OTHER_SPECIFY"),
    },
    {
      A: t("OPTION_HAPPY"),
      B: t("OPTION_SAD"),
      C: t("OPTION_ANGRY"),
      D: t("OPTION_SURPRISED"),
      E: t("OPTION_DISGUSTED"),
      F: t("OPTION_FEARFUL"),
      G: t("OPTION_OTHER_SPECIFY"),
      H: t("OPTION_NONE"),
    },
    {
      A: t("OPTION_SENTIMENT_1"),
      B: t("OPTION_SENTIMENT_2"),
      C: t("OPTION_SENTIMENT_3"),
      D: t("OPTION_SENTIMENT_4"),
      E: t("OPTION_SENTIMENT_5"),
    },
    {
      A: t("OPTION_NEGATIVE"),
      B: t("OPTION_NEUTRAL"),
      C: t("OPTION_POSITIVE"),
    },
    {
      A: t("OPTION_INDIVIDUAL"),
      B: t("OPTION_GROUP"),
      C: t("OPTION_EVENT"),
      D: t("OPTION_NOT_SPECIFIC"),
      E: t("OPTION_UNCLEAR"),
    },
    {
      A: t("OPTION_EXTREME"),
      B: t("OPTION_HIGH"),
      C: t("OPTION_MODERATE"),
      D: t("OPTION_LOW"),
      E: t("OPTION_NO_HATE"),
    },
    {
      A: t("OPTION_INSULTS"),
      B: t("OPTION_STEREOTYPES"),
      C: t("OPTION_THREAT"),
      D: t("OPTION_DICRIMINATION"),
      E: t("OPTION_HARASSMENT"),
      F: t("OPTION_NONE"),
      G: t("OPTION_OTHER_SPECIFY"),
    },
    {
      A: t("OPTION_RACE"),
      B: t("OPTION_RELIGION"),
      C: t("OPTION_SEX"),
      D: t("OPTION_DISABILITIES"),
      E: t("OPTION_REFUGEES"),
      F: t("OPTION_POLITICAL_AFFILIATION"),
      G: t("OPTION_OTHER_SPECIFY"),
    },
    {
      A: t("OPTION_PHYSICAL"),
      B: t("OPTION_VERBAL"),
      C: t("OPTION_SEXUAL_HARASSMENT"),
      D: t("OPTION_DEPICTIONS"),
      E: t("OPTION_OTHER_SPECIFY"),
      F: t("OPTION_UNCLEAR"),
    },
    {
      A: t("OPTION_POLITICAL_IDEOLOGY"),
      B: t("OPTION_PERSONAL_VENDETTA"),
      C: t("OPTION_GENDER_SEXISM"),
      D: t("OPTION_RACIAL"),
      E: t("OPTION_UNCLEAR"),
      F: t("OPTION_OTHER_SPECIFY"),
      G: t("OPTION_NO_VIOLENCE"),
    },
  ];
  const options = [
    `A. Elections
    B. Politics
    C. Sports
    D. Entertainment
    E. Business
    F. Technology
    G. Health
    H. Environment
    I. Education
    J. Social Issues
    K. Other (Specify)`,
    `A. Informative (News, Updates, etc.)
    B. Opinions/Reviews
    C. Promotion/Advertisement
    D. Advocacy (for a cause, idea, etc.)
    E. Other (Specify)`,
    `A. Happy
    B. Sad
    C. Angry
    D. Surprised
    E. Disgusted
    F. Fearful
    G. Other (Specify)
    H. None`,
    `A. 1 (Very Weak)
    B. 2 (Weak)
    C. 3 (Moderate)
    D. 4 (Strong)
    E. 5 (Very Strong)`,
    `A. Negative 
    B. Natural 
    C. Positive`,
    `A. Individual
    B. Group
    C. Event
    D. Not Specific
    E. Unclear`,
    `A. Extreme (Violent Threats/Abuse)
    B. High (Direct Slurs/Abuse)
    C. Moderate (Indirect Slurs/Offensive Stereotypes)
    D. Low (Potentially Offensive Language)
    E. None (No Hate Speech)`,
    `A. Insults/derogatory language
    B. Stereotypes
    C. Threats of violence
    D. Incitement of discrimination
    E. Incitement of harassment
    F. None
    G. Other (Specify)`,
    `A. Race/ethnicity
    B. Religion
    C. Sex or Gender
    D. People with disabilities
    E. Refuges
    F. Political affiliation
    G. Others (Specify)`,
    `A. Physical Threat
    B. Verbal Abuse
    C. Sexual Harassment
    D. Depictions of incompetence
    E. Other (Specify)
    F. Unclear`,
    `A. Political Ideology
    B. Personal Vendetta
    C. Gender Bias/Sexism
    D. Racial or Ethnic Bias
    E. Unclear 
    F. Other (Specify) 
    G.  No violence`,
  ];

  return {
    questions,
    options,
    optionsObject,
  };
};
