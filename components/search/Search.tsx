import CEO from "../main/CEO";
import { siteUrl } from "../main/config";
import style from './search-page.module.css';
import SearchPageHeader from "./SearchPageHeader";
import { RiArrowDownSLine } from 'react-icons/ri';
import Head from "next/head";
import { SearchPageProps } from "../../pages/search";
import Post from "../post/Post";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Search = ({ posts }: SearchPageProps) => {
    const imagePreview = `${siteUrl}/imagePreview.png`;
    const description = "Bbabystyle is a network of communities. There's a community for whatever you're interested in on Bbabystyle."

    const router = useRouter();
    const [active, setActive] = useState('posts');
    const array = [
      {
        name: 'Posts',
        key: 'posts'
      },
      {
        name: 'Comments',
        key: 'comments'
      },
      {
        name: 'Communities',
        key: 'communities'
      },
      {
        name: 'People',
        key: 'people'
      }
    ]

    useEffect(() => {
      if (!router.isReady) return;
      if (router.query.type) {
        setActive(router.query.type.toString());
      }
    }, [router])
  return (
    <>
      <CEO
        title="bbabystyle.com: search results - none"
        twitter_card="summary"
        description={description}
        type="website"
        url={`${siteUrl}/search`}
        image={imagePreview}
      />
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={style.mainSearch}>
        <div className={style.searchPage}>
          <div>
            <div className={style.searchPage2}>
              <div className={style.searchPage3} role='tablist'>
                {array.map((item, index) => (
                  <SearchPageHeader key={index} index={index} item={item} active={active} />
                ))}
              </div>
            </div>
            <div className={style.subNav}>
              <div>
                <button className={style.subNavSort}>
                  Sort
                  <i className="icon ml-1">
                    <RiArrowDownSLine className="w-5 h-5" />
                  </i>
                </button>
              </div>
            </div>
            {active === 'posts' && (
              <div className={style.searchPagePosts}>
                <div tabIndex={0}/>
                <div className="mb-4">
                  <div className="h-auto w-full">
                    {posts.map((post) => (
                      <Post key={post._id} post={post} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Search;