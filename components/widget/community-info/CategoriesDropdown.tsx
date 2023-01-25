import { useContext, useEffect, useState } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
import { getCategories } from '../../cotegory/APIcategory'
import { BiInfoCircle } from 'react-icons/bi'
import { CommunityContext, CommunityContextProps } from '../../community/CommunityContext'
import { AiOutlinePlus } from 'react-icons/ai'
import communityapis from '../../API/communityapis'

const CategoriesDropdown = () => {
  const [show, setShow] = useState(false)
  const title = 'Adding community topics allow people to find your community. Add a primary topic and sub topic to be discovered more easily.'
  const { communityInfo, refreshCommunity } = useContext(CommunityContext) as CommunityContextProps
  const [categoriesLists, setCategoriesLists] = useState<CategoryProps[] | []>([])

  useEffect(() => {
    setTimeout(() => {
      getCategories().then((res) => {
        setCategoriesLists(res)
      })
    }, 450)
  }, [])

  const doSelectCategory = (categoryName: string) => {
    setShow(false)
    communityapis.selectCategory(communityInfo.name, categoryName).then(() => {
      refreshCommunity(communityInfo.name)
    })
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setShow(false)
      }}
      id="category"
      className="mt-2 w-full"
    >
      <div className="flex items-center space-x-1">
        <p className="font-bold">Community topics</p>
        <BiInfoCircle title={title} className="h-5 w-5 text-reddit_text-darker hover:text-reddit_blue" />
      </div>
      <button
        className={`mt-1 w-full rounded-md py-[2px] ${show && 'border'}`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setShow(!show)
        }}
      >
        <div className="flex items-center">
          <p className="font-bold">{communityInfo.category ? communityInfo.category : 'Add a Topic'}</p>
          <RiArrowDownSLine className="h-[20px] w-[20px] text-reddit_text-darker" />
        </div>
      </button>
      {show && (
        <div className="absolute max-h-[200px] w-full max-w-[295px] overflow-y-scroll bg-reddit_dark-brighter">
          {categoriesLists.map((category) => (
            <button
              key={category._id}
              onClick={(e) => {
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
      {communityInfo.category && (
        <div className="mt-1 rounded-md border border-reddit_border">
          <div className="">
            <button className="m-2 mx-1 flex items-center justify-center rounded-full bg-reddit_dark-brightest py-1 px-2">
              <AiOutlinePlus style={{ height: 22, width: 22 }} />
              <p className="text-sm">Add a subtopics</p>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesDropdown
