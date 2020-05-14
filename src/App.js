import React, { Component } from 'react';

import { Cards, CountryPicker, Chart } from './components';
import classes from './App.module.css';
import { fetchData } from './api';

export default class App extends Component {
  state = {
    data: {},
    country: ''
  };

  async componentDidMount() {
    const data = await fetchData();
    console.log(data);
    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ country, data });
  };

  render() {
    return (
      <div className={classes.Container}>
        <Cards quantity={3} data={this.state.data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart />
      </div>
    );
  }
}
