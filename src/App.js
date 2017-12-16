import React, { Component } from 'react';
import { Grid, Navbar, } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import About from './About/About';
import Home from './Home/Home';
import NLP from './NLP/NLP'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar inverse fixedTop>
            <Grid>
              <Navbar.Header>
                <Navbar.Brand><Link to="/">MLaaS</Link></Navbar.Brand>
                <Navbar.Brand><Link to="/">Home</Link></Navbar.Brand>
                <Navbar.Brand><Link to="/NLP">NLP</Link></Navbar.Brand>
                <Navbar.Brand><Link to="/about">About</Link></Navbar.Brand>
              </Navbar.Header>
            </Grid>
          </Navbar>
          <Route path='/' exact component={Home}/>
          <Route path='/nlp' exact component={NLP}/>
          <Route path='/about' exact component={About}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
