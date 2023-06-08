import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps, setFriends } from '../../state'
import WidgetWrapper from '../../components/WidgetWrapper'
import Friend from '../../components/Friend'

const FriendListWidget = ({ userId }: any) => {
  const dispatch = useDispatch()
  const { palette } = useTheme()
  const token = useSelector((state: RootStateProps) => state.token)
  const friends = useSelector((state: RootStateProps) => state.user?.friends)

  const getFriends = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}users/${userId}/friends`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  useEffect(() => {
    getFriends()
  }, [])
  return (
    <WidgetWrapper>
      <Typography
        color={palette.info.dark}
        variant='h5'
        fontWeight='500'
        sx={{ mb: '1.5rem' }}
      >
        Friend List
      </Typography>
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subTitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  )
}

export default FriendListWidget
