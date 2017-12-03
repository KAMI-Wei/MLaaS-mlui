import React, {Component} from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

class About extends Component{
  render() {

    return <Jumbotron>
      <Grid>
        <h1>关于 React App</h1>
      </Grid>
    </Jumbotron>
  }
}

export default About;

