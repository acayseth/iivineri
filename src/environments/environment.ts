// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  countdown: {
    constant: 'Până vineri:',
    day: 'zile',
    format: '{dd} zile {hh} ore {mm} minute {ss} secunde'
  },
  giphy: {
    tags: {
      is: 'nsfw+ass+muligambia+chisinau+ahegao+moldova+md+ro+romania+camasutra+striptease+bdsm+anime+hentay+bubies+tits+twerk+sexy+flirting+friday+party+girls+cats+meme',
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
