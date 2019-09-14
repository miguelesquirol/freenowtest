import React from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapArea extends React.Component {
   

  constructor(props) {
    super(props);

    this.state = {
      stores: [{latitude: 47.49855629475769, longitude: -122.14184416996333},
              {latitude: 47.359423, longitude: -122.021071},
              {latitude: 47.2052192687988, longitude: -121.988426208496},
              {latitude: 47.6307081, longitude: -122.1434325},
              {latitude: 47.3084488, longitude: -122.2140121},
              {latitude: 47.5524695, longitude: -122.0425407}]
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

    render() {

    const mapStyles = {
        width: '100%',
        height: '100%',
      };

      
    return (<div> 
         The data from parent is {this.props.latfromjson} {this.props.lonfromjson}
    
            <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
        {this.displayMarkers()}
        </Map></div>
  );
};
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCVm1D8yiD0ZbKNIt1ObzdkzZoutb1y1oE'
  })(MapArea);
  