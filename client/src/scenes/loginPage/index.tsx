import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Form from './form'

const LoginPage = () => {
  const { palette } = useTheme()
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          backgroundColor: palette.background.paper,
          p: '1rem 6%',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '32px',
            color: palette.primary.main,
          }}
        >
          Puredia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? '50%' : '93%'}
        sx={{
          p: '2rem',
          m: '2rem auto',
          borderRadius: '1.5rem',
          backgroundColor: palette.background.paper,
        }}
      >
        <Typography fontWeight='500' variant='h5' sx={{ mb: '1.5rem' }}>
          Welcome to Puredia, the Social Media made build from MERN!
        </Typography>
        <Form />
      </Box>
    </Box>
  )
}

export default LoginPage
