import Link from 'next/link';
import { useRouter } from 'next/router';
import { COLORS } from '../main/config';

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
    <div style={{
      marginBottom: 12,
      overflow: 'hidden',
      borderRadius: 6,
      borderWidth: 1,
      borderColor: COLORS.border,
      backgroundColor: COLORS.brighter,
      fontSize: 14,
    }}
    >
      <div style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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

