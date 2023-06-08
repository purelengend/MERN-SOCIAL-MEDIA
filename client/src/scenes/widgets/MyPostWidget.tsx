import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateProps, setPosts } from '../../state'
import WidgetWrapper from '../../components/WidgetWrapper'
import FlexBetween from '../../components/FlexBetween'
import UserImage from '../../components/UserImage'
import Dropzone from 'react-dropzone'
import {
  AttachFileOutlined,
  DeleteOutlined,
  EditOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material'

const MyPostWidget = ({ picturePath }: any) => {
  const dispatch = useDispatch()
  const [isImage, setIsImage] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [post, setPost] = useState('')
  const { palette } = useTheme()
  const user = useSelector((state: RootStateProps) => state.user)
  const token = useSelector((state: RootStateProps) => state.token)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  const handlePost = async () => {
    const formData = new FormData()
    if (user) {
      formData.append('userId', user?._id)
      formData.append('description', post)
      if (image) {
        formData.append('picture', image)
        formData.append('picturePath', image.name)
      }
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}posts`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      )
      const posts = await response.json()
      dispatch(setPosts({ posts }))
      setImage(null)
      setPost('')
    }
  }
  return (
    <WidgetWrapper>
      <FlexBetween gap='1.5rem'>
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: '100%',
            backgroundColor: palette.info.light,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${palette.info.medium}`}
          borderRadius='5px'
          mt='1rem'
          p='1rem'
        >
          <Dropzone
            accept={{
              'image/*': ['.jpg', '.png', '.jpeg'],
            }}
            multiple={false}
            onDrop={(acceptedFile) => {
              setImage(acceptedFile[0])
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p='1rem'
                  width='100%'
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  <input name='picture' {...getInputProps()} />

                  {!image?.size ? (
                    <Typography>Add image here</Typography>
                  ) : (
                    <FlexBetween>
                      <Typography
                        maxWidth='400px'
                        overflow='hidden'
                        textOverflow='ellipsis'
                      >
                        {image.name}
                      </Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: '10%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap='0.25rem' onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: palette.info.mediumMain }} />
          <Typography
            color={palette.info.mediumMain}
            sx={{
              '&:hover': { cursor: 'pointer', color: palette.info.medium },
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap='0.25rem'>
              <GifBoxOutlined sx={{ color: palette.info.mediumMain }} />
              <Typography sx={{ color: palette.info.mediumMain }}>
                Clip
              </Typography>
            </FlexBetween>
            <FlexBetween gap='0.25rem'>
              <AttachFileOutlined sx={{ color: palette.info.mediumMain }} />
              <Typography sx={{ color: palette.info.mediumMain }}>
                Attachment
              </Typography>
            </FlexBetween>
            <FlexBetween gap='0.25rem'>
              <MicOutlined sx={{ color: palette.info.mediumMain }} />
              <Typography sx={{ color: palette.info.mediumMain }}>
                Audio
              </Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap='0.25rem'>
            <MoreHorizOutlined sx={{ color: palette.info.mediumMain }} />
          </FlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.paper,
            backgroundColor: palette.primary.main,
            borderRadius: '3rem',
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  )
}

export default MyPostWidget
