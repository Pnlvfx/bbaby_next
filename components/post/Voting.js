import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { BiDownvote, BiUpvote } from "react-icons/bi"
import AuthModalContext from "../auth/AuthModalContext"


const Voting = (props) => {
    const {ups,postId,liked} = props

    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const [dir,setDir] = useState('0')  //vote
    const [upVote,setUpVote] = useState(ups)
    const modalContext = useContext(AuthModalContext);
    const [voted,setVoted] = useState(liked)   //true false or null

    const refreshVote = async() => {
      try {
        if(dir === '0') return

        const res = await axios.post(`${server}/posts/${postId}/vote`,{dir}, {withCredentials:true})
        if(dir === '1') {
          if(voted === 'true') {
            setVoted('null')  //if user have already voted
          } else {
            setVoted('true') //vote normally
          }
          setUpVote(res.data.vote)
          setDir('0')
        } else {
          if(voted === 'false') {
            setVoted('null')
          } else {
            setVoted('false')
          }
          setDir('0')
          setUpVote(res.data.vote)
        }
      } catch (err) {
        if(err.response.status === 401) {
          modalContext.setShow('login');
          setDir('0')
      }
      }
    }


    const handleVoteUp = async() => {
      setDir('1')
    }

    const handleVoteDown = async() => {
      setDir('-1')
    }

     useEffect(() => {
       refreshVote()
     }, [dir])

  return (
      <div className="pt-2 text-center">
        <div className="cursor-pointer" value={'voteUp'} onClick={event => {
          event.preventDefault()
          handleVoteUp()
        }}>
          <BiUpvote className={`w-6 h-6 text-reddit_text-darker hover:text-blue-600 text-center mx-auto && ${voted === "true" && "text-blue-600"}`}/>
        </div>
          <span className="text-sm">{upVote}</span>
        <div className="cursor-pointer" value='voteDown' onClick={event => {
          event.preventDefault()
          handleVoteDown()
        }}>
          <BiDownvote className={`w-6 h-6 text-reddit_text-darker hover:text-reddit_orange mx-auto && ${voted === "false" && "text-reddit_orange"}`}/>
        </div>   
      </div>    
  )
}

export default Voting;
