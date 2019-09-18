import React from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

export class MapArea extends React.Component {
 
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  
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
      return (
        <Map google={this.props.google}
            onClick={this.onMapClicked}>

      <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={{lat: 37.778519, lng: -122.405640}} />
      <Marker
        name={'Dolores park'}
        position={{lat: 37.759703, lng: -122.428093}} />
      <Marker />

  
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
  