import { useState } from "react";
import { catchErrorWithMessage } from "../../API/common";
import { BBCbot, getBBCLinks } from "../../API/governance/governanceNewsAPI";
import { useMessage } from "../../main/TimeMsgContext";
import { buttonClass, Spinner } from "../../utils/Button";
import YoutubeLogin from "../youtube/YoutubeLogin";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const message = useMessage();

  const getBBCNews = async () => {
    try {
      setLoading(true);
      const res = await BBCbot();
      setLoading(false);
    } catch (err) {
      catchErrorWithMessage(err, message);
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-reddit_dark-brighter min-h-[100vh] max-w-[780px] mx-auto">
      <div>
        <div className="w-full grid grid-col-1 items-center justify-center">
          <YoutubeLogin />
          <div className="mt-4">
            <button 
              className={`${buttonClass(true)} h-7 w-40`}
              onClick={() => {
                getBBCNews();
              }}
            >
              {loading ? <Spinner /> : 'Get BBC news'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage;