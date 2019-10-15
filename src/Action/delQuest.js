import Axios from "axios"


export const delQuest = async (questIDs) => {
    const res = await Axios.post(`http://localhost:5000/question/delete`, {
        questIDs
    })
    if (res.status === 200) {
        return res.data
    } else {
        throw new Error("Cannot delete question", res)
    }
}
