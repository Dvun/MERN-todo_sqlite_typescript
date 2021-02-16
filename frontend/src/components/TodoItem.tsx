import React, {FC} from 'react'
import Paper from '@material-ui/core/Paper'
import {Typography, Grid} from '@material-ui/core'

const TodoItem: FC = () => {
  return (
    <Paper elevation={3} style={{display: 'flex', alignItems: 'center', paddingInline: '15px', height: '3.5rem'}}>
      <Grid
        container
        direction="row"
      >
        <Grid item md={2}>
          <Typography>Some todo here</Typography>
        </Grid>
        <Grid item md={7}>
          <Typography>Some todo here</Typography>
        </Grid>
        <Grid item md={3} style={{float: 'right'}}>
          <Typography>Some todo here</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TodoItem