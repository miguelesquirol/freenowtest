import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Car} from './components/cars.js';
import {Fetch} from './components/fetch.js';

  class App extends React.Component {
  
    render() {
      return (
        <React.Fragment>
          

          <Fetch/>
          
        </React.Fragment>
      );
    }
  }


export default App;
