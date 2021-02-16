import React, {FC} from 'react'
import {NavLink} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import {Container, IconButton, Button, Typography, Toolbar, AppBar, Link} from '@material-ui/core'
import {LoginPopover} from './index'
import {useDispatch, useSelector} from 'react-redux'
import {logoutUser} from '../redux/actions/userActions'
import {RootState} from '../redux/rootState'


const Header: FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {user} = useSelector(({userReducer}: RootState) => userReducer)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)


  const handleOpenLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <header>
      <AppBar position="static">
        <Container maxWidth='md'>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              <Link href='/' color='inherit' underline='none'>
                TODO APP
              </Link>
            </Typography>
            {
              user && user.firstName ?
                <>
                  <Typography style={{textTransform: 'uppercase', color: 'greenyellow'}}>
                    {`Hello, ${user.firstName}`}
                  </Typography>
                  <Button component={NavLink} to='/logout' color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
                :
                <>
                  <Button color="inherit" onClick={handleOpenLogin}>
                    Login
                  </Button>
                  <Button component={NavLink} to='/register' color="inherit">
                    Register
                  </Button>
                </>
            }
          </Toolbar>
        </Container>
      </AppBar>
      <LoginPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </header>
  )
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default Header