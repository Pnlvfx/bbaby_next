import axios from "axios";

const server = process.env.NEXT_PUBLIC_SERVER_URL;

export const getCategories = async () => {
    try {
      const res = await axios.get(`${server}/categories`, {withCredentials:true})
      return res.data
    } catch (error) {
      console.log(error)
    }
  }