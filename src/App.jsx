import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function driveWinner(gameBoard, players) {
  let winner = undefined;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  const [activePlayer, setActivePlayer] = useState('X');
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns(preTurns => {
      let currentPlayer = 'X';
      if (preTurns.length > 0 && preTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...preTurns,];
      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prePlayers => {
      return {
        ...prePlayers,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol={'X'} isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player name={PLAYERS.O} symbol={'O'} isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
    </main>
  )
}

export default App
