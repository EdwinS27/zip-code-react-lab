import React, { Component } from 'react';
import './App.css';

function City(props) {
  return (
    <div>
      <ul>
        <li> City: {props.cityName} </li>
        <li> State: {props.State} </li>
        <li> Location: ({props.Lat}, {props.Long}) </li> 
        <li> Population: {props.EstimatedPopulation} </li> 
        <li> Total Wages: {props.TotalWages} </li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
  <div>
    <input onChange={(e) => props.handleChange(e)} />
  </div>);
}

class App extends Component {
  state = {
    city: '',
    zipCodes: [],
  }
  //
  zipChange = (event) =>  {
    console.log(event.target.value);

    this.setState({zipCode: event.target.value});

    // If the target is 5, then we searh for a valid zip
    if(event.target.value.length === 5) {

      fetch('https://ctp-zip-api.herokuapp.com/zip/' + event.target.value)
        .then((res) => res.json())
          .then((results)  => {
            this.setState({cities: results});
            console.log({results});
          })
          .catch(err =>{
            console.log("No Results");
            console.log(err);
            this.setState({
              cities: []
              });
          })
          // save the data to my state,
          // and in the render function display the <City /> components  
    } // end if
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
            <br />
            <ZipSearchField handleChange= {(e) => this.zipChange(e)}/>
            <br />
            Zip code is: {this.state.zipCode}
        <div>
          {
            this.state.zipCodes.map((city) => <City
            data={city} cityName={city.City}
            State={city.State}
            EstimatedPopulation={city.EstimatedPopulation}
            Long={city.Long}
            Lat={city.Lat}
            TotalWages={city.TotalWages}
            />)
          }
        </div>
      </div>
    );
  }
}

export default App;
