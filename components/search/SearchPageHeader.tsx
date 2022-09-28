import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import style from './search-page.module.css';


interface SearchPageHeader {
  item: {
    name: string
    key: string
  }
  index: number
  active: string
}

const SearchPageHeader = ({item, index, active}: SearchPageHeader) => {
  return (
    <Link key={index} href={`/search?type=${item.name.toLowerCase()}`}>
      <a 
        role={'tab'}
        aria-selected={active === item.key ? true : false}
        className={style.searchPageLinks}
      >
        <button className={[style.searchPageButtons, style.searchPageButtons2, active !== item.key && style.searchPageButtonsNotActive].join(' ')}>
          {item.name}
        </button>
      </a>
    </Link>
  )
}

export default SearchPageHeader;
