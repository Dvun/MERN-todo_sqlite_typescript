import React, {FC, useState} from 'react'
import Paper from '@material-ui/core/Paper'
import {Typography, Grid, createStyles, IconButton, OutlinedInput, FormControlLabel, Checkbox} from '@material-ui/core'
import {Todo} from '../redux/reducers/users/todoTypes'
import {makeStyles, Theme} from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {useForm} from 'react-hook-form'
import SaveIcon from '@material-ui/icons/Save'
import {useDispatch} from 'react-redux'
import {deleteTodo, updateTodo} from '../redux/actions/todoActions'


const TodoItem: FC<Todo> = ({id, description, isPublic, createdAt}: Todo) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [editMode, setEditMode] = useState(false)
  const {errors, watch, handleSubmit, register} = useForm()
  const watchField = watch()

  const handleDelete = async (id: number) => {
    await dispatch(deleteTodo(id))
  }

  const handleEdit = (id: number) => {
    setEditMode(!editMode)
  }

  const onSubmit = (data: any) => {
    console.log(data)
    if (Object.keys(errors).length === 0) {
      dispatch(updateTodo(id, data))
    }
  }

  const handleChange = (check: boolean) => {
    console.log(check)
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
                <FormControlLabel
                  control={<Checkbox defaultChecked={isPublic} onChange={(e) => handleChange(e.target.checked)} name="isPublic" />}
                  label="Public"
                  labelPlacement='start'
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={8}>
            {editMode ?
              <>
                {watchField &&
                <OutlinedInput
                  className={classes.input}
                  fullWidth
                  multiline
                  name='description'
                  defaultValue={description}
                  inputRef={register({required: true})}
                />
                }
                {errors.description && <span style={{color: 'darkred'}}>Field can not be empty!</span>}
              </>
              :
              <Typography>{description}</Typography>
            }
          </Grid>

          <Grid item md={2}>
            <Grid container justify='flex-end'>

              <Grid item>
                {editMode ?
                  <>
                    <IconButton color='primary' component='button' onClick={() => handleEdit(id)} type='button'>
                      <SaveIcon fontSize='inherit'/>
                    </IconButton>
                  </>
                  :
                  <IconButton className={classes.editButton} component='button' onClick={() => handleEdit(id)} type='submit'>
                    <EditIcon fontSize='inherit'/>
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
    input: {
      padding: '5px 5px 5px 5px',
    },
  }),
)

export default TodoItem