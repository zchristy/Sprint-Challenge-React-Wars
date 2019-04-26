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

  audioCLick = (event) => {
    console.log(event.target);
    let audioButton = event.target;
    console.log(audioButton);
    if (audioButton.classList[1] === 'fa-volume-up'){
      audioButton.classList.remove('fa-volume-up');
      audioButton.classList.add('fa-volume-mute');
    } else if (audioButton.classList[1] === 'fa-volume-mute'){
      audioButton.classList.remove('fa-volume-mute');
      audioButton.classList.add('fa-volume-up');
    }
  }

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
        <h1 className="Header" >React Wars<i id='audioBtn' className="fas fa-volume-up" onClick={this.audioCLick}></i></h1>
        <Sound
            url="song.mp3"
            autoLoad={true}
            playStatus={Sound.status.PLAYING}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying}
            volume={50}
            />
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
