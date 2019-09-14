import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Car} from './components/cars.js';
import MapArea from './components/map.js';


  
  class App extends React.Component {
    state = {
      isLoading: true,
      poiList: {},
      error: null,
      lat : 48.00,
      lon: -122.00
    };
   
    fetchPosts() {
      fetch(`http://localhost:5000/free-now/vehicles`)
        .then(response => response.json())
        .then(
          data =>
            this.setState({
              poiList: data,
              isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));
    }
  
    componentDidMount() {
      this.fetchPosts();
    }
  
    render() {
      const { isLoading, poiList, error } = this.state;
      return (
        <React.Fragment>
          <h1>React Fetch - Cars</h1>
          <hr />
          
          <MapArea latfromjson = {this.state.lat} lonfromjson = {this.state.lon}></MapArea>

          {!isLoading ? Object.keys(poiList).map(key => <Car key={key} body={poiList[key]} />) : <h3>Loading...</h3>}
        </React.Fragment>
      );
    }
  }


export default App;
