import axios from "axios";

export const addQuiz = async (
  type,
  model,
  QuizQuestionContent,
  Answers,
  rightAnswer
) => {
  const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/question`, {
    type,
    model,
    QuizQuestionContent,
    Answers,
    rightAnswer
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot push quiz question", res);
  }
};

export const addEssayQuest = async (
  type,
  model,
  essayQuestionContent,
  modelEssayQuestionAnswer
) => {
  const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/question`, {
    type,
    model,
    essayQuestionContent,
    modelEssayQuestionAnswer
  });
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot push essay question", res);
  }
};
