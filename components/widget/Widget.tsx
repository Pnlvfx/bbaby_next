import CommunitiesInfo from "./CommunitiesInfo";
import TopCommunities from "./TopCommunities";

type WidgetProps = {
    community?: string
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
