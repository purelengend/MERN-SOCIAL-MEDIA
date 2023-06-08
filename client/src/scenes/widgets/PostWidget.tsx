import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootStateProps, setPost } from '../../state'
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import WidgetWrapper from '../../components/WidgetWrapper'
import Friend from '../../components/Friend'
import FlexBetween from '../../components/FlexBetween'
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material'

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}: any) => {
  const [isComments, setIsComments] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state: RootStateProps) => state.token)
  const loggedInUserId = useSelector((state: RootStateProps) => state.user?._id)
  const isLiked = Boolean(likes[loggedInUserId as string])
  const likeCount = Object.keys(likes).length
  const { palette } = useTheme()
  const patchLike = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}posts/${postId}/like`,
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    )
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }
  return (
    <WidgetWrapper m='2rem 0'>
      <Friend
        friendId={postUserId}
        name={name}
        subTitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={palette.info.main} sx={{ mt: '1rem' }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width='100%'
          height='auto'
          alt='post'
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`${import.meta.env.VITE_REACT_APP_BACK_END_HOST}/${picturePath}`}
        />
      )}
      <FlexBetween mt='0.25rem'>
        <FlexBetween gap='1rem'>
          {/* like section */}
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: palette.primary.main }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {/*end like section */}

          {/* comment section */}
          <FlexBetween gap='0.3rem'>
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
          {/*end comment section */}
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt='0.5rem'>
          {comments.map((comment: any, index: number) => (
            <Box key={`${name}-${index}`}>
              <Divider />
              <Typography
                sx={{ color: palette.info.main, m: '0.5rem 0', pl: '1rem' }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget
