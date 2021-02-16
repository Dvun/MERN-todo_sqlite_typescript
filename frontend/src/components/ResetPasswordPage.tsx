import React, {FC, useRef} from 'react'
import {
  Avatar,
  Button,
  Container,
  createMuiTheme,
  CssBaseline,
  Grid, makeStyles,
  MuiThemeProvider,
  TextField,
  Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {blue} from '@material-ui/core/colors'
import {useDispatch} from 'react-redux'
import {SubmitHandler, useForm} from 'react-hook-form'
import {ResetPasswordData} from '../Types'
import {yupResolver} from '@hookform/resolvers/yup'
import {resetSchema} from '../validation/validation'
import {resetPasswordFromLink} from '../redux/actions/userActions'
import { useParams, useHistory } from 'react-router-dom'


const ResetPasswordPage: FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {resetToken} = useParams()
  const history = useHistory()
  const password = useRef({})
  const {handleSubmit, errors, watch, register, reset} = useForm<ResetPasswordData>({
    resolver: yupResolver(resetSchema),
  })
  password.current = watch('password', '')
  const watchFields = watch()

  const onSubmit: SubmitHandler<ResetPasswordData> = (data: ResetPasswordData) => {
    if (data.password !== data.passwordRepeat) {
      return
    } else {
      if (Object.keys(errors).length === 0) {
        dispatch(resetPasswordFromLink(data, resetToken))
        reset()
        history.push('/')
      }
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
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>

            <MuiThemeProvider theme={theme}>

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
            Reset password
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

export default ResetPasswordPage