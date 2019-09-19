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
         

        {!isLoading ? <MapArea poiList={poiList}/> : <h3>Loading...</h3>}
        </React.Fragment>
      );
    }
  }

