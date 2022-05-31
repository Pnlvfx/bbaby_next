import { useState, useEffect } from 'react'
import PostFormModal from '../../../components/submit/PostFormModal'
import {useRouter} from 'next/router'

function submit() {

  const router = useRouter()

  const {community} = router.query

  const [communityName,setCommunityName] = useState('')

  useEffect(() => {
    if(!router.isReady) return;
    setCommunityName(community)
  }, [router])


  return (
   <PostFormModal communityName={communityName} />
  )
}

export default submit;