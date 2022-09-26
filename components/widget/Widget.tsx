import CommunitiesInfo from "./CommunitiesInfo";
import Donations from "./Donations";
import TopCommunities from "./TopCommunities";

type WidgetProps = {
    community?: boolean
}

const Widget = ({ community }: WidgetProps) => {
  return (
    <div className="mb-5 box-content w-[312px] rounded-md border border-reddit_border bg-reddit_dark-brighter overflow-hidden">
        <div className="flex flex-col h-full">
            {community 
            ? <CommunitiesInfo /> 
            : <TopCommunities />
            }
        </div>
    </div>
  )
}

export default Widget;
