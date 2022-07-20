import React from 'react'

interface PoliciesTabProps {
    header: string
    underHeader: string
    content: ContentProps[]
}

interface ContentProps {
    title: string
    body: string
    key: number
}


const PoliciesTab = ({header,underHeader,content}:PoliciesTabProps) => {

  return (
    <div className="mr-0 border border-reddit_border text-sm mb-12">
      <div className="p-8">
        <p className="underline">{header}</p>
        <p className="p-2 pt-0 pl-0 mb-5">{underHeader}</p>
            {content.map(c => (
                <div key={c.key} className='flex overflow-hidden'>
                    <div className='lg:w-[500px] min-w-[100px] max-w-[100px]'>
                        <p className='w-[60%]'>{c.title}</p>
                    </div>
                    <div className='ml-10 mb-7'>
                        <div>{c.body}</div>
                    </div>
                </div>
            ))}
      </div>
    </div>
  )
}

export default PoliciesTab
