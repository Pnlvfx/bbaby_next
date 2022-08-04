import LeaderboardFeed from './LeaderboardFeed'
import LeaderboardMenu from './LeaderboardMenu'

const Leaderboard = () => {
  return (
    <div>
      <div className="flex h-24 w-full items-center bg-reddit_dark-brighter">
        <div className="mx-auto w-[70%]">
          <h1 className="text-2xl font-bold ">
            Today&apos;s Top Growing Communities
          </h1>
          <h2 className="text-xs text-reddit_text-darker">
            Browse bbaby&apos;s top growing communities. Find the top
            communities in your favorite category.
          </h2>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <LeaderboardMenu />
        <LeaderboardFeed />
      </div>
    </div>
  )
}

export default Leaderboard
