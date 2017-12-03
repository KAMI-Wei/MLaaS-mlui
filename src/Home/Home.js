import React, {Component} from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

class Home extends Component{
  render() {
    return <Jumbotron>
      <Grid>
        <h1>Welcome to MLasS</h1>
      </Grid>
    </Jumbotron>
  }
}

export default Home;
