import React, { Component } from 'react';
import Sound from 'react-sound';
import './App.css';

import Pagination from './components/Pagination';

class App extends Component {
  constructor() {
    super();
    this.state = {
      starwarsChars: [],
      currentPage: 1,
      perPage: 10,
      nextPage: "",
      previousPage: ""
    };
  }

  componentDidMount() {
    this.getCharacters('https://swapi.co/api/people/');
  }

  getCharacters = URL => {
    // feel free to research what this code is doing.
    // At a high level we are calling an API to fetch some starwars data from the open web.
    // We then take that data and resolve it our state.
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(data => {
          this.setState({
            starwarsChars: data.results,
            nextPage: data.next,
            previousPage: data.previous
          });
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  nextClick = event => {
    // if currentPage is at the end
    if(this.state.currentPage === 9) {
      this.getCharacters('https://swapi.co/api/people/');
      this.setState({
        currentPage: 1
      });
    } else {
      this.getCharacters(this.state.nextPage);
      // increment currentPage
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  };

  prevClick = event => {
    // if current page is at the beginning
    if(this.state.currentPage === 1) {
      this.getCharacters('https://swapi.co/api/people/');
      this.setState({
        currentPage: 1
      });
    } else {
      this.getCharacters(this.state.previousPage);
      // decrement currentPage
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  };

  click = event => {
    // if next button is clicked
    if(event.target.getAttribute('name') === 'nextbutton') {
      this.nextClick();
      // if prev button is clicked
    } else if(event.target.getAttribute('name') === 'prevbutton') {
      this.prevClick();
    }
  }

  render() {
    return (
      <div className="App">
      <Sound
            url="https://ia801203.us.archive.org/13/items/13BinarySunsetAlternate/01%20Main%20Title%20and%20the%20Attack%20on%20the%20Jakku%20Village.mp3"
            playStatus={Sound.status.PLAYING}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onResume={this.handleSongPlaying}
            onBufferChange={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            autoLoad={true}
            volume={50}
            />
        <h1 className="Header">React Wars</h1>
        <Pagination
            onClick={this.click}
            state={this.state}
            next={this.next}
            previous={this.previous}
            />
      </div>
    );
  }
}

export default App;
