import React, { Component } from 'react';
import './StarWars.css';

class StarWars extends Component {

  render() {
    const char = this.props.characters.map(char => {
      return <ul className='card' key={char.name}>
                <li >{char.name}</li>
            </ul>
    });
    return (
      <div className="character-container">
        {char}
      </div>
    );
  }
}

export default StarWars;

// <StarWars characters={this.state.starwarsChars}/>
// import StarWars from './components/StarWars';
