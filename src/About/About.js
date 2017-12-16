import React from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

// 'stomp' 版本有问题, 确实可以直接链上取的. 在npm的版本很久.
import Stomp from 'stompjs/lib/stomp';

class About extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      content:null,
      viewerCount: null,
      greeting: null,
      announce: null

    };
    this.ws = null;
    this.stomp = null;
  }

  queryContent(){
    let URL='/about';
    let _this = this;
    fetch(URL)
      .then( (response)=>response.json() )
      .then( (data)=>{
        console.log(data);
        this.setState({
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

  handleDataFromWebSocket(data) {
    this.setState({
      viewerCount:data
    });
  }

  handleUserDataFromStomp(data) {
    data = JSON.parse(data.body);
    this.setState({
      greeting: data.content
    });
  }

  handleBoardCastDataFromStomp(data) {
    data = JSON.parse(data.body);
    this.setState({
      announce: data.content
    });
  }

  sendDataViaWebSocket(data) {
    if (this.ws === null || this.ws === undefined) {
      throw new Error("WebSocket 未就绪");
    }

    if (typeof data !== 'string') {
     data = JSON.stringify(data);
    }
    this.ws.send(data);
  }

  sendDataViaStomp(data) {
    if (this.stomp === null || this.stomp === undefined) {
      throw new Error("Stomp 未就绪");
    }

    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }

    this.stomp.send("/app/hello",  data);

  }


  render() {
    return <Jumbotron>
      <Grid>
        <h2>About MLaaS</h2>
        <br/>
        <p>{this.state.greeting} { this.state.content }</p>
        <br/>
        <div>
          <div>
            <p className="text-center">
              <small>当前浏览人数: { this.state.viewerCount } (最近加入: {this.state.announce} )</small>
            </p>
          </div>
        </div>
      </Grid>
    </Jumbotron>
  }

  componentDidMount(){
    let self = this;

    self.queryContent();
    self.name = Math.random().toString(36).substr(2);

    // 建立 WebSocket 连接
    self.ws = new WebSocket("ws://localhost:9000/about/websocket");

    // 绑定事件
    self.ws.onopen = (event) => {
      console.log("WebSocket onOpen: ");
      console.log(event);

      self.sendDataViaWebSocket(self.name)
    };

    self.ws.onmessage = (event) => {
      this.handleDataFromWebSocket(event.data);
    };

    self.ws.onclose = (event) => {
      console.log("WebSocket onClose: ");
      console.log(event);
    };

    self.ws.onerror = (event) => {
      self.ws = null;
      console.log("WebSocket onError: ");
      console.log(event);
    };

    self.stomp = Stomp.Stomp.over(new WebSocket("ws://localhost:9000/about/stomp/websocket"));

    self.stomp.connect({}, function (frame) {

      // console.log('Connected: ' + frame);
      self.stomp.subscribe('/topic/announce', (greeting) => {
        self.handleBoardCastDataFromStomp(greeting);
      });

      self.stomp.subscribe('/user/queue/msg', (msg) => {
        self.handleUserDataFromStomp(msg);
      });

      self.stomp.send("/app/announce", {}, self.name);

      self.stomp.send("/app/register", {}, self.name);

    });


  }

  componentWillUnmount() {

    if(this.ws) {
      this.ws.close();
    }

  }
}

export default About;

