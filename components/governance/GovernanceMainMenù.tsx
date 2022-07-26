import Link from "next/link"
import { useRouter } from "next/router"

const GovernanceMainMenù = () => {
    const menu = [
        {title:"Analytics", url: "/governance/analytics"},
        {title:"Youtube", url: "/governance/youtube"},
        {title:"Twitter", url: "/governance/twitter"}
    ]
    const isMobile = "hidden lg:block"
    const router = useRouter()
    const active = router.pathname.match('analytics') ? 0 : router.pathname.match('youtube') ? 1 : router.pathname.match('youtube') ? 2 : 0
  return (
        <div className={'bg-reddit_dark-brighter rounded-md overflow-hidden border border-reddit_border text-sm mb-3'}>
            <div className="w-full flex items-center justify-center">
            {menu.map((m, index) => (
                <Link key={index} href={m.url} shallow={true} >
                <a className={`${index === active ? "font-extrabold" : ""}`}>
                    <p className={`mx-3 py-3`}>{m.title}</p>
                </a>
                </Link>
            ))}
            </div>
        </div>
  )
}

export default GovernanceMainMenù;