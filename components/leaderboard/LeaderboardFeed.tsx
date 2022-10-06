import Link from "next/link";
import { RiArrowUpSLine } from "react-icons/ri";

interface LeaderFeedProps {
  communities: CommunityProps[]
}

const LeaderboardFeed = ({ communities }: LeaderFeedProps) => {
  return (
    <div className="flex flex-grow w-full max-w-[740px] md:w-[640px]">
      <div className="border border-reddit_border w-full">
        <div className="flex items-center bg-reddit_dark-brightest h-10 justify-between px-4 sticky top-12 z-[3]">
          <span className="text-[16px] leading-5 font-bold">Today&apos;s Top Growing Communities</span>
          <span className="text-reddit_text-darker font-bold text-[14px] leading-[18px]">Rank Change</span>
        </div>
        <ol className="bg-reddit_dark-brighter">
          {communities.map((community, index) => (
            <li key={community._id} className="border-b border-reddit_border relative">
              <Link href={`/b/${community.name.toLowerCase()}`}>
                <a target={'_blank'} className="px-6 h-16 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-right min-w-5 text-[14px] leading-[18px]">{index +1 }</span>
                    <RiArrowUpSLine className='w-5 h-5 text-green-500 ml-2 align-middle leading-5' />
                    <picture>
                      <img
                        role={'presentation'}
                        src={community.communityAvatar}
                        alt="Community Icon"
                        className="bg-[rgb(108,163,196)] bg-no-repeat rounded-[24px] leading-10 ml-2 mr-1 text-[40px] box-border flex-none mx-2"
                        width={40}
                        height={40}
                        style={{
                          backgroundPosition: '50%',
                          backgroundSize: '100%',
                        }}
                      />
                    </picture>
                    <span className="font-bold text-[16px] inline-block leading-">b/{community.name}</span>
                  </div>
                  <span>{community.subscribers}</span>
                </a>
              </Link>
              <div className="absolute right-20 top-[20.5px]">
                <button 
                  role={'button'} 
                  tabIndex={0} 
                  className='relative bg-white font-bold text-[12px] leading-4 min-h-[24px] min-w-[24px] py-1 px-4 items-center rounded-full box-border flex text-center w-auto' 
                >
                  <span className="text-black">Join</span>
                </button>
              </div>
          </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default LeaderboardFeed;
