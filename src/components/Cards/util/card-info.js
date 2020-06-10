import { numberWithCommas } from '../../../utils/numberWithCommas';

export const cardInfo = ({
  confirmedGrowth,
  deathsGrowth,
  recoveredGrowth,
  iMonthTotal,
  iWeekTotal,
  rMonthTotal,
  rWeekTotal,
  dMonthTotal,
  dWeekTotal
}) => ({
  infected: [
    {
      styles: {
        variant: 'h5',
        style: {
          padding: '15px 0 15px 0',
          fontWeight: 'bold'
        }
      },
      value: confirmedGrowth,
      cu_config: {
        start: 0,
        end: confirmedGrowth || 0,
        delay: 0.3,
        separator: ',',
        duration: 4.7
      }
    },
    {
      value: 'Infected',
      styles: {
        fontSize: 12,
        style: {
          letterSpacing: '1.5px',
          fontSize: '14px',
          paddingBottom: '10px',
          textTransform: 'uppercase',
          color: 'blueviolet'
        }
      }
    },
    {
      value: 'Last 7',
      styles: {
        style: {
          textTransform: 'uppercase',
          fontSize: '12px',
          letterSpacing: '1.5px'
        }
      }
    },
    {
      styles: {
        style: {
          fontWeight: 'bold',
          paddingTop: '15px'
        }
      },
      value: numberWithCommas(iWeekTotal) || 0
    },
    {
      value: 'Last 30',
      styles: {
        style: {
          textTransform: 'uppercase',
          fontSize: '12px',
          letterSpacing: '1.5px'
        }
      }
    },
    {
      styles: {
        style: {
          fontWeight: 'bold',
          paddingTop: '15px'
        }
      },
      value: numberWithCommas(iMonthTotal) || 0
    }
  ],
  recovered: [
    {
      styles: {
        variant: 'h5',
        style: {
          padding: '15px 0 15px 0',
          fontWeight: 'bold'
        }
      },
      value: recoveredGrowth,
      cu_config: {
        start: 0,
        end: recoveredGrowth || 0,
        delay: 0.3,
        separator: ',',
        duration: 2.5
      }
    },
    {
      value: 'Recovered',
      styles: {
        fontSize: 12,
        style: {
          letterSpacing: '1.5px',
          fontSize: '14px',
          paddingBottom: '10px',
          color: 'darkgreen',
          textTransform: 'uppercase'
        }
      }
    },
    {
      value: 'Last 7',
      styles: {
        style: {
          textTransform: 'uppercase',
          fontSize: '12px',
          letterSpacing: '1.5px'
        }
      }
    },
    {
      styles: {
        style: {
          fontWeight: 'bold',
          paddingTop: '15px'
        }
      },
      value: numberWithCommas(rWeekTotal) || 0
    },
    {
      value: 'Last 30',
      styles: {
        style: {
          textTransform: 'uppercase',
          fontSize: '12px',
          letterSpacing: '1.5px'
        }
      }
    },
    {
      styles: {
        style: {
          fontWeight: 'bold',
          paddingTop: '15px'
        }
      },
      value: numberWithCommas(rMonthTotal) || 0
    }
  ],
  deceased: [
    {
      styles: {
        variant: 'h5',
        style: {
          padding: '15px 0 15px 0',
          fontWeight: 'bold'
        }
      },
      value: deathsGrowth,
      cu_config: {
        start: 0,
        end: deathsGrowth || 0,
        delay: 0.3,
        separator: ',',
        duration: 1.35
      }
    },
    {
      value: 'Deceased',
      styles: {
        color: 'textSecondary',
        fontSize: 12,
        style: {
          letterSpacing: '1.5px',
          fontSize: '14px',
          paddingBottom: '10px',
          textTransform: 'uppercase',
          color: 'crimson'
        }
      }
    },
    {
      value: 'Last 7',
      styles: {
        style: {
          textTransform: 'uppercase',
          fontSize: '12px',
          letterSpacing: '1.5px'
        }
      }
    },
    {
      styles: {
        style: {
          fontWeight: 'bold',
          paddingTop: '15px'
        }
      },
      value: numberWithCommas(dWeekTotal) || 0
    },
    {
      value: 'Last 30',
      styles: {
        style: {
          textTransform: 'uppercase',
          fontSize: '12px',
          letterSpacing: '1.5px'
        }
      }
    },
    {
      styles: {
        style: {
          fontWeight: 'bold',
          paddingTop: '15px'
        }
      },
      value: numberWithCommas(dMonthTotal) || 0
    }
  ]
});

/*

    recovered: [
      {
        styles: {
          color: 'textSecondary',
          variant: 'h6',
          gutterBottom: true,
          style: {
            letterSpacing: '1.5px'
          }
        },
        value: 'Recovered'
      },
      {
        styles: {
          variant: 'h5'
        },
        value: recoveredGrowth,
        cu_config: {
          start: 0,
          end: recoveredGrowth,
          delay: 0.3,
          separator: ',',
          duration: 2.5
        }
      },
      {
        styles: {
          color: 'textSecondary'
        },
        value: updatedDate
      },
      {
        styles: {
          variant: 'body2'
        },
        value: 'Total amount of recoveries from COVID-19'
      }
    ],
    */
