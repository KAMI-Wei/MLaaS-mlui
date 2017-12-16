import React from 'react';
import { Grid } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import { Tooltip } from 'react-bootstrap'
import { Image } from 'react-bootstrap'

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return <Jumbotron>
      <Grid>
        <h1>Welcome to MLaaS</h1>
        <p>
          这是 <label onClick={this.open.bind(this)}><a>ekansrm/kami</a></label> 的独立项目, 用于实验和演示将机器学习模型部署为服务的方法.
        </p>

        <p>
          主要组件:
          <li>前端: node.js, react.js</li>
          <li>后端: spring-boot</li>
          <li>守护进程和反向代理: supervisor, tengine</li>
          <li>ML: keras/tensorflow, deeplearning4j, weka</li>
        </p>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>欢迎交流~</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Email/邮箱</h4>
            <li>ekansrm0002@163.com</li>
            <hr />
            <h4>WeChat/微信</h4>
            <div className="text-center">
              <Image src={"wechat.jpeg"}/>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

      </Grid>
    </Jumbotron>
  }
}

export default Home;
