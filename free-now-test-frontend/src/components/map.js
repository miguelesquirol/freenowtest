import React from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {Fetch} from './fetch.js';

export class MapArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        markers: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markers: JSON.stringify(this.props.json)
    }
  }
  
 

    componentDidMount(){
      // or you can set markers list somewhere else
      // please also set your correct lat & lng
      // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
     
    }
  
    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        })
      }
    };
  
    render() {
      console.log(this.markers)
      return (
        <Map google={this.props.google}
            onClick={this.onMapClicked}>

     
          {this.state.markers.map((marker, i) =>{

              return(
                <Marker key={i} onClick={this.onMarkerClick}
                  name = {marker.name}
                  position={{lat: marker.lat, lng:marker.lng}} 
                />

              )
            })}

  
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
  
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      )
    }
  }


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCVm1D8yiD0ZbKNIt1ObzdkzZoutb1y1oE'
  })(MapArea);
  