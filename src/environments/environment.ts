// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  analytics: {
    code: null
  },
  countdown: {
    constant: 'Până vineri:',
    day: 'zile',
    format: '{dd} zile {hh} ore {mm} minute {ss} secunde'
  },
  giphy: {
    url: 'https://api.giphy.com/v1/gifs',
    apiKey: 'Z3p94SeDbOUPrywoq3NdL2CT4V6fEE16',
    tags: {
      is: 'bubies+sexy+flirting+isfriday+girlskiss+cats',
      not: 'boring+wait+loading+horror+work'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
