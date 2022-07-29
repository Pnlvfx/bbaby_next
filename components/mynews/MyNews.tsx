import axios from "axios";
import { useEffect, useState } from "react";
import BestPost from "../post/postutils/BestPost";
import PostForm from "../submit/submitutils/PostForm";
import MyNewsCard from "./MyNewsCard";

const MyNews = () => {
  const [news,setNews] = useState<NewsProps[] | []>([]);


  const getNews = async () => {
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const res = await axios.get(`${server}/news`, {withCredentials: true});
    setNews(res.data);
  }


  useEffect(() => {
    getNews()
  },[]);

  return (
    <div className="flex justify-center pt-5 mx-[2px] lg:mx-[10px]">
      <div className="w-full lg:w-7/12 xl:w-5/12 2xl:w-[650px] lg:mr-4 flex-none">
        <div className='pb-[18px]'>
            <PostForm />
        </div>
        <div className="mb-4">
          <BestPost />
        </div>
        {news.map((n) => (
          <MyNewsCard key={n._id} {...n} />
        ))}
      </div>
    </div>
  )
}

export default MyNews;
