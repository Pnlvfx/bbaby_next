import Link from "next/link";
import { useState } from "react";

const AuthorHeaderPage = () => {
    const [active,setActive] = useState(0);
    const input = [
        'OVERVIEW', 'POSTS', 'COMMENTS'
    ]
  return (
    <div className="user-header">
        <div className="user-header-2">
            <div className="user-header3 user-header3_1">
                <div className="user-header4">
                    {input.map((i, index) => (
                        <Link className='user-header-links user-header-links-active' key={index} href={'/'}>
                            {i}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AuthorHeaderPage;
