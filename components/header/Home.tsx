import { HiChevronDown } from 'react-icons/hi'
import { HomeIcon } from '../utils/SVG'

const Home = () => {
  return (
    <div id="home_button" className=" hidden w-[255px] lg:block">
      <button className="h-[42px] w-full self-center rounded-md border-reddit_border hover:border items-center">
        <div className="ml-1 flex self-center">
          <HomeIcon />
          <h1 className="self-center pl-2 text-sm font-bold">Home</h1>
          <HiChevronDown className=" ml-auto mr-2 h-[23px] w-[23px]" />
        </div>
      </button>
    </div>
  )
}

export default Home;

