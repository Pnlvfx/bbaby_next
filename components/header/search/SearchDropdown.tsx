import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ClickOutHandler from 'react-clickout-ts'
import { catchErrorWithMessage } from '../../API/common'
import { useMessage } from '../../main/TimeMsgContext'
import { searchTrend } from './APIsearch'

interface SearchDropdownProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const SearchDropdown = ({ show, setShow }: SearchDropdownProps) => {
  const [trends, setTrends] = useState([])
  const message = useMessage()

  useEffect(() => {
    setTimeout(() => {
      searchTrend()
        .then((trend) => {
          setTrends(trend)
        })
        .catch((err) => catchErrorWithMessage(err, message))
    }, 1000)
  }, [])

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
              <p className="text-xs font-bold text-reddit_text-darker">TRENDING TODAY</p>
              {trends.length >= 1 && trends.map((trend, index) => <div key={index}></div>)}
            </div>
          </div>
        </ClickOutHandler>
      )}
    </>
  )
}

export default SearchDropdown
