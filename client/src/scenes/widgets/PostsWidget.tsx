import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps, setPosts } from '../../state/index'
import PostWidget from './PostWidget'
export const PostsWidget = ({
  userId,
  isProfile = false,
}: {
  userId: string | undefined
  isProfile?: boolean
}) => {
  const dispatch = useDispatch()
  const posts = useSelector((state: RootStateProps) => state.posts)
  const token = useSelector((state: RootStateProps) => state.token)

  const getPosts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}posts`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      }
    )
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  const getUserPosts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}posts/${userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      }
    )
    const data = await response.json()
    dispatch(setPosts({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, [])
  return (
    <>
      {posts.map(
        (
          {
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          },
          index
        ) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  )
}
