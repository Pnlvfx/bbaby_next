import { useContext, useState } from "react";
import { YoutubeContext, YoutubeContextProps } from "./YoutubeContext";

type YoutubeDescriptionProps = {
  description: string
}

const YoutubeDescription = ({ description }:YoutubeDescriptionProps) => {
    const [selected,setSelected] = useState(false)
    const {descriptionArrayToSend} = useContext(YoutubeContext) as YoutubeContextProps;

    console.log(descriptionArrayToSend);

    const select = () => {
      if (selected) {
        setSelected(false);
        descriptionArrayToSend.splice(descriptionArrayToSend.indexOf(description),1);
      } else {
        setSelected(true);
        descriptionArrayToSend.push(description);
      }
    }
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        select();
      }}
      className={`mb-3 border ${selected ? "border-reddit_blue" : "border-reddit_border"}`}
    >
      <p>{description}</p>
    </button>
  )
}

export default YoutubeDescription;

