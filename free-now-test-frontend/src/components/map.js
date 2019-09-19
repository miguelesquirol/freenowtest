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
        json: this.props.json
    }
  }
  
 

    componentDidMount(){  
      const values = Object.values(this.props.poiList.poiList)
      let arr = [];

      for (let key in values) {

        let data = {'lat' : values[key].coordinate["latitude"], 
                           'lng' :  values[key].coordinate["longitude"],
                           'state' : values[key].state,
                           'type' : values[key].type};
        arr.push(data);
      }

      this.setState({"markers" : arr});

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
      console.log(this.props.placemarks)

      return (
        
        <Map google={this.props.google}
            onClick={this.onMapClicked}
            initialCenter = {{lat: 53.5532316, lng:10.0087783}}>

     
          {this.state.markers.map((marker, i) =>{

              return(
                <Marker key={i} onClick={this.onMarkerClick}
                  type = {marker.type}
                  state = {marker.state}
                  position={{lat: marker.lat, lng:marker.lng}} 
                  icon={{
                    url: "../taxi.png",
                    }}
                />
              )
            })}

  
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.type}</h1>
                <h2>{this.state.selectedPlace.state}</h2>

              </div>
          </InfoWindow>
        </Map>
      )
    }
  }


export default GoogleApiWrapper({apiKey: 'AIzaSyCVm1D8yiD0ZbKNIt1ObzdkzZoutb1y1oE'})(MapArea);