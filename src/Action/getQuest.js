import axios from "axios";

export const getQuiz = async () => {
  const res = await axios.get(`http://localhost:5000/question`);
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot get question", res);
  }
};

export const getRandomQuiz = async number => {
  const res = await axios.get(`http://localhost:5000/question`);
  if (res.status === 200) {
    let chooseArr = [];
    let chooseQuestion = []
    while (chooseArr.length < number) {
      let random = Math.floor(Math.random() * res.data.length);
      if (!(chooseArr.indexOf(random) >= 0)) {
        chooseArr.push(random);
      }
    }
    chooseArr.map(index => {
        return chooseQuestion = [...chooseQuestion,res.data[index]]
    })
    return chooseQuestion;
  } else {
    throw new Error("Cannot get question", res);
  }
};

export const getListQuest = async (listOfQuizQuest, listOfEssayQuest) => {
  const res = await axios.post(`http://localhost:5000/question/getlistquest`, {
    listOfQuizQuest, listOfEssayQuest});
  if (res.status === 200) {
    return res.data;
  } else {
    throw new Error("Cannot get question", res);
  }
};