import { EditOutlined } from '@mui/icons-material'
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import FlexBetween from '../../components/FlexBetween'
import { LoginUser, RegisterUser } from '../../models/User'
import { setLogin } from '../../state'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().required('required').email('invalid email'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.mixed<File>().test('fileSize', 'Image is required', (file) => {
    if (file) {
      return file.size !== 0
      // console.log(file.size !== 0)
    }
  }),
})

const loginSchema = yup.object().shape({
  email: yup.string().required('required').email('invalid email'),
  password: yup.string().required('required'),
})

const initialRegisterValue: RegisterUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: new File([], ''),
}

const initialLoginValue: LoginUser = {
  email: '',
  password: '',
}
const Form = () => {
  const [pageType, setPageType] = useState('register')
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isNonMobileScreen = useMediaQuery('(min-width: 600px)')

  return (
    <>
      {pageType === 'register' ? (
        /*REGISTER FORM */
        <Formik
          key='register'
          onSubmit={async (values, onSubmitProps) => {
            // user FormData() for sending info with image
            const formData = new FormData()
            for (let value in values) {
              formData.append(value, (values as any)[value])
            }
            formData.append('picturePath', values.picture.name)
            const savedUserResponse = await fetch(
              `${import.meta.env.VITE_REACT_APP_BACK_END_HOST}register`,
              { method: 'POST', body: formData }
            )

            const savedUser = await savedUserResponse.json()
            onSubmitProps.resetForm()

            if (savedUser) setPageType('login')
          }}
          initialValues={initialRegisterValue}
          validationSchema={registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display='grid'
                gap='30px'
                gridTemplateColumns='repeat(4,minmax(0, 1fr))'
                sx={{
                  '& > div': {
                    gridColumn: isNonMobileScreen ? undefined : 'span 4',
                  },
                }}
              >
                <TextField
                  label='Email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />

                <TextField
                  label='Password'
                  type='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name='password'
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />
                <TextField
                  label='First Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name='firstName'
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />

                <TextField
                  label='Last Name'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name='lastName'
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />

                <TextField
                  label='Location'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name='location'
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: 'span 4',
                  }}
                />

                <TextField
                  label='Occupation'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name='occupation'
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: 'span 4',
                  }}
                />
                <Box
                  sx={{
                    gridColumn: 'span 4',
                    border: `1px solid ${palette.info.medium}`,
                    borderRadius: '5px',
                    p: '1rem',
                  }}
                >
                  <Dropzone
                    accept={{
                      'image/*': ['.jpg', '.png', '.jpeg'],
                    }}
                    multiple={false}
                    onDrop={(acceptedFile) => {
                      setFieldValue('picture', acceptedFile[0])
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p='1rem'
                        sx={{
                          '&:hover': {
                            cursor: 'pointer',
                          },
                        }}
                      >
                        <input name='picture' {...getInputProps()} />

                        {!values.picture.size ? (
                          <Typography>Add picture here</Typography>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                  {Boolean(touched.picture) &&
                    (Boolean(errors.picture) ? (
                      <Typography color={palette.error.dark}>
                        Image is required
                      </Typography>
                    ) : (
                      <></>
                    ))}
                </Box>
              </Box>

              {/*Register button */}
              <Box>
                <Button
                  fullWidth
                  type='submit'
                  sx={{
                    m: '2rem 0',
                    p: '1rem',
                    backgroundColor: palette.primary.main,
                    color: palette.background.paper,
                    '&:hover': {
                      color: palette.primary.main,
                    },
                  }}
                >
                  REGISTER
                </Button>

                <Typography
                  onClick={() => {
                    resetForm()
                    setPageType(pageType === 'register' ? 'login' : 'register')
                  }}
                  sx={{
                    textDecoration: 'underline',
                    color: palette.primary.main,
                    '&:hover': {
                      cursor: 'pointer',
                      color: palette.primary.light,
                    },
                  }}
                >
                  Already have an account? Login here.
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      ) : (
        /*LOGIN FORM */
        <Formik
          key='login'
          onSubmit={async (values, onSubmitProps) => {
            const loggedInResponse = await fetch(
              'http://localhost:3001/auth/login',
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
              }
            )

            const loggedIn = await loggedInResponse.json()
            onSubmitProps.resetForm()

            if (loggedIn) {
              dispatch(
                setLogin({
                  user: loggedIn.user,
                  token: loggedIn.token,
                })
              )
              navigate('/home')
            }
          }}
          initialValues={initialLoginValue}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display='grid'
                gap='30px'
                gridTemplateColumns='repeat(4,minmax(0, 1fr))'
                sx={{
                  '& > div': {
                    gridColumn: isNonMobileScreen ? undefined : 'span 4',
                  },
                }}
              >
                <TextField
                  label='Email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name='email'
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />

                <TextField
                  label='Password'
                  type='password'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name='password'
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: 'span 2',
                  }}
                />
              </Box>

              <Box>
                <Button
                  fullWidth
                  type='submit'
                  sx={{
                    m: '2rem 0',
                    p: '1rem',
                    backgroundColor: palette.primary.main,
                    color: palette.background.paper,
                    '&:hover': {
                      color: palette.primary.main,
                    },
                  }}
                >
                  LOGIN
                </Button>

                <Typography
                  onClick={() => {
                    resetForm()
                    setPageType(pageType === 'register' ? 'login' : 'register')
                  }}
                  sx={{
                    textDecoration: 'underline',
                    color: palette.primary.main,
                    '&:hover': {
                      cursor: 'pointer',
                      color: palette.primary.light,
                    },
                  }}
                >
                  Don't have an account yet? Sign up here.
                </Typography>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  )
}

export default Form
