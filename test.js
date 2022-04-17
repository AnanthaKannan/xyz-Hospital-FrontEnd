const { Country, State, City }  = require ('country-state-city');
// console.log(Country.getAllCountries())
// console.log(State.getStatesOfCountry('IN'))
console.log(City.getCitiesOfState('IN', 'TN'))

// {
//   isoCode: 'GN',
//   name: 'Guinea',
//   phonecode: '224',
//   flag: '🇬🇳',
//   currency: 'GNF',
//   latitude: '11.00000000',
//   longitude: '-10.00000000',
//   timezones: [ [Object] ]
// },


// {
//   name: 'West Bengal',
//   isoCode: 'WB',
//   countryCode: 'IN',
//   latitude: '22.98675690',
//   longitude: '87.85497550'
// }

// {
//   name: 'Kalavai',
//   countryCode: 'IN',
//   stateCode: 'TN',
//   latitude: '12.77029000',
//   longitude: '79.41999000'
// },