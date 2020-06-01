export const cardInfo = ({
  quantity,
  updatedDate,
  confirmed,
  deaths,
  recovered
}) => ({
  amount: quantity,
  typography: {
    infected: [
      {
        value: 'Infected',
        styles: {
          color: 'textSecondary',
          variant: 'h6',
          gutterBottom: true,
          style: {
            letterSpacing: '1.5px'
          }
        }
      },
      {
        styles: {
          variant: 'h5'
        },
        value: confirmed,
        cu_config: {
          start: 0,
          end: confirmed,
          delay: 0.3,
          separator: ',',
          duration: 4.7
        }
      },
      {
        value: updatedDate,
        styles: {
          color: 'textSecondary'
        }
      },
      {
        styles: {
          variant: 'body2'
        },
        value: 'Total number of active cases of COVID-19'
      }
    ],
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
        value: recovered,
        cu_config: {
          start: 0,
          end: recovered,
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
    deceased: [
      {
        styles: {
          color: 'textSecondary',
          variant: 'h6',
          gutterBottom: true,
          style: {
            letterSpacing: '1.5px'
          }
        },
        value: 'Deceased'
      },
      {
        styles: {
          variant: 'h5'
        },
        value: deaths,
        cu_config: {
          start: 0,
          end: deaths,
          delay: 0.3,
          separator: ',',
          duration: 1.35
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
        value: 'Total amount of deaths due to COVID-19'
      }
    ]
  }
});
