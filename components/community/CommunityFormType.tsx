import { ReactNode } from "react";
import { Checkbox, CheckboxChecked } from "../utils/SVG";

type CommunityType = {
    icon: ReactNode
    checked: boolean
    text: {
        title: string
        body: string
    }
}

const CommunityFormType = ({icon, checked, text}: CommunityType) => {
  return (
    <div className="items-start mb-4 flex " aria-checked={checked} role={'radio'} tabIndex={0}>
        {checked ? (
        <CheckboxChecked role={'presentation'} className='h-4 w-4 mr-[6px]' />
        ) : (
        <Checkbox role={'presentation'} className='h-4 w-4 mr-[6px]' />
        )}
        <div className="flex">
            <div>
                {icon}
            </div>
            <div className="flex">
                <div className="font-medium text-[14px] leading-[18px] inline-block align-top pl-1 mt-[-1px]">{text.title}</div>
                <div className="text-[12px] font-normal leading-4 text-reddit_text-darker mt-[1px] ml-1">{text.body}</div>
            </div>
        </div>
    </div>
  )
}

export default CommunityFormType