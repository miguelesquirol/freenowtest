import React from 'react';
import {Car} from './cars.js';
import MapArea from './map.js';

  export class Fetch extends React.Component {
    state = {
      isLoading: true,
      poiList: {},
      error: null,
      lat : 48.00,
      lon: -122.00
    };
   
    fetchPosts1() {
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

    fetchPosts2() {
      fetch(`http://localhost:5000/share-now/vehicles`)
        .then(response => response.json())
        .then(
          data =>
            this.setState({
              placemarks: data,
              isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));
    }
  
    componentDidMount() {
      this.fetchPosts1();
      this.fetchPosts2();

    }
  
    render() {
      const { isLoading, poiList, placemarks, error } = this.state;
      
      
      return (
        <React.Fragment>
         

        {!isLoading ? <MapArea poiList={poiList} placemarks={placemarks} /> : <h3>Loading...</h3>}
        </React.Fragment>
      );
    }
  }

