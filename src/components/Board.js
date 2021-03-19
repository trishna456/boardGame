import React from 'react';
import Cell from './Cell';
import '../styling.scss';

class Board extends React.Component {
  state = {
    width: 0,
    height: 0,
    data: [],
    player: {},
    sprites: 10,
    midrow: 0,
    midcolumn: 0,
    moves: 0,
    flag: true,
  };

  componentDidMount() {
    let width = prompt('enter width');
    let height = prompt('enter height');
    this.setState({ width, height }, () => {
      let data = this.initBoardData(height, width, this.state.sprites);

      this.setState(
        {
          data: data,
          midrow: Math.floor(height / 2),
          midcolumn: Math.floor(width / 2),
        },
        () => {
          console.log('even data has updated now');
          document.addEventListener('keydown', (event) => {
            this.onKeyDown(event);
          });
        }
      );
    });
  }

  componentWillUnmount() {
    console.log('component will unmount');
  }

  plantSprites(data, height, width, sprites) {
    let randomx,
      randomy,
      spritesPlanted = 0;
    while (spritesPlanted < sprites) {
      randomx = this.getRandomNumber(width);
      randomy = this.getRandomNumber(height);
      if (!data[randomx][randomy].isSprite) {
        data[randomx][randomy].isSprite = true;
        spritesPlanted++;
      }
    }

    let midrow = Math.floor(height / 2);
    let midcolumn = Math.floor(width / 2);
    data[midrow][midcolumn].isSprite = 'player';
    console.log('data is');
    console.log(data);
    return data;
  }

  createEmptyArray(height, width) {
    let data = [];
    for (let i = 0; i < height; i++) {
      data[i] = [];
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isSprite: false,
        };
      }
    }

    return data;
  }

  getRandomNumber(num) {
    return Math.floor(Math.random() * num);
  }

  initBoardData(height, width, sprites) {
    let data = this.createEmptyArray(height, width);
    data = this.plantSprites(data, height, width, sprites);
    return data;
  }
  onKeyDown = (event) => {
    if (
      event.keyCode === 37 ||
      event.keyCode === 38 ||
      event.keyCode === 39 ||
      event.keyCode === 40
    ) {
      if (this.state.flag) {
        this.playerMovement(event);
        this.setState((prevState, props) => ({
          moves: prevState.moves + 1,
        }));
      }
    }
  };

  playerMovement(event) {
    const { data, height, width } = this.state;
    let x, y;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isSprite === 'player') {
          x = i;
          y = j;
          data[i][j].isSprite = false;
          break;
        }
      }
    }

    console.log('values of i, j are');
    console.log(x + ' ' + y);

    if (x >= 0 && y >= 0) {
      if (event.keyCode === 37) {
        //left
        if (y > 0) data[x][y - 1].isSprite = 'player';
        else this.setState({ flag: false });
      } else if (event.keyCode === 38) {
        //up
        if (x > 0) data[x - 1][y].isSprite = 'player';
        else this.setState({ flag: false });
      } else if (event.keyCode === 39) {
        //right
        if (y < width - 1) data[x][y + 1].isSprite = 'player';
        else this.setState({ flag: false });
      } else {
        //down
        if (x < height - 1) data[x + 1][y].isSprite = 'player';
        else this.setState({ flag: false });
      }
    }
    this.setState({ data });
  }

  renderBoard(data) {
    let i = 0;

    return (
      <div style={{ paddingTop: '50px', paddingLeft: '30px' }}>
        <table
          id='myTable'
          className='table table-bordered'
          style={{ width: '50%' }}
        >
          <tbody>
            {data.map((datarow) => (
              <tr key={datarow[i++].x}>
                {datarow.map((dataitem) => (
                  <td key={dataitem.x * datarow.length + dataitem.y}>
                    <Cell value={dataitem} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className='board'>{this.renderBoard(this.state.data)}</div>
        <br></br>
        <div>MOVES: {this.state.moves}</div>
      </React.Fragment>
    );
  }
}

export default Board;
