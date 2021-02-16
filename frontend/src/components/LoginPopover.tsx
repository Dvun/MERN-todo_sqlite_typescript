import React, {FC} from 'react'
import {Popover, Container} from '@material-ui/core'
import {PopoverProps} from '../Types'
import SimpleTabs from './SimpleTabs'


// @ts-ignore
const LoginPopover: FC<PopoverProps> = ({open, onClose, anchorEl}) => {

  const handlerClose = () => {
    onClose(true)
  }


  return (
    <Popover
      open={open || false}
      anchorEl={anchorEl || null}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Container maxWidth='xs'>
        <SimpleTabs handlerClose={handlerClose}/>
      </Container>
    </Popover>
  )
}


export default LoginPopover