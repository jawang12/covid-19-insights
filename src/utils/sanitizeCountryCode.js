export const sanitizeCountryCode = (code) => {
  switch (code) {
    case 'Burma':
      return 'MM';
    case 'Vietnam':
      return 'VN';
    case 'Congo (Brazzaville)':
      return 'CG';
    case 'Congo (Kinshasa)':
      return 'CD';
    case `Cote d'Ivoire`:
      return 'CI';
    case 'Diamond Princess':
      return null;
    case 'Kosovo':
      return 'XK';
    case 'Laos':
      return 'LA';
    case 'MS Zaandam':
      return null;
    case 'West Bank and Gaza':
      return 'PS';
    default:
      return code;
  }
};
