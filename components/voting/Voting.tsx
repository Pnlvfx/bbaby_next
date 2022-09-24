import axios from "axios";
import { useState } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useCommentContext } from "../comments/commentutils/RootCommentContext";

interface CommentVoting {
  comment: CommentProps
}

const Voting = ({ comment }: CommentVoting) => {
  const { comments, getComments } = useCommentContext();
  const [upVote, setUpVote] = useState(comment?.ups ? comment.ups : 0);
  const userVote = null // to change

  function sendVote(direction = 'up') {
    const directionNumber = direction === 'up' ? 1 : -1;
    if(directionNumber === userVote) {
      direction = 'unvote';
    }
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const url = server+'/vote/'+ comment._id + '/'+ direction
    axios.get(url, {withCredentials:true})
      .then(() => {
        //refreshVotes();
      })
  }


  const handleVoteUp = () => {
    sendVote('up')
  }

  const handleVoteDown = () => {
    sendVote('down')
  }

  function arrowButton(directionName = 'up') {
    const directionNumber = directionName === 'up' ? 1 : -1;
    let classNames = ' block'


    if (directionNumber === userVote) {
      classNames += ' text-reddit_red ';
    } else {
      classNames+= ' text-reddit_text-darker hover:bg-gray-600 '
    }

    
    
      if(directionName === 'up') {
        return (
          <button onClick={() => handleVoteUp()} className={classNames}>
            <BiUpvote className="w-6" />
          </button>
        );
      } else {
        return (
          <button onClick={() => handleVoteDown()} className={classNames}>
            <BiDownvote className="w-6"/>
          </button>
      )
    }
  }
  

  return (
    <div className="flex p-2 pl-0">
      {arrowButton('up')}
      <span className="">{upVote}</span>
      {arrowButton('down')}
    </div>
  )
}

export default Voting;