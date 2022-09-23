import { useContext, useEffect, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { getCategories } from '../../cotegory/APIcategory'
import ClickOutHandler from 'react-clickout-ts'
import { CommunitiesInfoProps } from '../CommunitiesInfo'
import { BiInfoCircle } from 'react-icons/bi'
import { selectCategory } from '../../API/communityAPI'
import { CommunityContext, CommunityContextProps } from '../../community/CommunityContext'
import { AiOutlinePlus } from 'react-icons/ai'

const CategoriesDropdown = ({isCategoryDropdownOpen,setIsCategoryDropdownOpen}:CommunitiesInfoProps) => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(false)
  const title = 'Adding community topics allow people to find your community. Add a primary topic and sub topic to be discovered more easily.'
  const {communityInfo,getCommunity} = useContext(CommunityContext) as CommunityContextProps;
  const [categoriesLists, setCategoriesLists] = useState<CategoryProps[] | []>(
    []
  )

  useEffect(() => {
    setTimeout(() => {
      getCategories().then((res) => {
        setCategoriesLists(res)
      })
    }, 450)
  }, [])

  const doSelectCategory = (categoryName:string) => {
    setShow(false)
    setActive(false)
    if (setIsCategoryDropdownOpen) {
        setIsCategoryDropdownOpen(false);
    }
    selectCategory(categoryName,communityInfo.name).then(() => {
        getCommunity(communityInfo.name);
    })
  }

  return (
    <div id="category" className="mt-2 w-full">
        <div className='flex items-center space-x-1'>
            <p className="font-bold">Community topics</p>
            <BiInfoCircle title={title} className='h-5 w-5 text-reddit_text-darker hover:text-reddit_blue' />
        </div>
      <ClickOutHandler
        onClickOut={() => {
          setActive(false)
          setShow(false)
          if (setIsCategoryDropdownOpen) {
            setIsCategoryDropdownOpen(false);
          }
        }}
      >
        <button
          className={`mt-1 w-full rounded-md py-[2px] ${active && 'border'}`}
          onClick={(e) => {
            e.preventDefault()
            setActive(!active)
            setShow(!show)
            if (setIsCategoryDropdownOpen) {
                setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
            }
          }}
        >
          <div className="flex items-center">
            <p className="font-bold">{communityInfo.category ? communityInfo.category : "Add a Topic"}</p>
            <RiArrowDownSLine className="h-[20px] w-[20px] text-reddit_text-darker" />
          </div>
        </button>
        {show && (
          <div className="absolute max-h-[200px] w-full max-w-[295px] overflow-y-scroll bg-reddit_dark-brighter">
            {categoriesLists.map((category) => (
              <button
                key={category._id}
                onClick={e => {
                    e.preventDefault()
                    doSelectCategory(category.name)
                }}
                className="w-full p-2 text-left hover:bg-white hover:text-reddit_dark"
              >
                <p className="text-sm font-bold">{category.name}</p>
              </button>
            ))}
          </div>
        )}
      </ClickOutHandler>
      {communityInfo.category && (
        <div className='border border-reddit_border rounded-md mt-1'>
          <div className=''>
            <button className='flex mx-1 justify-center items-center rounded-full bg-reddit_dark-brightest m-2 py-1 px-2'>
              <AiOutlinePlus style={{height: 22, width: 22}} />
              <p className='text-sm'>Add a subtopics</p>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesDropdown;
