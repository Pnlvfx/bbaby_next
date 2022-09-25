import Link from 'next/link';
import { useRouter } from 'next/router';

const GovernanceMainMenù = () => {
  const menu = [
    { title: 'Bbaby', url: '/governance/bbaby' },
    { title: 'Twitter', url: '/governance/twitter' },
    { title: 'BBCNews', url: '/governance/news' },
    { title: 'Reddit', url: '/governance/reddit' },
  ]
  const router = useRouter()
  const active = router.pathname.match('bbaby')
    ? 0
    : router.pathname.match('twitter')
    ? 1
    : router.pathname.match('news')
    ? 2
    : router.pathname.match('reddit')
    ? 3
    : 0
  return (
    <div className='mb-3 overflow-hidden rounded-[6px] bg-reddit_dark-brighter border border-reddit_border text-[14px]'>
      <div className='flex w-full items-center justify-center' >
        {menu.map((m, index) => (
          <Link key={index} href={m.url} shallow={true}>
            <a className={`text-reddit_text-darker ${index === active ? 'font-extrabold text-reddit_text' : ''}`}>
              <p className={`mx-3 py-3`}>{m.title}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GovernanceMainMenù;

