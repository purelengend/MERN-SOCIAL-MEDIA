import { useEffect, useState } from 'react'
import { User } from '../../models/User'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootStateProps } from '../../state'
import { Box, useMediaQuery } from '@mui/material'
import Navbar from '../navbar'
import UserWidget from '../widgets/UserWidget'
import MyPostWidget from '../widgets/MyPostWidget'
import { PostsWidget } from '../widgets/PostsWidget'
import AdvertWidget from '../widgets/AdvertWidget'
import FriendListWidget from '../widgets/FriendListWidget'

const ProfilePage = () => {
  const [user, setUser] = useState<User>()
  const { userId } = useParams()
  const token = useSelector((state: RootStateProps) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  const getUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}users/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    const data = await response.json()
    console.log(data)
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user) return null
  return (
    <Box>
      <Navbar />
      <Box
        width='100%'
        p='2rem 6%'
        display={isNonMobileScreens ? 'flex' : 'block'}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m='2rem 0' />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
