import { useContext } from "react";
import { CommunityContext } from "../community/CommunityContext";

function BoardHeader(props) {

    const {communityAvatar,cover,name} = useContext(CommunityContext);

    const {community} = props

    return(
<>
    <div className="h-48 bg-cover no-repeat" 
    style={{backgroundImage: `url("${cover}")`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'rgb(0,108,189)',
            backgroundPosition: '50%',

        
        }}>
    </div>
        <div className='bg-reddit_dark-brighter self-center mx-auto'>
            <div className='mx-5 flex'>
                <div className='rounded-full overflow-hidden border-4 relative -top-4 border-white bg-reddit_blue ml-0 lg:ml-40'>
                   <img src={communityAvatar} className='h-16 w-16 rounded-full flex-none' />
                </div>
                    <div className='pt-2 pl-4'>
                        <h1 className='text-2xl font-bold mx-auto'>{community}</h1>
                            <h5 className='text-reddit_text-darker text-sm mt-1'>b/{community}</h5>
                    </div>
            </div>
        </div>
</>
    );
}

export default BoardHeader;