import axios from "axios";
import  {useContext} from 'react'
import RootCommentContext from "../comments/commentutils/RootCommentContext";
import { BiUpvote, BiDownvote } from "react-icons/bi";

const Voting = (props) => {

  const {commentsTotals, userVotes,refreshVotes} = useContext(RootCommentContext);
  const {commentId} = props;

  const total = commentsTotals && commentId in commentsTotals ? commentsTotals[commentId] : 0;
  const userVote = userVotes && commentId in userVotes ? userVotes[commentId] : 0;

  

  function sendVote(direction = 'up') {
    const directionNumber = direction === 'up' ? 1 : -1;
    if(directionNumber === userVote) {
      direction = 'unvote';
    }
    const server = process.env.NEXT_PUBLIC_SERVER_URL
    const url = server+'/vote/'+props.commentId+'/'+direction
    axios.get(url, {withCredentials:true})
      .then(() => {
        refreshVotes();
      })
  }


  function handleVoteUp() {
    sendVote('up')
  }

  function handleVoteDown() {
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
      <span className="">{total}</span>
      {arrowButton('down')}
    </div>
  )
}

export default Voting;