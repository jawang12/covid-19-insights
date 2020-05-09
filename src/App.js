import React, { Component } from 'react';

import { Cards, CountryPicker, Chart } from './components';
import classes from './App.module.css';
import { fetchData } from './api';
import { cardInfo } from './components/Cards/util/card-info';

export default class App extends Component {
  state = {
    data: {}
  };

  async componentDidMount() {
    const data = await fetchData();
    console.log(data);
    this.setState({ data });
  }

  render() {
    const cardContent = cardInfo(3);
    return (
      <div className={classes.Container}>
        <Cards info={cardContent} />
        <CountryPicker />
        <Chart />
      </div>
    );
  }
}
