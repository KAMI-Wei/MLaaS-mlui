import React from 'react';
import { Button  } from 'react-bootstrap';
import { FormGroup, FormControl, InputGroup} from 'react-bootstrap';
import { ProgressBar  } from 'react-bootstrap';

class CommodityCommentAnalyse extends React.Component{

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
    return <div>

      <div className='row'>
        <FormGroup>
          <div className="col-xs-12">
            <InputGroup>
              <FormControl inputRef={(node) => {this.text = node}} type="text" placeholder="输入评价"/>
              <InputGroup.Button>
                <Button type="submit" onClick={this.predict.bind(this)}>分析</Button>
              </InputGroup.Button>
            </InputGroup>
          </div>
        </FormGroup>
      </div>

      <br/>

      <div className='row'>
        <label className="col-xs-1 text-right">
          {
            this.state.predict < 0.5 ? <div className="text-danger">负面</div> : "负面"
          }
        </label>
        <div className="col-xs-8 text-center">
          {
            this.state.predict ===0.5 ?
              <ProgressBar bsStyle="info" now={ 100 }/> :
              this.state.predict <0.5 ?
                <ProgressBar label={this.state.predict}>
                  <ProgressBar bsStyle="info" min={0} max={1} now={ this.state.predict } />
                  <ProgressBar bsStyle="danger"
                               min={0} max={1}
                               now={0.5-this.state.predict} label={2*(0.5-this.state.predict).toFixed(2)}/>
                  <ProgressBar bsStyle="info" min={0} max={1} now={ 0.5 } key={1} />
                </ProgressBar> :
                <ProgressBar>
                  <ProgressBar bsStyle="info" min={0} max={1} now={ 0.5 } key={1} />
                  <ProgressBar bsStyle="success"
                               min={0} max={1}
                               now={ this.state.predict-0.5 } label={2*(this.state.predict - 0.5).toFixed(2)}/>
                  <ProgressBar bsStyle="info" min={0} max={1} now={ 1 -this.state.predict}/>
                </ProgressBar>
          }
        </div>
        <label className="col-xs-1 text-left">
          {
            this.state.predict > 0.5 ? <div className="text-success">正面</div> : "正面"
          }
        </label>
      </div>

    </div>
  }

  componentDidMount(){

  }

  componentWillUnmount() {

  }
}

export default CommodityCommentAnalyse;
