# modux
A framework used in front end application creation

## Installation

```
npm install @crispcode/modux --save-dev
```

## How to use

Add to your package.json scripts:
```
  "scripts": {
    "test": "modux dev",
    "build": "modux prod"
  }
```

To run use: `npm test` or `npm run build`

## Documentation & Testing

Clone the modux repository to your machine and use the following commands:

To generate a documentation use `npm run docs`
If you want to check functionality you can use `npm run test` 

## Getting started

You can check the manual files for a quick introduction into modux. You can get started [here](https://github.com/CrispCode/modux/blob/master/manual/getting-started.md).

## Polyfill

In order to support older versions of browsers, you can use [polyfill.io](https://polyfill.io/)

## Modux classes

  |Name|Usage|Description|
  |:---:|---|---|
  | Router | `import { Router } from '@crispcode/modux'` | A static class used to manipulate states and urls |
  | Communication | `import { Communication } from '@crispcode/modux'` | The Communication class, used to handler http requests |
  | Component | `import { Component } from '@crispcode/modux'` | The Component class. Components are the backbone of the application |
  | Module | `import { Module } from '@crispcode/modux'` | The Module class. Modules are the main part of modux |

## Utils classes

  |Name|Usage|Description|
  |:---:|---|---|
  | approx | `import { approx } from '@crispcode/modux'` | Used to approximate a number to a certain number of decimals |
  | Cookie | `import { Cookie } from '@crispcode/modux'` | A static class used to manipulate cookies |
  | DateTime | `import { DateTime } from '@crispcode/modux'` | A Date class wrapper |
  | Device | `import { Device } from '@crispcode/modux'` | A static class used to get device information |
  | extend | `import { extend } from '@crispcode/modux'` | Extends an object with another object |
  | font | `import { font } from '@crispcode/modux'` | A font loader |
  | html | `import { html } from '@crispcode/modux'` | Convert string to html |
  | isNumber | `import { isNumber } from '@crispcode/modux'` | Checks if the value is a number |
  | isObject | `import { isObject } from '@crispcode/modux'` | Checks if the object is an Object |
  | loader | `import { loader } from '@crispcode/modux'` | The Loader class is used to preload files |
  | Logger | `import { Logger } from '@crispcode/modux'` | A class to mimic window.console |
  | loop | `import { loop } from '@crispcode/modux'` | Loop through a collection Object or Array |
  | radians | `import { radians } from '@crispcode/modux'` | Convert an angle from degrees to radians |
  | rnd | `import { rnd } from '@crispcode/modux'` | Generate a random number between two values |
  | scroll | `import { scroll } from '@crispcode/modux'` | A library used for scrolling window or an element |
  | Sounds | `import { sonds } from '@crispcode/modux'` | A class used to manipulate Sounds |
  | uid | `import { uid } from '@crispcode/modux'` | Generates a random unique identifier |

## Configuration

  You can create a file called ```modux.config.js``` in the root of your folder, which needs to contain a function with one parameter and returns an object. The parameter of the function will be filled with the current webpack configuration. This gives the user a chance to modify the default webpack configuration based on their needs.

## Change Log

  We're using the GitHub [releases](https://github.com/CrispCode/modux/releases) for changelog entries.