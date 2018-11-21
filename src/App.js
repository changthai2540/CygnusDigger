import React, { Component } from 'react'
import styled from 'styled-components'

import 'cirrus-ui/dist/cirrus.css'
import './App.css'

import GameId from './containers/game_id'
import CaptchaForm from './containers/captcha_form'
import CaptchaBox from './containers/captchabox'
import StatusBar from './containers/statusbar'
import Proxies from './containers/proxies'

// const Box = styled.div`
// padding-top: 15%
// padding-left: 25%
// padding-right: 25%
// text-align: center
// `

const Box = styled.div`
margin-left: auto;
margin-right: auto;
margin-top: 2%;
width: 800px;
text-align: center;
`

const Card = styled.div`
border: 1px
background: #eee
box-shadow: 2px 2px grey
min-height: ${props => props.mh};
`

class App extends Component {
  render() {
    return (
      <Box>
          <Card mh="500px">
              <h5>CygnusDigger for PlayServer</h5>
              <CaptchaBox />
              <GameId />
              <CaptchaForm />
              <StatusBar />
          </Card>
          <hr/>
          <Card mh="200px">
            <h5>Proxy list</h5>
            <Proxies/>
          </Card>
      </Box>
    )
  }
}

export default App
