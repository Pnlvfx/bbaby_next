import Link from "next/link";
import Router from "next/router";
import { AiOutlineRead } from "react-icons/ai";
import {FcVideoProjector} from 'react-icons/fc';
import { useSession } from "../auth/UserContext";

interface MyNewsCardProps {
    news: NewsProps
    isListing?: boolean
}

const MyNewsCard = ({news, isListing}: MyNewsCardProps) => {
    const {session} = useSession();

    const openNews = () => {
        Router.push(news.permalink)
    }

  return (
    <div className="border border-reddit_border rounded-md mb-3 bg-reddit_dark-brighter flex justify-center">
        <div
            className={`${isListing && "cursor-pointer"} p-2`}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                isListing ? openNews() : null
            }}
        >
            <p className="font-bold mb-2 text-center">{news.title}</p>
            {news.mediaInfo.isImage && news.mediaInfo.image && news.mediaInfo.width && news.mediaInfo.height && news.mediaInfo.alt && (
                <picture className="max-h-[510px] overflow-hidden">
                    <img
                        src={news.mediaInfo.image} 
                        width={news.mediaInfo.width} 
                        height={news.mediaInfo.height} 
                        alt={news.mediaInfo.alt}
                    />
                </picture>
            )}
            <p className="whitespace-pre-wrap truncate mt-2">{isListing ? news.description.substring(0, 250) + '...' : news.description}</p>
            <div id="buttons" className="flex items-center rounded-sm mt-2 mr-2 text-reddit_text-darker">
                {isListing ? (
                    <Link 
                        href={news.permalink}
                        type="button"
                        className="hover:bg-reddit_dark-brightest rounded-md flex p-[10px]"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openNews();
                        }}
                    >
                        <AiOutlineRead className="w-5 h-5" />
                        <p className="text-sm ml-1">News</p>
                    </Link>
                ) : (
                    <div className="hover:bg-reddit_dark-brightest rounded-md flex p-[10px]">
                        <AiOutlineRead className="w-5 h-5" />
                        <p className="text-sm ml-1">News</p>
                    </div>
                )}
                {session?.user?.role === 1 && (
                    <>
                    <Link 
                        href={`/governance/youtube?title=${news.title}`}
                        className="hover:bg-reddit_dark-brightest rounded-md flex p-[10px]"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            Router.push({
                                pathname:`/governance/youtube`,
                                query: {title: news.title}
                            })
                        }}
                    >
                        <FcVideoProjector className="w-5 h-5" />
                        <p className="text-sm ml-1">Create video</p>
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
