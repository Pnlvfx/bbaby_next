import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineRead } from "react-icons/ai";
import {FcVideoProjector} from 'react-icons/fc';
import { useSession } from "../auth/UserContext";

interface MyNewsCardProps {
    news: NewsProps
    isListing?: boolean
}

const MyNewsCard = ({news, isListing}: MyNewsCardProps) => {
    const router = useRouter();
    const {session} = useSession();
    let width = 1920;
    let height = 1080;

    if (news.mediaInfo.width && news.mediaInfo.height) {
        width = news.mediaInfo.width >= 1920 ? 1920 : news.mediaInfo.width;
        height = news.mediaInfo.height >= 1080 ? 1080 : news.mediaInfo.height
    }

  return (
    <div className="border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter flex justify-center">
        <div onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            isListing ? router.push(`/news/${news._id}`) : null
        }} className={`${isListing && "cursor-pointer"} p-2`}>
            <p className="font-bold mb-2">{news.title}</p>
            {news.mediaInfo.isImage && news.mediaInfo.image && news.mediaInfo.width && news.mediaInfo.height && (
                <div className="max-h-[510px] overflow-hidden">
                    <Image src={news.mediaInfo.image} width={width} height={height} alt={news.mediaInfo.alt} objectFit='contain' />
                </div>
            )}
            <p className="whitespace-pre-wrap truncate mt-2">{isListing ? news.description.substring(0, 250) : news.description}...</p>
            <div id="buttons" className="flex items-center rounded-sm mt-2 mr-2 text-reddit_text-darker">
                <button disabled={!isListing} className="hover:bg-reddit_dark-brightest rounded-md flex p-[10px]">
                    <AiOutlineRead className="w-5 h-5" />
                    <p className="text-sm ml-1">News</p>
                </button>
                {session && session?.user.role === 1 && (
                    <>
                    <Link href={`/governance/youtube`}>
                        <a onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push({
                                pathname:`/governance/youtube`,
                                query: {newsId: news._id}
                            })
                        }} className="hover:bg-reddit_dark-brightest rounded-md flex p-[10px]">
                            <FcVideoProjector className="w-5 h-5" />
                            <p className="text-sm ml-1">Create video</p>
                        </a>
                    </Link>
                    <button className="hover:bg-reddit_dark-brightest rounded-md flex p-[10px]">
                        <AiOutlineRead className="w-5 h-5" />
                        <p className="text-sm ml-1">Edit News</p>
                    </button>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default MyNewsCard;
