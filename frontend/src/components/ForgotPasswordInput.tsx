import React, {FC} from 'react'
import {Button, Grid, TextField} from '@material-ui/core'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import {ForgotPassword, HandlerClose} from '../Types'
import {forgotPasswordSendLink} from '../redux/actions/userActions'
import {forgotPasswordSchema} from '../validation/validation'
import {yupResolver} from '@hookform/resolvers/dist/yup'

const ForgotPasswordInput: FC<HandlerClose> = ({handlerClose}) => {
  const dispatch = useDispatch()
  const {handleSubmit, reset, watch, register, errors} = useForm<ForgotPassword>({
    resolver: yupResolver(forgotPasswordSchema),
  })
  const watchFields = watch()

  const onSubmit = (data: ForgotPassword) => {
    if (Object.keys(errors).length === 0) {
      dispatch(forgotPasswordSendLink(data))
      handlerClose(true)
      reset()
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

        <Grid item xs={6}>
          <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
          >
            Send Email
          </Button>
        </Grid>

      </Grid>

    </form>
  )
}

export default ForgotPasswordInput