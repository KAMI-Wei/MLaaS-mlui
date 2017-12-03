import React, {Component} from 'react';
import { Grid, Jumbotron, Button } from 'react-bootstrap';

class Home extends Component{
  render() {
    return <Jumbotron>
      <Grid>
        <h1>Welcome to React</h1>
        <p>
          <Button
            bsStyle="success"
            bsSize="large"
            href="http://react-bootstrap.github.io/components.html"
            target="_blank">
            View React Bootstrap Docs
          </Button>
        </p>
      </Grid>
    </Jumbotron>

  }
}

export default Home;
