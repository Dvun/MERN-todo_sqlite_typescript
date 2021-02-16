import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import {TodoItem} from './index'


const TodoList = () => {


  return (
    <>
      <Box component='div' display='flex' justifyContent='flex-end'>
        <Button variant='contained' color='primary' startIcon={<LocalHospitalIcon/>}>
          Add Todo
        </Button>
      </Box>
      <Box component='div' marginTop={3}>
        <TodoItem/>
      </Box>
    </>
  )
}

export default TodoList