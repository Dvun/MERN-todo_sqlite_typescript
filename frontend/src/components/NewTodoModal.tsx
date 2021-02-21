import React, {useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {TransitionProps} from '@material-ui/core/transitions'
import {TextField, Box, createStyles, Grid, Checkbox, FormControlLabel} from '@material-ui/core'
import {makeStyles, Theme} from '@material-ui/core/styles'
import {useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import {createNewTodo, getUserTodos} from '../redux/actions/todoActions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function NewTodoModal({open, handleClose}: any) {
  const dispatch = useDispatch()
  const {errors, watch, handleSubmit, register, reset} = useForm()
  const watchFields = watch()

  const onSubmit = async (data: any) => {
    if (Object.keys(errors).length === 0) {
      await dispatch(createNewTodo(data))
      dispatch(getUserTodos())
    }
    reset()
    handleClose()
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth={'md'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add New ToDo</DialogTitle>
        <DialogContent>
          <Grid container direction='row'>
            <Grid item md={10}>
              <Box>
                {watchFields &&
                <TextField label="Write your description here" name='description' fullWidth
                           inputRef={register({required: true})}/>
                }
                {errors.description && <span style={{color: 'darkred'}}>Field can not be empty!</span>}
              </Box>
            </Grid>
            <Grid item md={1}/>
            <Grid item md={1}>
              <Grid container justify='flex-end'>
                <FormControlLabel
                  control={<Checkbox/>}
                  label="Public"
                  labelPlacement='end'
                  name="isPublic"
                  inputRef={register}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type='submit' color="primary">
            Add Todo
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({}),
)