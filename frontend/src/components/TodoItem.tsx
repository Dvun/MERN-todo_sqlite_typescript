import React, {FC, useCallback, useState, useRef, useEffect} from 'react'
import Paper from '@material-ui/core/Paper'
import {
  Typography,
  Grid,
  createStyles,
  IconButton,
  Checkbox,
  TextField,
} from '@material-ui/core'
import {Todo} from '../redux/reducers/users/todoTypes'
import {makeStyles, Theme} from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {useForm, Controller} from 'react-hook-form'
import SaveIcon from '@material-ui/icons/Save'
import {useDispatch} from 'react-redux'
import {deleteTodo, updateTodo} from '../redux/actions/todoActions'


const TodoItem = ({id, description, isPublic, createdAt}: Todo, {success}: any) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false)
  const {errors, watch, handleSubmit, register, control} = useForm()
  const watchField = watch()

  const handleDelete = async (id: number) => {
    await dispatch(deleteTodo(id))
  }

  const onSubmit = (data: any) => {
    console.log(data)
    const formData = {
      description: data.description,
      isPublic: data.isPublic,
    }
    if (Object.keys(errors).length === 0) {
      dispatch(updateTodo(id, formData))
    }
  }

  return (
    <Paper elevation={3} className={classes.paper}>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="row"
          wrap='wrap'
          alignItems='center'
        >

          <Grid item md={2}>
            <Grid container>
              <Grid item>
                <Typography variant='body1'><b>Created:</b> <small>{createdAt.substring(0, 10)}</small></Typography>
              </Grid>
              <Grid item>

                <label htmlFor="isPublic" className={`${!editMode ? classes.hidden : ''}`}>Public</label>
                <Controller
                  name="isPublic"
                  control={control}
                  defaultValue={isPublic}
                  inputRef={register}
                  render={props =>
                    <Checkbox
                      className={`${!editMode ? classes.hidden : ''}`}
                      onChange={e => props.onChange(e.target.checked)}
                      checked={props.value}
                    />
                  }
                />
                {isPublic && <Typography className={`${editMode ? classes.hidden : ''}`}><b>Published</b></Typography>}

              </Grid>
            </Grid>
          </Grid>

          <Grid item md={8}>

            {watchField &&
            <TextField
              className={`${classes.descriptionInput} ${(!editMode) ? classes.hidden : ''}`}
              fullWidth
              name='description'
              defaultValue={description}
              inputRef={register({required: true})}
            />
            }
            {errors.description && <span style={{color: 'darkred'}}>Field can not be empty!</span>}

            <Typography className={`${(editMode) ? classes.hidden : ''}`}>{success ? 'Loading...' : description}</Typography>

          </Grid>

          <Grid item md={2}>
            <Grid container justify='flex-end'>

              <Grid item>
                {
                  !editMode ?
                    <IconButton className={classes.editButton} onClick={() => setEditMode(true)} type='submit'>
                      <EditIcon fontSize='inherit'/>
                    </IconButton>
                    :
                    <IconButton color='primary' onClick={() => {
                      setEditMode(false)
                    }} type='button'>
                      <SaveIcon fontSize='inherit'/>
                    </IconButton>
                }
              </Grid>

              <Grid item>
                <IconButton className={classes.deleteButton} component='button' onClick={() => handleDelete(id)}>
                  <DeleteIcon fontSize='inherit'/>
                </IconButton>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </form>

    </Paper>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(1),
    },
    editButton: {
      color: '#ffc107',
    },
    deleteButton: {
      color: '#d50000',
    },
    descriptionInput: {
      padding: '5px 5px 5px 5px',
    },
    hidden: {
      position: 'fixed',
      visibility: 'hidden',
    },
  }),
)

export default TodoItem