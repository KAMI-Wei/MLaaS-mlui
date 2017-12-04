import React, {Component} from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

// 'stomp' 版本有问题, 确实可以直接链上取的. 在npm的版本很久.
import Stomp from 'stompjs/lib/stomp';

class About extends Component{

  constructor(props) {
    super(props);
    this.state = {
      content:null,
      websocketAbout: null,
      viewerCount: null
    };
    this.ws = null;
  }

  getAboutContent(){
    let URL='/about';
    let _this = this;
    fetch(URL)
      .then( (response)=>response.json() )
      .then( (data)=>{
        console.log(data);
        _this.setState({
          content:data.content
        })
      } )
      .catch( (err)=> {
        console.log(err);
        _this.setState({
          content: err
        })

      } )
  }

  handleWebSocketAboutData(data) {
    this.setState({
      viewerCount:data
    });
  }

  render() {
    return <Jumbotron>
      <Grid>
        <h1>About MLasS</h1>
        <br/>
        <p>{ this.state.content }</p>
        <br/>
        <div>
          <div> <p className="text-center"> <small>当前浏览人数: { this.state.viewerCount }</small></p></div>
        </div>
      </Grid>
    </Jumbotron>
  }

  componentDidMount(){
    this.getAboutContent();
    var socket = new WebSocket("ws://localhost:9000/about/websocket");
    socket.onopen = (ent) => {
      console.log(ent);
      socket.send(123);
      // 不要使用上面的socket
      // var stompClient = Stomp.Stomp.over(new WebSocket("ws://localhost:9000/about/websocket"));
      //
      // stompClient.connect({}, function (frame) {
      //   console.log('Connected: ' + frame);
      //   stompClient.send("/app/hello", "abcde");
      //   stompClient.subscribe('/topic/greetings', function (greeting) {
      //     console.log(greeting)
      //   });
      // });
    };

    socket.onmessage = (ent) => {
      console.log(ent);
      this.handleWebSocketAboutData(ent.data);
    };

    socket.onclose = (ent) => {
      console.log(ent);
      socket.send('bye');
    };

    socket.onerror = (ent) => {
      console.log(ent);
    };
    this.ws = socket;



  }

  componentWillUnmount() {

    this.ws.close();

  }
}

export default About;

