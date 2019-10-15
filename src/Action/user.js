import axios from "axios";

export const getUser = async (userEmail, roll) => {
    const res = await axios.post(`http://localhost:5000/auth/getuser`, {
        userEmail, roll
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create test", res)
    }
}

export const getAllUserWithRoll = async (roll) => {
    const res = await axios.post(`http://localhost:5000/auth/getalluserwithroll`, {
        roll
    });
    if(res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot create test", res)
    }
}

