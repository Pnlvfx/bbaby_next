import { useState } from "react";

const AuthorHeaderPage = () => {
    const [active,setActive] = useState(0);
    const input = [
        'OVERVIEW', 'POSTS', 'COMMENTS'
    ]
  return (
    <div className="h-10 bg-reddit_dark-brighter flex items-center justify-center border-b border-reddit_border">
        {input.map((i,index) => (
            <button onClick={() => {
                setActive(index)
            }} key={index} className={`h-full border-b-2 mx-3 ${active === index ? 'border-reddit_text' : 'border-transparent'} `}>
                <p className="text-sm font-bold">{i}</p>
            </button>
        ))}
    </div>
  )
}

export default AuthorHeaderPage;
