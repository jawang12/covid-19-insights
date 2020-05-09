export const cardInfo = (amount) => ({
  amount,
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
        value: 'Data'
      },
      {
        value: 'Date',
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
        value: 'Infected'
      },
      {
        styles: {
          variant: 'h5'
        },
        value: 'Data'
      },
      {
        styles: {
          color: 'textSecondary'
        },
        value: 'Date'
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
        value: 'Infected'
      },
      {
        styles: {
          variant: 'h5'
        },
        value: 'Data'
      },
      {
        styles: {
          color: 'textSecondary'
        },
        value: 'Date'
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
