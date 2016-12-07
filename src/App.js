import React from 'react';
import ShipSelect from './Ship-Select';
import GameBoard from './GameBoard';
/**
 * A counter button: tap the button to increase the count.
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gameBoard: null,
      count: 1,
      currentlySelectingShip: false,
      finishedShipSelection: false,
      flag: false,
      player1SelectedShips:
      [
        { shipName: 'Destroyer', shipLength: 2 },
        { shipName: 'Submarine', shipLength: 3 },
        { shipName: 'Cruiser', shipLength: 3 },
        { shipName: 'Battleship', shipLength: 4 },
        { shipName: 'Carrier', shipLength: 5 }
      ],
      currentlySelectedShipLength: null
    };
  }

  componentWillMount() {
    if (this.state.gameBoard === null) {
      this.createGameBoard();
    }
  }

  createGameBoard() {
    const arr = [];
    //Initialize a 10x10 "multidimensional" array
    for (let i = 0; i < 10; i++) {
        arr[i] = [];
        for (let j = 0; j < 10; j++) {
            arr[i][j] = {
                          flag: false,
                          coordinateX: i,
                          coordinateY: j,
                          containsShip: false,
                          alreadyAttacked: false
                        };
        }
    }
    console.log('this before gameBoard creation', this);
    this.setState({ gameBoard: arr });
  }

  initialShipPlacement(shipName, shipLength) {
    console.log('shipName', shipName, 'shiplength', shipLength);
    // console.log('event.target', typeof Number(event.target.ship.value));
    this.setState({
      currentlySelectingShip: true,
      currentlySelectedShipLength: shipLength
    }, () => {
      console.log('this.state', this.state);
    });
    console.log('filter array', this.state.player1SelectedShips.filter(values => {
      console.log('values', values);
      return values.shipName !== shipName;
    }));
  }

  userShipPlacement(userSubmittedTile) {
    if (userSubmittedTile.containsShip === false) {
      userSubmittedTile.containsShip = true;
      console.log('userSubmittedTile', userSubmittedTile);
      console.log('state', this.state);
      this.setState({ currentlySelectedShipLength: this.state.currentlySelectedShipLength-- });
    } else {
      userSubmittedTile.containsShip = false;
    }
    // this.state.gameBoard.map((arrayOfTiles) => {
    //   arrayOfTiles.filter((tiles) => {
    //      if (tiles.coordinateX === userSubmittedTile.coordinateX && tiles.coordinateY === userSubmittedTile.coordinateY) {
    //        this.setState({
    //          gameBoard: [
    //            ...this.state.gameBoard,
    //            this.state.gameBoard.map(arrayOfTiles => {
    //              arrayOfTiles.map(tiles => {
    //                tiles.coordinateX === userSubmittedTile.coordinateX && tiles.coordinateY === userSubmittedTile.coordinateY
    //                ? { ...tiles, containsShip: !tiles.containsShip } : tiles
    //              });
    //            })
    //          ]
    //        }, () => {console.log('state', this.state)});
    //      }
    //    });

      // console.log('userSubmittedPoint', userSubmittedPoint);
    // }

    // );
  }

  render() {
    return (
      <div
        className='main-container'
      >
      {this.state.currentlySelectingShip !== true
        ? <ShipSelect
            playerSelectsShip={this.initialShipPlacement.bind(this)}
            currentlySelectedShips={this.state.player1SelectedShips}
          />
        : <GameBoard
            gameBoard={this.state.gameBoard}
            userShipPlacement={this.userShipPlacement.bind(this)}
          />
      }
      </div>

    );
  }
}
export default App;
