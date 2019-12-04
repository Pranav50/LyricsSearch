import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import NavBar from './components/NavBar'
import Index from './components/Index'
import {Provider} from '../src/context'
import Lyrics from './components/Lyrics'


export class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <NavBar/>
            <div className="container">
              <Switch>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/lyrics/track/:id" component={Lyrics} />
              </Switch>
            </div>
          </React.Fragment> 
        </Router>
      </Provider>
    )
  }
}

export default App

