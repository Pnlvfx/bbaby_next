import { useContext, useEffect, useState } from 'react'
import { TimeMsgContext, TimeMsgContextProps } from '../../main/TimeMsgContext'
import LinkPreview from '../../utils/link-preview/LinkPreview'
import LinkPreviewLoader from '../../utils/link-preview/LinkPreviewLoader'

const GovNewsFeed = () => {
  const [urls, setUrls] = useState<string[] | []>([])
  const {setMessage} = useContext(TimeMsgContext) as TimeMsgContextProps;
  
  const getLinks = async () => {
    try {
      const server = process.env.NEXT_PUBLIC_SERVER_URL;
      const url = `${server}/governance/BBCnews`
      const res = await fetch(url, {
      method: 'get',
      credentials: 'include'
      })
      if (res.ok) {
        const newsss = await res.json()
        setUrls(newsss)
      } else {
        const error = await res.json();
        setMessage({value: error.msg, status: 'error', time: 40000})
      }
    } catch (err) {
      
    }
  }

  useEffect(() => {
    getLinks()
  }, [])

  return (
    <div className="mt-5">
      <ul className="md:space-x-auto grid w-full grid-cols-1 md:grid-cols-3">
        {urls.length >= 1
          ? urls.map((url, key) => (
            <div key={key}>
                <LinkPreview url={url} index={key} />
            </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
              (_, idx) => (
                <LinkPreviewLoader key={idx} />
              )
            )}
      </ul>
    </div>
  )
}

export default GovNewsFeed;

