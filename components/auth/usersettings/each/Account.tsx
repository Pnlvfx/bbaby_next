import Button from "../../../utils/Button";

function Account() {
  return (
      <>
      <div className="px-5 font-semibold">
      <h1 className='py-4 text-[19px]'>Account settings</h1>
      <h2 className="text-reddit_text-darker text-[11px] mb-2">ACCOUNT PREFERENCES</h2>
      <hr className='p-2 mx-2 border-reddit_border w-1/2'/>
      <div id="Change_email_address" className="flex mt-5">
        <h1 className="">Email address</h1>
        <div className="ml-[550px]">
          <Button outline='true' className='py-1 px-[18px]'>Change</Button>
        </div>
      </div>
      </div>
      </>
  )
}

export default Account;