import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from './skeleton/elements/nav-bar';
import Teams from './routes/teams/teams';
import Team from './routes/team/team';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={Teams}/>
            <Route path="/team/:teamId" component={Team}/>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
