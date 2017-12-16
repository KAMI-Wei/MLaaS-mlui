import React from 'react';
import { Grid, Jumbotron,  } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

import CommodityCommentAnalyse from './CommodityCommentAnalyse/index'

class NLP extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      predict: 0.5
    };
    this.text = null;
  }

  predict() {
    let URL='/NLP/SentimentAnalysis/predict';
    let _this = this;
    let x_text = _this.text.value;
    if (x_text===null||x_text===undefined||x_text.trim()==='') {
      _this.setState({
        predict: 0.5
      });
      return;
    }
    fetch(
      URL,
      {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'text': x_text
        })
      }
    )
      .then( (response)=>response.json() )
      .then( (data)=>{
        _this.setState({
          predict: data.content
        })
      } )
      .catch( (err)=> {
        console.log(err);
        _this.setState({
          content: err
        })

      } )
  }


  render() {
    return <Jumbotron>
      <Grid>
        <div className="page-header">
          <h2>情感分析</h2>
        </div>

        <div>
          <p>文本情感分析(也称为意见挖掘)是指用自然语言处理,文本挖掘以及计算机语言学等方法来识别和提取原素材中的主观信息.
            通常来说, 情感分析的目的是为了找出说话者/作者在某些话题上或者针对一个文本两极的观点的态度.
          </p>
          <p className="text-right">
            <a href={'https://zh.wikipedia.org/wiki/%E6%96%87%E6%9C%AC%E6%83%85%E6%84%9F%E5%88%86%E6%9E%90'}>
              --<i>Wikipedia</i>
            </a>
          </p>
        </div>

        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">
            <Col sm={2}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="first">
                  商品评价
                </NavItem>
              </Nav>
            </Col>
            <Col sm={10}>

              <Tab.Content animation>

                <Tab.Pane eventKey="first">
                  <div>
                    <h3>模型</h3>
                    <p className="text-left">
                      这是一个通过Keras实现的一个基于Embedding和LSTM的简单模型.
                      原理很简单: 对于输入评价, 通过Python库jieba进行分词. 得到词序列后, 使用一个预先训练好的Tokenizer转化为整数序列, 经过padding得到长度固定的整数序列.
                      整数序列通过模型的Embedding层转为词向量, 再通过LSTM层和sigmoid, 给出一个为正面评价的概率.
                    </p>

                    <br/>

                    <h3>训练</h3>
                    <p className="text-left small">
                      样本为在网上下载的淘宝商品评价数据共21122条, 每条已标记为好评或差评.
                    </p>

                    <br/>

                    <h3>效果</h3>
                    <p className="text-left">
                    由于模型简陋, 加之样本数量太少, 对于一些特征不明显的输入, 模型的输出不会很准确, 甚至会给出截然相反的结论, 大家权当一乐.
                    这个项目的主要目的还是实验和展示将机器学习模型部署为服务的方法.
                    待有时间和精力, 会考虑实现一个更好的模型, 做更多的训练, 把准确率提上去.
                    </p>
                  </div>

                  <br/>

                  <h3> Try it out~</h3>
                  <br/>
                  <div className='well well-sm'>
                    <CommodityCommentAnalyse/>
                  </div>
                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Grid>
    </Jumbotron>
  }

  componentDidMount(){

  }

  componentWillUnmount() {

  }
}

export default NLP;

