import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineRead } from "react-icons/ai";
import {FcVideoProjector} from 'react-icons/fc';

const MyNewsCard = (news:NewsProps) => {
    const router = useRouter();
  return (
    <div className="border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter">
        <div onClick={(e) => {
            e.preventDefault();
            router.push(`/news/${news._id}`)
        }} className="cursor-pointer">
            <div className="p-2">
                <p className="font-bold">{news.title}</p>
            </div>
            {news.mediaInfo.isImage && news.mediaInfo.image && news.mediaInfo.width && news.mediaInfo.height && (
                <Image src={news.mediaInfo.image} width={news.mediaInfo.width} height={news.mediaInfo.height} alt={news.mediaInfo.alt} />
            )}
            <div className="">
                <p className="whitespace-pre-wrap truncate">{news.description.substring(0, 250)}</p>
            </div>
            <div id="buttons" className="flex items-center rounded-sm mt-2 mr-2 text-reddit_text-darker">
                <button className="hover:bg-reddit_dark-brightest rounded-md flex p-[10px]">
                    <AiOutlineRead className="w-5 h-5" />
                    <p className="text-sm ml-1">Read More</p>
                </button>
                <Link href={`/governance/youtube`}>
                    <a onClick={(e) => {
                        e.preventDefault();
                        router.push({
                            pathname:`/governance/youtube`,
                            query: {newsId: news._id}
                        })
                    }} className="hover:bg-reddit_dark-brightest rounded-md flex p-[10px]">
                        <FcVideoProjector className="w-5 h-5" />
                        <p className="text-sm ml-1">Create video</p>
                    </a>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default MyNewsCard;
