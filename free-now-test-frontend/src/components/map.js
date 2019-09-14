import React from 'react';
import ReactDOM from 'react-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapArea extends React.Component {

    render() {

    const mapStyles = {
        width: '100%',
        height: '100%',
      };

      
    return (
            <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          <Marker position={{ lat: 48.00, lng: -122.00}} />
        </Map>
  );
};
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCVm1D8yiD0ZbKNIt1ObzdkzZoutb1y1oE'
  })(MapArea);
  