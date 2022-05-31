import Submit from "./Submit";
import TempSubmitWid from '../widget/TempSubmitWid'

function PostFormModal(props) {

  const {communityName} = props

  
  return (
      <div className="bg-reddit_dark">
        <div className=" p-2 sm:p-4 block lg:flex self-center">
          <div className="self-center mx-auto flex">
        <div className="pr-0 md:pr-3 w-full lg:w-[800px]">
          <Submit community={communityName} />
        </div>
        <div className="hidden lg:block pt-11 pr-3">
            <TempSubmitWid />
            <div className=" text-gray-700 text-sm w-72">
              Please be mindful of bbabystyle's content policy
            </div>
        </div>
        </div>
        </div>
      </div>
  )
}

export default PostFormModal;