import { Box, Divider, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootStateProps } from '../../state'
import { User } from '../../models/User'
import WidgetWrapper from '../../components/WidgetWrapper'
import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'
import {
  EditOutlined,
  LocationOnOutlined,
  ManageAccountsOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material'

const UserWidget = ({ userId, picturePath }: any) => {
  const [user, setUser] = useState<User>()
  const { palette } = useTheme()
  const navigate = useNavigate()
  const token = useSelector((state: RootStateProps) => state.token)

  const getUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}users/${userId}`,
      {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      }
    )
    const data = await response.json()

    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user) return null

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user

  return (
    <WidgetWrapper>
      {/*First Row */}
      <FlexBetween
        gap='0.5rem'
        pb='1.1rem'
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap='1rem'>
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant='h4'
              color={palette.info.dark}
              fontWeight='500'
              sx={{
                '&:hover': {
                  color: palette.primary.light,
                  cursor: 'pointer',
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/*Second Row */}
      <Box p='1rem 0'>
        <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
          <LocationOnOutlined
            fontSize='large'
            sx={{
              color: palette.info.main,
            }}
          />
          <Typography color={palette.info.medium}>{location}</Typography>
        </Box>
        <Box display='flex' alignItems='center' gap='1rem'>
          <WorkOutlineOutlined
            fontSize='large'
            sx={{
              color: palette.info.main,
            }}
          />
          <Typography color={palette.info.medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/*Third Row */}
      <Box p='1rem 0'>
        <FlexBetween mb='0.5rem'>
          <Typography color={palette.info.medium}>
            Who has viewd your profile
          </Typography>
          <Typography color={palette.info.main} fontWeight='500'>
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={palette.info.medium}>
            Impressions of your post
          </Typography>
          <Typography color={palette.info.main} fontWeight='500'>
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/*Fourth Row */}
      <Box p='1rem 0'>
        <Typography
          fontSize='1rem'
          color={palette.info.main}
          fontWeight='500'
          mb='1rem'
        >
          Social Profiles
        </Typography>

        <FlexBetween gap='1rem' mb='0.5rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/twitter.png' alt='twitter' />
            <Box>
              <Typography color={palette.info.main} fontWeight='500'>
                Twitter
              </Typography>
              <Typography color={palette.info.medium}>
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: palette.info.main }} />
        </FlexBetween>

        <FlexBetween gap='1rem'>
          <FlexBetween gap='1rem'>
            <img src='../assets/linkedin.png' alt='linkedin' />
            <Box>
              <Typography color={palette.info.main} fontWeight='500'>
                Linkedin
              </Typography>
              <Typography color={palette.info.medium}>
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: palette.info.main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  )
}

export default UserWidget
