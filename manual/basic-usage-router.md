# Basic usage router

#### /components/layout/template.html

```html
<section class="layout">
  <span class="url"></span>
  <a href="/link1" data-modux-link="">LINK 1</a>
  <a href="/link2" data-modux-link="">LINK 2</a>
  <a href="/link3" data-modux-link="">LINK 3</a>
</section>
```

#### /components/layout/index.js

```js

'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'

export class Layout extends Component {
  get template () {
    return template
  }

  onStateChange ( url ) {
    this.element.querySelector('.url').innerHTML = url
  }
}

```

#### /app.js

```js

/* globals window, document */

'use strict'

import { Module } from '@crispcode/modux'

import { Layout } from './components/layout'

let initialize = () => {

  Router.setDynamicBase( true )

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