import React from 'react';
import ReactDOM from 'react-dom';



export const Car = ({ body }) => {
  return (
    <div>
      {body.map(poiList => {
        const { id, state, type, coordinate } = poiList;
        return (

          <div key={id}>
            <h2>{id}</h2>
            <p>Latitude: {coordinate.latitude}</p>
            <p>Longitude: {coordinate.longitude}</p>
            <p>{state}</p>
            <p>{type}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};