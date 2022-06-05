import axios from "axios"

export const getUserIp = async() => {
    const IP_API_KEY = process.env.NEXT_PUBLIC_IP_LOOKUP_API_KEY
    const userIpInfo = await axios.get(`https://extreme-ip-lookup.com/json?key=${IP_API_KEY}`)
    const {country,countryCode,city,region} = await userIpInfo.data
}