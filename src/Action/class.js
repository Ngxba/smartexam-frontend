import axios from "axios";

export const createTest = async (classCode, title, description, listOfQuizQuest, listOfEssayQuest ,authedUser) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class/createTest`, {
        classCode, title, description, listOfQuizQuest, listOfEssayQuest, authedUser
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create test", res)
    }
}

export const getTest = async (classCode) => {
    const res = await axios.get(`https://smart-exam-25-back.herokuapp.com/class/getTest?q=${classCode}`)
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get test", res)
    }
}

export const deleteTest = async (testID) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class/deleteTest`, {
        testID})
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot delete test", res)
    }
}

export const addTakenTest = async (testID, studentEmail, studentName, quizScore, essayScore, quest) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class/addTakenTest`, {
        testID, studentEmail, studentName, quizScore, essayScore, quest})
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot add test", res)
    }
}

export const getTakenTest = async (testID) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class/getTakenTest`, {
        testID})
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get test", res)
    }
}

export const markTakenTest = async (takenTestID, quizScore, essayScore, quest) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class/markTakenTest`, {
        takenTestID, quizScore, essayScore, quest})
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get test", res)
    }
}

export const getClass = async (classCode) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class?q=${classCode}`)
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get class", res)
    }
}

export const getOwnedClass = async (roll, userEmail) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class/getownedclasses?q=${userEmail}`, {roll})
    
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get class", res)
    }
}

export const createNewClass = async (classCode, listOfGivenStudent, teacher) => {
    const listOfStudent = []
    listOfGivenStudent.map(student => listOfStudent.push(student.value))
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class/createnewclass`, {
        classCode, listOfStudent, teacher
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create class", res)
    }
}

export const addUserIntoClass = async (classCode, userEmail, roll) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/class/adduser`,{
        classCode, userEmail, roll
    })
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot add user in class", res)
    }
}