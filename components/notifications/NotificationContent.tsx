import Link from 'next/link'

const NotificationContent = () => {
  return (
    <div className="relative">
      <li className="list-none">
        <Link href={''} className="flex p-4" rel="noopener noreferrer">
          <span className="relative pr-2"></span>
          <span className="flex-1">
            <span className="">
              <span>
                <span>notification-beta</span>
                <span>·</span>
                <span>30h</span>
              </span>
            </span>
            <span></span>
          </span>
        </Link>
      </li>
    </div>
  )
}

export default NotificationContent
