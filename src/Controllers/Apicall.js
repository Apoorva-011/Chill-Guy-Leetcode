import axios from "axios"

export const Apicall=async (username)=> {
    try {
        const response=await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
        return response;
    } catch (error) {
        console.log(error);
    }{

    }
}
