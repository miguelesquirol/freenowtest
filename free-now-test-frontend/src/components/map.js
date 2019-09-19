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
      // or you can set markers list somewhere else
      // please also set your correct lat & lng
      // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
  
      const jsonvar = this.props.poiList.poiList
      
      const values = Object.values(jsonvar)
      
      var objmarker = {}
      var arr = [];

      for (var key in values) {
        var latitude = values[key].coordinate["latitude"]
        var longitude = values[key].coordinate["longitude"]
        
        objmarker['lat'] = latitude;
        objmarker['lng'] = longitude;
        arr.push(objmarker);
        
       

      }

      var key = {"markers" : [arr]}

      console.log(key)

      this.setState(key);


      
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




      // const poiList = Object.keys(this.props.json)
      // console.log(typeof poiList)
      // console.log(Object.keys(poiList).lenght);

      // //  console.log(Object.keys(jsonvar).length)

    //   const values = Object.values(this.props.json  )
    //   console.log(values)

    //   for (var key in values) {
    //         console.log(values[key].coordinate["latitude"]);
    //   }

        

      return (
        
        <Map google={this.props.google}
            onClick={this.onMapClicked}
            initialCenter = {{lat: 53.5532316, lng:10.0087783}}>

     
          {this.state.markers.map((marker, i) =>{

              return(
                <Marker key={i} onClick={this.onMarkerClick}
                  name = {marker.name}
                  position={{lat: marker.lat, lng:marker.lng}} 
                />

            

              )
            })}

  
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
  