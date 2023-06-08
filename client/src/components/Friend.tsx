import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootStateProps, setFriends } from '../state'
import FlexBetween from './FlexBetween'
import UserImage from './UserImage'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
const Friend = ({ friendId, name, subTitle, userPicturePath }: any) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootStateProps) => state.user)
  const token = useSelector((state: RootStateProps) => state.token)
  const friends = useSelector((state: RootStateProps) => state.user?.friends)
  let isFriend
  if (friends) {
    isFriend = friends.find((friend) => friend._id === friendId)
  }
  const patchFriend = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}users/${
        user?._id
      }/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    dispatch(setFriends({ friends: data }))
  }

  const { palette } = useTheme()

  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={userPicturePath} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`)
            navigate(0)
          }}
        >
          <Typography
            color={palette.info.main}
            variant='h5'
            fontWeight='500'
            sx={{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={palette.info.medium} fontSize='0.75rem'>
            {subTitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() => patchFriend()}
        sx={{
          backgroundColor: palette.primary.light,
          p: '0.6rem',
        }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: palette.primary.dark }} />
        ) : (
          <PersonAddOutlined sx={{ color: palette.primary.dark }} />
        )}
      </IconButton>
    </FlexBetween>
  )
}

export default Friend
