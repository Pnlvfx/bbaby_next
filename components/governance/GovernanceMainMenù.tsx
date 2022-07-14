import Link from "next/link"

const GovernanceMainMenù = () => {
  return (
        <div className={'pt-1 bg-reddit_dark-brighter rounded-md overflow-hidden shadow-lg w-[200px] border border-reddit_border text-sm'}>
            <div className="font-extrabold h-[40px] bg-reddit_dark-brightest flex">
                <p className="self-center ml-3">Authority</p>
            </div>
            <hr className="border-reddit_border" />
            <Link href={'/governance/youtube'}>
                <a>
                    <div className="font-extrabold h-[40px] hover:bg-reddit_dark-brightest flex">
                    <p className="self-center ml-3">Analytics</p>
                    </div>
                </a>
            </Link>
            <Link href={'/governance/youtube'}>
                <a>
                    <div className="font-extrabold h-[40px] hover:bg-reddit_dark-brightest flex">
                    <p className="self-center ml-3">Youtube</p>
                    </div>
                </a>
            </Link>
            <Link href={'/governance/twitter'}>
                <a>
                    <div className="font-extrabold h-[40px] hover:bg-reddit_dark-brightest flex">
                    <p className="self-center ml-3">Twitter</p>
                    </div>
                </a>
            </Link>
        </div>
  )
}

export default GovernanceMainMenù;