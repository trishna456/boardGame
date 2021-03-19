import { Component } from 'react';
import greenSprite from '../greenSprite.jpg';

class Cell extends Component {
  render() {
    let dataitem = this.props.value;
    if (dataitem.isSprite === 'player') {
      return <i className='fa fa-user-o' aria-hidden='true'></i>;
    }
    if (dataitem.isSprite) {
      return <i className='fa fa-microchip' aria-hidden='true'></i>;
    } else {
      return <div>{'  '}</div>;
    }
  }
}

export default Cell;
