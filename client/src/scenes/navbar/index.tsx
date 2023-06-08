import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  FormControl,
} from '@mui/material'
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setMode, setLogout, RootStateProps } from '../../state'
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/FlexBetween'
import { useState } from 'react'
import { borderRadius } from '@mui/system'

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootStateProps) => state.user)
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')

  const {palette} = useTheme()
  const fullName = `${user?.firstName} ${user?.lastName}`
  return (
    <FlexBetween
      sx={{ p: '1rem 6%', backgroundColor: palette.background.paper }}
    >
      <FlexBetween gap='1.75rem'>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: 'clamp(1rem, 2rem, 2.25rem)',
            color: palette.primary.main,
            '&:hover': {
              color: palette.primary.light,
              cursor: 'pointer',
            },
          }}
          onClick={() => navigate('/home')}
        >
          Puredia
        </Typography>
        {isNonMobileScreen && (
          <FlexBetween
            sx={{
              backgroundColor: palette.info.light,
              borderRadius: '9px',
              gap: '3rem',
              padding: '0.1rem 1.5rem',
            }}
          >
            <InputBase placeholder='Search...' />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/*Desktop Nav */}
      {isNonMobileScreen ? (
        <FlexBetween gap='2rem'>
          <IconButton onClick={() => dispatch(setMode())}>
            {palette.mode === 'dark' ? (
              <DarkMode sx={{ fontSize: '25px' }} />
            ) : (
              <LightMode
                sx={{ fontSize: '25px', color: palette.info.dark }}
              />
            )}
          </IconButton>
          <Message sx={{ fontSize: '25px' }} />
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />
          <FormControl variant='standard'>
            <Select
              value={fullName}
              sx={{
                backgroundColor: palette.info.light,
                width: '150px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-root:': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: palette.info.light,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/*Mobile Nav */}
      {!isNonMobileScreen && isMobileMenuToggled && (
        <Box
          position='fixed'
          right='0'
          bottom='0'
          height='100%'
          zIndex='100'
          maxWidth='500px'
          minWidth='300px'
          sx={{
            backgroundColor: palette.background.default,
          }}
        >
          {/*Close Icon */}
          <Box display='flex' justifyContent='flex-end' p='1rem'>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/*Menu items */}
          <FlexBetween
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            gap='3rem'
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: '25px' }}
            >
              {palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode
                  sx={{ fontSize: '25px', color: palette.info.dark }}
                />
              )}
            </IconButton>
            <Message sx={{ fontSize: '25px' }} />
            <Notifications sx={{ fontSize: '25px' }} />
            <Help sx={{ fontSize: '25px' }} />
            <FormControl variant='standard'>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: 'infoLight',
                  width: '150px',
                  borderRadius: '0.25rem',
                  p: '0.25rem 1rem',
                  '& .MuiSvgIcon-root:': {
                    pr: '0.25rem',
                    width: '3rem',
                  },
                  '& .MuiSelect-select:focus': {
                    backgroundColor: palette.info.light,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Logout
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar
