import React, {Component} from 'react';
import './index.css'
import PubSub from 'pubsub-js'

class Scoreboard extends Component {
  state = {
    next: 'X',
    gameOver: false,
    winnner:'',
  }

  newGame= ()=>{
    PubSub.publish('newGame',true);
    // this.setState({gameOver:false});
  }

  componentDidMount() {
    this.nextSubscribe = PubSub.subscribe('next', (_, data) => {
      this.setState({next: data})
    })

    this.gameOverSubscribe = PubSub.subscribe('gameOver', (_, data) => {
      this.setState({gameOver: data})
    })

    this.winnerSubscribe = PubSub.subscribe('winner', (_, data) => {
      this.setState({winner: data})
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.nextSubscribe);
    PubSub.unsubscribe(this.gameOverSubscribe);
    PubSub.unsubscribe(this.winnerSubscribe);
  }

  render() {
    return (
        <div>
          <button onClick={this.newGame}> Restart </button> <br/>
          {
            !this.state.gameOver
                ?
                <span>Next Player:{this.state.next}</span>
                :
                <div>
                  <span>Game Over</span> <br/>
                  <span>Winner is {this.state.winner}</span>
                </div>
          }
        </div>
    );
  }
}

export default Scoreboard;