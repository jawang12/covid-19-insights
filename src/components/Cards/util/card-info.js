export const cardInfo = ({
  quantity,
  lastUpdate,
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
          gutterBottom: true
        }
      },
      {
        styles: {
          variant: 'h5'
        },
        value: confirmed ? confirmed.value : '',
        cu_config: {
          start: 0,
          end: confirmed ? confirmed.value : '',
          delay: 0.3,
          separator: ',',
          duration: 4.7
        }
      },
      {
        value: lastUpdate,
        styles: {
          color: 'textSecondary'
        }
      },
      {
        styles: {
          variant: 'body2'
        },
        value: 'COVID-19 Active Cases'
      }
    ],
    recovered: [
      {
        styles: {
          color: 'textSecondary',
          gutterBottom: true
        },
        value: 'Recovered'
      },
      {
        styles: {
          variant: 'h5'
        },
        value: recovered ? recovered.value : '',
        cu_config: {
          start: 0,
          end: recovered ? recovered.value : '',
          delay: 0.3,
          separator: ',',
          duration: 2.5
        }
      },
      {
        styles: {
          color: 'textSecondary'
        },
        value: lastUpdate
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
          gutterBottom: true
        },
        value: 'Deceased'
      },
      {
        styles: {
          variant: 'h5'
        },
        value: deaths ? deaths.value : '',
        cu_config: {
          start: 0,
          end: deaths ? deaths.value : '',
          delay: 0.3,
          separator: ',',
          duration: 1.35
        }
      },
      {
        styles: {
          color: 'textSecondary'
        },
        value: lastUpdate
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
