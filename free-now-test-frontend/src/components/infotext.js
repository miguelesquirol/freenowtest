import React from 'react';
import ReactDOM from 'react-dom';

function FreeNow(props) {
  return <div>
    <h1>FREE Now!</h1>
    <h3><b>Type:</b> {props.title}</h3>
    <h3><b>State:</b> {props.state}</h3>

  </div>;
}

function ShareNow(props) {
  return <div>
    <h1>SHARE Now.</h1>
    <p><b>Address:</b> {props.title}</p>
    <p><b>Engine:</b> {props.engineType}</p>
    <h3><b>Interior:</b> <img src={props.interior}/> </h3>
    <h3><b>Exterior:</b> <img src={props.exterior}/> </h3>  
    <h3>Fuel</h3>
    <div style={{width: "200px", height: "4px", borderRadius: "4px", background:"gray", position:"relative"}}>
      <div style={{position:"absolute", height: "4px", top:"0", "left":"0px", background:"#4dff04", width:props.fuel +"%"}}></div>

    </div>

  </div>;
}


function Now(props) {
  const isnow =  props.isnow;
  if ( isnow == "free" ) {
    return <FreeNow title={props.title}  state={props.state}/>;
  }
  else {
  return <ShareNow title={props.title} engineType={props.engineType}  interior={props.interior} exterior={props.exterior} fuel={props.fuel}/>;
}
}


export class InfoText extends React.Component {

  
  componentDidMount() {  

  }

    render() {


return (
    <div>
     <Now isnow={this.props.now} 
          title={this.props.title} 
          engineType={this.props.engineType}
          exterior={this.props.exterior}
          interior={this.props.interior}
          fuel={this.props.fuel}
          state={this.props.state}


          />
    </div>
  );
}
};