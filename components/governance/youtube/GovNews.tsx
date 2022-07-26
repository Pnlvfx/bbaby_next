import axios from 'axios'
import React, { useEffect, useState } from 'react'

const GovNews = () => {
    const [news,setNews] = useState([]);
  const getNews = async () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    try {
      const res = await axios.get(`${server}/governance/news`, {
        withCredentials: true,
      })
      setNews(res.data.articles)
      console.log(news)
    } catch (error) {}
  }

  useEffect(() => {
      getNews()
  }, [])

  return (
    <div className='flex justify-center pt-5 mx-[2px] lg:mx-10'>
      <div className='w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] lg:mr-4 flex-none'>
          {news.map((n,index) => (
              <div key={index} className='border border-reddit_border rounded-md'>
              <div className="flex max-h-[800px] overflow-hidden rounded-md bg-reddit_dark-brighter">
                  <div className='w-full p-2'>
                     <p>{n.title}</p>
                  </div>
                  <div>
                    <img src={n.urlToImage} style={{}} />
                </div>
              </div>
              </div>
          ))}
      </div>
    </div>
    )
}

export default GovNews;

