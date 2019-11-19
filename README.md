
<p align="center">
    <img src="https://user-images.githubusercontent.com/16132740/68576250-6f689b80-0476-11ea-9d09-c2fe7b00f149.png" width="188" alt="logo">
</p>

## Install
 - `npm install -g @angular/cli`
 - `git clone https://github.com/acayseth/iivineri`
 - `cd iivineri`
 - `npm install`
 
## Config
```bash
cat src/environments/environments.prod.ts
...
giphy: {
    apiKey: '<GIPHY_API_KEY>',
}
...
```
 
# Requirement

```bash
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/
    

Angular CLI: 8.3.18
Node: 12.13.0
OS: win32 x64
Angular: 8.2.13
... animations, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.803.18
@angular-devkit/build-angular     0.803.18
@angular-devkit/build-optimizer   0.803.18
@angular-devkit/build-webpack     0.803.18
@angular-devkit/core              8.3.18
@angular-devkit/schematics        8.3.18
@angular/cdk                      8.2.3
@angular/cli                      8.3.18
@angular/flex-layout              8.0.0-beta.27
@angular/material                 8.2.3
@ngtools/webpack                  8.3.18
@schematics/angular               8.3.18
@schematics/update                0.803.18
rxjs                              6.4.0
typescript                        3.5.3
webpack                           4.39.2
```


## Commands

 - Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`.
 - Run `npm run build:dev` to build the project. The build artifacts will be stored in the `dist/` directory.
 - Run `npm run build:prod` to build the project. The build artifacts will be stored in the `dist/` directory.
 - Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).
 - Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
