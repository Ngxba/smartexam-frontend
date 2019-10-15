import axios from "axios";

export const getUser = async (userEmail, roll) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/auth/getuser`, {
        userEmail, roll
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create test", res)
    }
}

export const getAllUserWithRoll = async (roll) => {
    const res = await axios.post(`https://smart-exam-25-back.herokuapp.com/auth/getalluserwithroll`, {
        roll
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create test", res)
    }
}

