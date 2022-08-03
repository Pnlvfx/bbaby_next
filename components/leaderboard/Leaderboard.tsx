import LeaderboardMenu from "./LeaderboardMenu"

const Leaderboard = () => {
  return (
    <div>
      <div className="w-full h-24 flex items-center bg-reddit_dark-brighter">
        <div className="w-[70%] mx-auto">
          <h1 className="text-2xl font-bold ">Today&apos;s Top Growing Communities</h1>
          <h2 className="text-xs text-reddit_text-darker">Browse bbaby&apos;s top growing communities. Find the top communities in your favorite category.</h2>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <LeaderboardMenu />
      </div>
    </div>
  )
}

export default Leaderboard;