import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ClickOutHandler from 'react-clickout-ts'
import { searchTrend } from './APisearch'

interface SearchDropdownProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

const SearchDropdown = ({ show, setShow }:SearchDropdownProps) => {
    const [trends,setTrends] = useState([])

    useEffect(() => {
        setTimeout(() => {
          searchTrend().then(trend => {
            setTrends(trend)
          })
        },1000)
      },[])

  return (
    <>
      {show && (
        <ClickOutHandler
          onClickOut={() => {
            setShow(false)
          }}
        >
          <div className="rounded-md border border-reddit_border bg-reddit_dark-brighter">
            <div className="w-full p-2">
              <p className='text-reddit_text-darker text-xs font-bold'>TRENDING TODAY</p>
              {trends.map((trend,index) => (
                <div key={index}>

                </div>
              ))}
            </div>
          </div>
        </ClickOutHandler>
      )}
    </>
  )
}

export default SearchDropdown;
