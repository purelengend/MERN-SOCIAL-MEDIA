import { Typography, useTheme } from '@mui/material'
import WidgetWrapper from '../../components/WidgetWrapper'
import FlexBetween from '../../components/FlexBetween'

const AdvertWidget = () => {
  const { palette } = useTheme()
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={palette.info.dark} variant='h5' fontWeight='500'>
          Sponsored
        </Typography>
        <Typography color={palette.info.medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width='100%'
        height='auto'
        alt='advert'
        src={`${import.meta.env.VITE_REACT_APP_BACK_END_HOST}info4.jpeg`}
        style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color={palette.info.main}>MikeCosmetics</Typography>
        <Typography color={palette.info.medium}>mikecosmetics.com</Typography>
      </FlexBetween>
      <Typography color={palette.info.medium} m='0.5rem 0'>
        Your path way to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget
