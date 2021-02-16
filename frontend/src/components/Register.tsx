import React, {FC, useRef} from 'react'
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {blue} from '@material-ui/core/colors'
import {RegisterData} from '../Types'
import {SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {registerSchema} from '../validation/validation'
import {useDispatch} from 'react-redux'
import {registerUser} from '../redux/actions/userActions'


const Register: FC<RegisterData> = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const password = useRef({})
  const {handleSubmit, errors, watch, register, reset} = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
  })
  password.current = watch('password', '')
  const watchFields = watch()

  const onSubmit: SubmitHandler<RegisterData> = (data: RegisterData) => {
    if (data.password !== data.passwordRepeat) {
      return
    } else {
      dispatch(registerUser(data))
      reset()
    }
  }


  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>


            <MuiThemeProvider theme={theme}>
              {/*Name Input*/}
              <Grid item xs={12} sm={6}>
                {
                  watchFields &&
                  <TextField
                    name="firstName"
                    variant="outlined"
                    error={!!errors.firstName}
                    fullWidth
                    label="First Name *"
                    inputRef={register}
                    helperText={errors.firstName?.message}
                  />
                }
              </Grid>

              {/*LastName Input*/}
              <Grid item xs={12} sm={6}>
                {
                  watchFields &&
                  <TextField
                    variant="outlined"
                    fullWidth
                    error={!!errors.lastName}
                    label="Last Name *"
                    name="lastName"
                    inputRef={register}
                    helperText={errors.lastName?.message}
                  />
                }
              </Grid>

              {/*Email Input*/}
              <Grid item xs={12}>
                {
                  watchFields &&
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email Address *"
                    error={!!errors.email}
                    name="email"
                    type='email'
                    inputRef={register}
                    helperText={errors.email?.message}
                  />
                }
              </Grid>

              {/*Password Input*/}
              <Grid item xs={12}>
                {
                  watchFields &&
                  <TextField
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    name="password"
                    label="Password *"
                    type="password"
                    inputRef={register({required: true})}
                    helperText={errors.password?.message}
                  />
                }
              </Grid>

              {/*Repeat Password Input*/}
              <Grid item xs={12}>
                {
                  watchFields &&
                  <TextField
                    variant="outlined"
                    fullWidth
                    error={!!errors.passwordRepeat}
                    name="passwordRepeat"
                    label="Repeat password *"
                    type="password"
                    inputRef={register({required: true})}
                    helperText={errors.passwordRepeat?.message}
                  />
                }
              </Grid>

            </MuiThemeProvider>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>

        </form>
      </div>
    </Container>
  )
}


const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
})

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 64px)',
  },
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default Register