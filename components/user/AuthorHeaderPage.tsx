import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from './user-page.module.css'

const AuthorHeaderPage = () => {
  const [active, setActive] = useState(0)
  const input = ['OVERVIEW', 'POSTS', 'COMMENTS']
  const router = useRouter()

  return (
    <div className={styles.userHeader}>
      <div className={styles.userHeader2}>
        <div className={`${styles.userHeader3} ${styles.userHeader3_1}`}>
          <div className={styles.userHeader4}>
            {input.map((i, index) => (
              <Link
                onClick={(e) => {
                  e.preventDefault()
                  if (active === index) return
                  setActive(index)
                  router.push(router.asPath)
                }}
                className={`${styles.userHeaderLinks} ${active === index && styles.userHeaderLinksActive}`}
                key={index}
                href={router.asPath}
              >
                {i}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorHeaderPage
