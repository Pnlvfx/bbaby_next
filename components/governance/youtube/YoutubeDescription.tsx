import { useContext, useEffect, useState } from "react";
import { YoutubeContext, YoutubeContextProps } from "./YoutubeContext";

type YoutubeDescriptionProps = {
  description: string
}

const YoutubeDescription = ({ description }:YoutubeDescriptionProps) => {
    const [selected,setSelected] = useState(false)
    const [tooLong,isTooLong] = useState(false)
    const {descriptionArrayToSend} = useContext(YoutubeContext) as YoutubeContextProps;

    const select = () => {
      if (tooLong) return;
      if (selected) {
        setSelected(false);
        descriptionArrayToSend.splice(descriptionArrayToSend.indexOf(description), 1);
      } else {
        setSelected(true);
        descriptionArrayToSend.push(description);
      }
    }
    
    useEffect(() => {
      if (description.length >= 300) {
        isTooLong(true);
      }
    },[description])
    
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        select();
      }}
      className={`mb-3 border ${selected ? "border-reddit_blue" : tooLong ? 'border-red-900' : "border-reddit_border"}`}
    >
      <p>{description}</p>
    </button>
  )
}

export default YoutubeDescription;

