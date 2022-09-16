import axios from "axios"
import { useContext, useState } from "react"
import { BiDownvote, BiUpvote } from "react-icons/bi"
import {AuthModalContext, AuthModalContextProps} from "../auth/modal/AuthModalContext"

type Voting = {
  ups: number,
  postId: string,
  liked: boolean | null,
}

const Voting = ({ups, postId, liked}: Voting) => {
    let dir = 0  //vote
    const [upVote,setUpVote] = useState(ups)
    const {setShow} = useContext(AuthModalContext) as AuthModalContextProps;
    const [voted,setVoted] = useState(liked)   //true false or null

    const refreshVote = async () => {
      try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL;
        const url = `${server}/posts/${postId}/vote`;
        const body = JSON.stringify({ dir })
        const res = await axios({
          method: 'POST',
          url,
          data: {dir},
          withCredentials: true
        });
        if(dir === 1) {
          if(voted === true) {
            setVoted(null)  //if user have already voted
          } else {
            setVoted(true) //vote normall
          }
        } else {
          if(voted === false) {
            setVoted(null)
          } else {
            setVoted(false)
          }
        }
        setUpVote(res.data.vote)
      } catch (err:any) {
        if(err.response.status === 401 || 400) {
          setShow('login');
      }
      }
    }

    const handleVoteUp = () => {
      dir = 1
      refreshVote()
    }

    const handleVoteDown = () => {
      dir = -1
      refreshVote()
    }

  return (
      <>
        <button aria-label="upvote" className="h-6 w-6" onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          handleVoteUp()
        }}>
          <BiUpvote className={`w-6 h-6 text-reddit_text-darker hover:text-blue-600 text-center && ${voted === true && "text-blue-600"}`}/>
        </button>
          <div className="text-[12px] leading-[15px] mx-[1px] w-8 text-center font-bold pointer-events-none">
            {upVote ? upVote : 0}
          </div>
        <button aria-label="downvote" className="h-6 w-6" onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          handleVoteDown()
        }}>
          <BiDownvote className={`w-6 h-6 text-reddit_text-darker hover:text-reddit_orange && ${voted === false && "text-reddit_orange"}`}/>
        </button>   
      </>    
  )
}

export default Voting;
