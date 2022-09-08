import { COLORS } from "../../main/config";
import YoutubeLogin from "../youtube/YoutubeLogin";

const Homepage = () => {
  return (
    <div style={{width: '100%', backgroundColor: COLORS.brighter}}>
      <div>
        <div>
          <YoutubeLogin />
        </div>
      </div>
    </div>
  )
}

export default Homepage;