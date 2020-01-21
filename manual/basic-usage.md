# Basic usage

#### /components/layout/template.html

```html
<section class="layout"></section>
```

#### /components/layout/index.js

```js

'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'
import './index.scss'

export class Layout extends Component {
  get template () {
    return template
  }

  execute() {
    this.element.innerHTML = "Layout loaded"
  }
}

```

#### /app.js

```js

/* globals window, document */

'use strict'

import { Module, logger } from '@crispcode/modux'

import { Layout } from './components/layout'

let initialize = () => {
  // Configure logger
  logger.enabled( true )

  logger.info( 'Application start' )

  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', Layout )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )

```

#### /app.html

```html
<!DOCTYPE html>
<head>
    <title> App </title>

    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, user-scalable=no">
    
    <script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?flags=gated&features=default%2CMutationObserver%2CString.prototype.padStart%2Cconsole.info"></script>    

    <base href="/" />
        
    <link rel="stylesheet" href="app.min.css" />
</head>
<body>
    <script src="app.min.js"></script>
</body>
</html>
```