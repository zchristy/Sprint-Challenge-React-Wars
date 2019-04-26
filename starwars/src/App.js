import React, { Component } from 'react';
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
    if(this.state.currentPage === 9) {
      this.getCharacters('https://swapi.co/api/people/');
      this.setState({
        currentPage: 1
      });
    } else {
      this.getCharacters(this.state.nextPage);
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  };

  prevClick = event => {
    if(this.state.currentPage === 1) {
      this.getCharacters('https://swapi.co/api/people/');
      this.setState({
        currentPage: 1
      });
    } else {
      this.getCharacters(this.state.previousPage);
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }
  };

  click = event => {
    if(event.target.getAttribute('name') === 'nextbutton') {
      this.nextClick();
    } else if(event.target.getAttribute('name') === 'prevbutton') {
      this.prevClick();
    }
  }

  render() {
    console.log(this.state.currentPage);
    return (
      <div className="App">
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
