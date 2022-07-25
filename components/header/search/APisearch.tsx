import axios from "axios"

const server = process.env.NEXT_PUBLIC_SERVER_URL

export const search = async (text:string | string[] | undefined) => {
    try {
        const res = await axios.get(`${server}/search/?phrase=${text}`, {withCredentials:true})
        return res.data
    } catch (error) {
        
    }
}

export const searchTrend = async () => {
    try {
        const res = await axios.get(`${server}/search/today-trend`, {withCredentials:true})
        return res.data
    } catch (error) {
        
    }
}