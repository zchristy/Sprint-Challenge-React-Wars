import React, { Component } from 'react';
import './Pagnation.css';

class Pagnation extends Component {

  render() {
    const {starwarsChars, nextPage, previousPage} = this.props.state;

    const renderChars = starwarsChars.map((char) => {
      return <ul className='card' key={char.name}>
                <li>{char.name}</li>
                <li>Birth Year: {char.birth_year}</li>
            </ul>

    });


    return (

      <div className='container'>
        <div className="character-container">
          {renderChars}
        </div>
        <div className="button-container">
          <p className="btn" name='prevbutton' onClick={this.props.onClick}>PREV</p>
          <p className="btn" name='nextbutton' onClick={this.props.onClick}>Next</p>
        </div>
      </div>
    );
  }
}

export default Pagnation;
