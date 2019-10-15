import Axios from "axios"


export const delQuest = async (questIDs) => {
    const res = await Axios.post(`https://smart-exam-25-back.herokuapp.com/question/delete`, {
        questIDs
    })
    if (res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot delete question", res)
    }
}
