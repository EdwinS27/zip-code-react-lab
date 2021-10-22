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

function Zip(props)  {
  return (
  <div>
    <ul>
      {props.zipCode}
    </ul>
  </div>
  );
}

function CitySearchField(props) {
  return  (
    <div>
      <input onChange={(cityInput) => props.handleChange(cityInput)} />
    </div>
  );
}

class App extends Component {
  state = {
    zipCodes: [],
    cities: [],
    zips: [],
    city: "",
    cityNameFound: false,
    completed: false
  }

  cityChange = (input)  =>  {
    this.setState({city: input.target.value.toUpperCase()});
    fetch('https://ctp-zip-api.herokuapp.com/city/' + input.target.value.toUpperCase())
      .then((res)  => res.json())
        .then((results) => {
          console.log(results);
          this.setState(
            {
              // Storing the results in the zipCodes property of App.state
              zipCodes: results,
              cityNameFound: true
            });
            this.update();
            console.log("The Update has run");
        })
        .catch(err =>{
          console.log(err)
          console.log("No Results");
          this.setState(
            {
              zipCodes: [],
              cities: [],
              cityNameFound: false,
            });
            this.clear();
        })
  };
  
  update = () =>  {
    this.state.zipCodes.forEach(zip =>
      fetch('https://ctp-zip-api.herokuapp.com/zip/' + zip)
      .then((res) => res.json())
        .then((results)  => {
          //console.log(results);
          this.state.cities.push(results);
        })
    )
    console.log("This is the cities array");
    console.log(this.state.cities);
    this.setState({
      completed: true,
    })
  };

  clear = () => {
    this.setState({
      cities: [],
      completed: false
    })
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
            <br />
            <div>
              <h3> Searching for:</h3>
              <CitySearchField handleChange= {(e) => this.cityChange(e)}/>
              <br />
            </div>
            <div>
                {
                this.state.cityNameFound === true ?
                <h3>
                  Zip codes for cities called: {this.state.city.toUpperCase()}
                </h3>
                  :
                " "
                }
              {
                this.state.zipCodes.map((zipCode) => 
                < Zip
                zipCode={zipCode}
                />
                )
              }
            </div>
            {/*
            Almost got the bonus working
            <div>
            {
              this.state.completed === true ? (
                this.state.zips.map(city => <City
                data={city} cityName={city.City}
                State={city.State}
                EstimatedPopulation={city.EstimatedPopulation}
                Long={city.Long}
                Lat={city.Lat}
                TotalWages={city.TotalWages}
                />)
              ) : "False"
            }
            </div> */}
      </div>
    );
  }
}

export default App;
