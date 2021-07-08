import React, {Component} from 'react';
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import './App.css'
class App extends Component {


  render() {
    return (
        <div className="game">
          <div className="game-board">
            <Gameboard/>
          </div>
          {/*<hr/>*/}
          <div className="game-info">
            <Scoreboard/>
          </div>
        </div>
    )
  }
}

export default App;

