import React, {Component} from 'react';
import './index.css'
import Square from "../Square";
import PubSub from 'pubsub-js'

class Gameboard extends Component {
  state = {
    gameStatus:['','','','','','','','',''],
    next:'X',
    gameOver:false,
    winner:'',
  }

  fillSquare =(index) =>{
    let {gameStatus,next,gameOver} = this.state;
    if(gameStatus[index] === '' && !gameOver ){
      gameStatus[index] = next;
      next = (next === 'X') ? 'Y' : 'X';
      this.calculateWinner(gameStatus);
      this.setState({gameStatus,next})
      PubSub.publish('next',next);
    }
  }

  calculateWinner = (squares)=>{
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        this.setState({gameOver:true,winner:a});
        PubSub.publish("gameOver",true);
        PubSub.publish('winner',squares[a]);
        return squares[a];
      }
    }
    return null;
  }

  componentDidMount() {
    this.nextSubscribe = PubSub.subscribe('newGame', (_, data) => {
      this.setState({
        gameStatus:['','','','','','','','',''],
        next:'X',
        gameOver:false,
        winner:'',
      })
      PubSub.publish('next',this.state.next);
      PubSub.publish('gameOver',this.state.gameOver);
      // console.log('triggered')
    })
  }


  render() {
    const {gameStatus} = this.state;
    return (
        <div className='gameBoard'>
          {
            gameStatus.map((square,index)=>{
              return <Square key={index} squareVal={square} fillSquare={this.fillSquare} index={index}/>
            })
          }

        </div>
    );
  }
}

export default Gameboard;