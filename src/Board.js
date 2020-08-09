import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    ncols: 5,
    nrows: 5,
    chanceLightStartsOn: 0.5,
  };

  constructor(props) {
    super(props);

    this.state = {
      board: this.createBoard(),
      hasWon: false,
    };
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [x, y] = coord.split("-").map(Number);


    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }


    flipCell(x, y);

    flipCell(x+1, y); //right
    flipCell(x, y+1); // up
    flipCell(x, y-1); // down
    flipCell(x-1, y); // left

    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board, hasWon});
  }

  /** Render game board or winning message. */
  renderBoard() {
    let board = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`
        row.push(<Cell key={coord} isLit={ this.state.board[i][j] } flipCellsAroundMe={ () => this.flipCellsAround(coord) } />);
      }
      board.push(<tr key={i}>{row}</tr>);
    }
    return (
      <table className="Board">
        <tbody>{board}</tbody>
      </table>
    )

  }

  render() {
    const tblBoard = this.renderBoard();
    return(
      <div>
      {this.state.hasWon ? (
        <div className="Board-title">
          <div className="neon-orange">You</div>
          <div className="neon-blue">Win!</div>
        </div>
      ) : (
        <div>
          <div className="Board-title">
            <div className="neon-orange">Lights</div>
            <div className="neon-blue">Out</div>
          </div>
          {tblBoard}
        </div>
        )
      }
      </div>
    )
  }
}

export default Board;
