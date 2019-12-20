# modux
A framework used in front end application creation

## Installation

```
npm install CrispCode/modux#v2.2.6 --save-dev
```

## How to use

Add to your package.json scripts:
```
  "scripts": {
    "test": "NODE_ENV=development ./node_modules/.bin/webpack-dev-server --open --config ./node_modules/modux/webpack.config.js",
    "build": "NODE_ENV=production ./node_modules/.bin/webpack --config ./node_modules/modux/webpack.config.js"
  }
```

To run use: `npm test` or `npm run build`

## Documentation & Testing

Clone the modux repository to your machine and use the following commands:

To generate a documentation use `npm run docs`
If you want to check functionality you can use `npm run test` 

## Polyfill

In order to support older versions of browsers, you can use polyfills:

```
    <script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default%2CMutationObserver%2CString.prototype.padStart%2Cconsole.info%2CNumber.isInteger%2CMath.sign"></script>
```

## Modux classes

  |Name|Usage|Description|
  |:---:|---|---|
  | config | `import { config } from 'modux'` | A class containing the configuration |
  | store | `import { store } from 'modux'` | A class used to communicate between components |
  | Router | `import { Router } from 'modux'` | A static class used to manipulate states and urls |
  | Communication | `import { Communication } from 'modux'` | The Communication class, used to handler http requests |
  | Component | `import { Component } from 'modux'` | The Component class. Components are the backbone of the application |
  | Module | `import { Module } from 'modux'` | The Module class. Modules are the main part of modux |

## Utils classes

  |Name|Usage|Description|
  |:---:|---|---|
  | approx | `import { approx } from 'modux'` | Used to approximate a number to a certain number of decimals |
  | Cookie | `import { Cookie } from 'modux'` | A static class used to manipulate cookies |
  | DateTime | `import { DateTime } from 'modux'` | A Date class wrapper |
  | Device | `import { Device } from 'modux'` | A static class used to get device information |
  | extend | `import { extend } from 'modux'` | Extends an object with another object |
  | font | `import { font } from 'modux'` | A font loader |
  | getter | `import { getter } from 'modux'` | Used to return a deep value from an Object. Use the "." separator to check subobjects |
  | html | `import { html } from 'modux'` | Convert string to html |
  | isNumber | `import { isNumber } from 'modux'` | Checks if the value is a number |
  | isObject | `import { isObject } from 'modux'` | Checks if the object is an Object |
  | loader | `import { loader } from 'modux'` | The Loader class is used to preload files |
  | Logger | `import { Logger } from 'modux'` | A class to mimic window.console |
  | loop | `import { loop } from 'modux'` | Loop through a collection Object or Array |
  | radians | `import { radians } from 'modux'` | Convert an angle from degrees to radians |
  | rnd | `import { rnd } from 'modux'` | Generate a random number between two values |
  | scroll | `import { scroll } from 'modux'` | A library used for scrolling window or an element |
  | setter | `import { setter } from 'modux'` | Used to set a deep value from an Object |
  | Sounds | `import { sonds } from 'modux'` | A class used to manipulate Sounds |
  | uid | `import { uid } from 'modux'` | Generates a random unique identifier |

## Change Log

  We're using the GitHub [releases](https://github.com/CrispCode/modux/releases) for changelog entries.