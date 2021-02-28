import React, {FC} from 'react'
import {Header} from './components'
import Routes from './routes'
import ToastifyBar from './components/ToastifyBar'
import {Container} from '@material-ui/core'




const App: FC = () => {


  return (
    <>
      <Header/>
      <section style={{backgroundColor: 'gainsboro'}}>
        <Container maxWidth='md' style={{paddingTop: '3rem'}}>
          <Routes/>
        </Container>
      </section>
      <ToastifyBar/>
    </>
  )
}

export default App
