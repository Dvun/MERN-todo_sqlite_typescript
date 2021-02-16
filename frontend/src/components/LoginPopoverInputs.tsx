import React from 'react'
import {Button, Grid, TextField} from '@material-ui/core'
import {SubmitHandler, useForm} from 'react-hook-form'
import {HandlerClose, LoginData} from '../Types'
import {yupResolver} from '@hookform/resolvers/yup'
import {loginSchema} from '../validation/validation'
import {useDispatch} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'


const LoginPopoverInputs: React.FC<HandlerClose> = ({handlerClose}) => {
  const dispatch = useDispatch()
  const {handleSubmit, errors, watch, register, reset} = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  })
  const watchFields = watch()

  const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {
    if (Object.keys(errors).length === 0) {
    dispatch(loginUser(data))
      reset()
      handlerClose(true)
    }
  }

  return (
    <form noValidate style={{marginTop: '1rem'}} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>

        {/*Email Input*/}
        <Grid item xs={12}>
          {
            watchFields &&
            <TextField
              size='small'
              variant="outlined"
              fullWidth
              error={!!errors.email}
              label="Email Address"
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
              size='small'
              variant="outlined"
              fullWidth
              error={!!errors.password}
              name="password"
              label="Password"
              type="password"
              inputRef={register}
              helperText={errors.password?.message}
            />
          }
        </Grid>

        <Grid item xs={6}>
          <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Grid>

      </Grid>

    </form>
  )
}

export default LoginPopoverInputs