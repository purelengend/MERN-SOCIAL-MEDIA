import { Box } from '@mui/material'

const UserImage = ({ image, size = '60px' }: any) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: 'cover', borderRadius: '50%' }}
        width={size}
        height={size}
        alt='user'
        src={`${import.meta.env.VITE_REACT_APP_BACK_END_HOST}${image}`}
      />
    </Box>
  )
}

export default UserImage
