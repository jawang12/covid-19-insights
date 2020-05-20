import React, { Component } from 'react';

import { Cards, CountryPicker, Chart } from './components';
import classes from './App.module.css';
import { fetchData } from './api';
import { withWidth, Grid } from '@material-ui/core';
import Footer from './components/Footer/Footer';

class App extends Component {
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
    const tabletOrSmaller = ['xs', 'sm', 'tablet'].includes(this.props.width);
    return (
      <Grid>
        <div
          className={classes.Container}
          style={{ margin: tabletOrSmaller ? '0 5%' : 0 }}
        >
          <Cards quantity={3} data={this.state.data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart country={this.state.country} data={this.state.data} />
        </div>
        <footer>
          <Footer />
        </footer>
      </Grid>
    );
  }
}

export default withWidth()(App);
