import axios from "axios"

export const translate = async (text:string,language:string) => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const data = { text }
    const res = await axios.post(
      `${server}/governance/translate-tweet?lang=${language}`,
      data
    )
   return res.data;
  }