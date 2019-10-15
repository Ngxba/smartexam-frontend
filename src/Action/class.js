import axios from "axios";

export const createTest = async (classCode, title, description, listOfQuizQuest, listOfEssayQuest ,authedUser) => {
    const res = await axios.post(`http://localhost:5000/class/createTest`, {
        classCode, title, description, listOfQuizQuest, listOfEssayQuest, authedUser
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create test", res)
    }
}

export const getTest = async (classCode) => {
    const res = await axios.get(`http://localhost:5000/class/getTest?q=${classCode}`)
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get test", res)
    }
}

export const deleteTest = async (testID) => {
    const res = await axios.post(`http://localhost:5000/class/deleteTest`, {
        testID})
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot delete test", res)
    }
}

export const addTakenTest = async (testID, studentEmail, studentName, quizScore, essayScore, quest) => {
    const res = await axios.post(`http://localhost:5000/class/addTakenTest`, {
        testID, studentEmail, studentName, quizScore, essayScore, quest})
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot add test", res)
    }
}

export const getTakenTest = async (testID) => {
    const res = await axios.post(`http://localhost:5000/class/getTakenTest`, {
        testID})
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get test", res)
    }
}

export const markTakenTest = async (takenTestID, quizScore, essayScore, quest) => {
    const res = await axios.post(`http://localhost:5000/class/markTakenTest`, {
        takenTestID, quizScore, essayScore, quest})
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get test", res)
    }
}

export const getClass = async (classCode) => {
    const res = await axios.post(`http://localhost:5000/class?q=${classCode}`)
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get class", res)
    }
}

export const getOwnedClass = async (roll, userEmail) => {
    const res = await axios.post(`http://localhost:5000/class/getownedclasses?q=${userEmail}`, {roll})
    
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot get class", res)
    }
}

export const createNewClass = async (classCode, listOfGivenStudent, teacher) => {
    const listOfStudent = []
    listOfGivenStudent.map(student => listOfStudent.push(student.value))
    const res = await axios.post(`http://localhost:5000/class/createnewclass`, {
        classCode, listOfStudent, teacher
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create class", res)
    }
}

export const addUserIntoClass = async (classCode, userEmail, roll) => {
    const res = await axios.post(`http://localhost:5000/class/adduser`,{
        classCode, userEmail, roll
    })
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot add user in class", res)
    }
}