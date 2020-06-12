import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => (
  <div className={classes.container}>
    <div className={classes.cubeGrid}>
      <div className={[classes.cube, classes.cube1].join(' ')}></div>
      <div className={[classes.cube, classes.cube2].join(' ')}></div>
      <div className={[classes.cube, classes.cube3].join(' ')}></div>
      <div className={[classes.cube, classes.cube4].join(' ')}></div>
      <div className={[classes.cube, classes.cube5].join(' ')}></div>
      <div className={[classes.cube, classes.cube6].join(' ')}></div>
      <div className={[classes.cube, classes.cube7].join(' ')}></div>
      <div className={[classes.cube, classes.cube8].join(' ')}></div>
      <div className={[classes.cube, classes.cube9].join(' ')}></div>
    </div>
  </div>
);

export default Spinner;
