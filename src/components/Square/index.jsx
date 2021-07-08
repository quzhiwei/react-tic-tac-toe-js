import React, {Component} from 'react';
import './index.css'
import PubSub from 'pubsub-js'

class Square extends Component {

  componentDidMount() {
    PubSub.subscribe('nextPlayer',(_,data)=>{
      console.log(data);
    })
  }

  render() {
    const {squareVal,fillSquare,index} = this.props;
    return (
        <button className="square" onClick={()=>fillSquare(index)}>
          {squareVal}
        </button>
    );
  }
}

export default Square;