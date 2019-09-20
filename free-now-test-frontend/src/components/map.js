import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import {InfoText} from './infotext.js'

export class MapArea extends React.Component {

  
  constructor(props){
    super(props);
    this.state = {
        markers: [],
        markers2: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        json: this.props.json,
        isHiddenShare: false,
        isHiddenFree: false,



    }
  }
 
  toggleHiddenShare () {
    this.setState({
      isHiddenShare: !this.state.isHiddenShare
        })
  }

  toggleHiddenFree () {
    this.setState({
      isHiddenFree: !this.state.isHiddenFree
    })
  }

  parser(data) {

    const values = Object.values(data)
    let arr = [];
    for (let key in values) {
       var icon;

        if (values[key].state == "ACTIVE") {
          icon= "../taxi1.png"
          }
        else {
        icon="../inactive.png"
          }
        
        let data = {'lat' : values[key].coordinate["latitude"], 
                           'lng' :  values[key].coordinate["longitude"],
                           'state' : values[key].state,
                           'type' : values[key].type,
                           'icon' : icon,
                           'now' : 'free'};
        arr.push(data);

      }

      this.setState({"markers" : arr});
    }
  

  parser2(data) {
    const values = Object.values(data)
    let arr = [];

    
    for (let key in values) {

      var interior, exterior;

      if (values[key].exterior == "GOOD") {
        exterior= "../happy.png"
        }
      else {
        exterior="../sad.png"
        }

        if (values[key].interior == "GOOD") {
          interior= "../happy.png"
          }
        else {
          interior="../sad.png"
          }

   
        let data = {'lng' : values[key].coordinates[0], 
                    'lat' :  values[key].coordinates[1],
                    "address":values[key].address,
                    "engineType":values[key].engineType,
                    "fuel":values[key].fuel,
                    'interior' : interior,
                    'exterior' : exterior,
                    'now' : "share"};

        arr.push(data);

      }

      this.setState({"markers2" : arr});

  }

    componentDidMount(){  
      this.parser(this.props.poiList.poiList);
      

      this.parser2(this.props.placemarks.placemarks);
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
      const style = {
        width: '100%',
        height: 'calc(100vh - 127px)'
      }


      return (
      <div>
        <div className="buttonwrapper">
        <button onClick={this.toggleHiddenFree.bind(this)}  style={{backgroundColor:this.state.bgColorfree}}>
          Free Now
        </button>

        <button onClick={this.toggleHiddenShare.bind(this)}  style={{backgroundColor:this.state.bgColorshow}}>
          Show Now
        </button>
       
      </div>

      
        
        <Map google={this.props.google}
            onClick={this.onMapClicked}
            style={style}
            initialCenter = {{lat: 53.5532316, lng:10.0087783}}>

     
          {this.state.markers.map((marker, i) =>{
              if (this.state.isHiddenFree) {

              return(
                <Marker key={i} onClick={this.onMarkerClick}
                  title = {marker.type}
                  carstate = {marker.state}
                  position={{lat: marker.lat, lng:marker.lng}}
                  icon = {marker.icon}     
                  now = {marker.now}            
                />
              )}
            })}

             {this.state.markers2.map((marker, i) =>{
              if (this.state.isHiddenShare) {

              return(
                <Marker key={i} onClick={this.onMarkerClick}
                 position={{lat: marker.lat, lng:marker.lng}}
                 icon="../taxi3.png"
                 title={marker.address}
                 engineType={marker.engineType}
                 fuel={marker.fuel}
                 interior={marker.interior}
                 exterior={marker.exterior}
                 now = {marker.now}            

                />
              )
              }
            }
             )}

  
          <InfoWindow

            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>

            <InfoText now={this.state.selectedPlace.now} 
                      state={this.state.selectedPlace.carstate}
                      title={this.state.selectedPlace.title}
                      engineType={this.state.selectedPlace.engineType} 
                      interior={this.state.selectedPlace.interior}
                      exterior={this.state.selectedPlace.exterior}
                      fuel={this.state.selectedPlace.fuel}

                      />
          </div>
             
          </InfoWindow>
        </Map></div>
      )
    }
  }


export default GoogleApiWrapper({apiKey: 'AIzaSyCVm1D8yiD0ZbKNIt1ObzdkzZoutb1y1oE'})(MapArea);