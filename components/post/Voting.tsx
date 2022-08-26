import axios from "axios"
import { useContext, useState } from "react"
import { BiDownvote, BiUpvote } from "react-icons/bi"
import {AuthModalContext, AuthModalContextProps} from "../auth/modal/AuthModalContext"

type Voting = {
  ups: number,
  postId: string,
  liked: string,
}

const Voting = ({ups,postId,liked}:Voting) => {
    let dir = 0  //vote
    const [upVote,setUpVote] = useState(ups)
    const {setShow} = useContext(AuthModalContext) as AuthModalContextProps;
    const [voted,setVoted] = useState(liked)   //true false or null

    const refreshVote = async () => {
      try {
        const server = process.env.NEXT_PUBLIC_SERVER_URL
        const res = await axios.post(`${server}/posts/${postId}/vote`,{dir}, {withCredentials:true})
        if(dir === 1) {
          if(voted === 'true') {
            setVoted('null')  //if user have already voted
          } else {
            setVoted('true') //vote normall
          }
        } else {
          if(voted === 'false') {
            setVoted('null')
          } else {
            setVoted('false')
          }
        }
        setUpVote(res.data.vote)
      } catch (err:any) {
        if(err.response.status === 401) {
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
      <div className="mt-2 text-center">
        <div className="cursor-pointer" onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          handleVoteUp()
        }}>
          <BiUpvote className={`w-6 h-6 text-reddit_text-darker hover:text-blue-600 text-center mx-auto && ${voted === "true" && "text-blue-600"}`}/>
        </div>
          <span className="text-sm">{upVote ? upVote : 0}</span>
        <div className="cursor-pointer" onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          handleVoteDown()
        }}>
          <BiDownvote className={`w-6 h-6 text-reddit_text-darker hover:text-reddit_orange mx-auto && ${voted === "false" && "text-reddit_orange"}`}/>
        </div>   
      </div>    
  )
}

export default Voting;
