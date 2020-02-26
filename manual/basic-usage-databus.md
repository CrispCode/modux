# Basic usage databus

#### /components/component1/template.html

```html
<section class="component1"></section>
```

#### /components/component1/index.js

```js

'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'

export class Component1 extends Component {
  get template () {
    return template
  }

  execute() {
    this.databus.on( 'component1', ( value ) => {
      this.databus.emit( 'component2', value )
    }, true )
  }
}

```
#### /components/component2/template.html

```html
<section class="component2"></section>
```

#### /components/component2/index.js

```js

'use strict'

import { Component } from '@crispcode/modux'

import template from './template.html'

export class Component2 extends Component {
  get template () {
    return template
  }

  execute() {
    this.databus.on( 'component2', ( value ) => {
      this.element.innerHTML = value
    }, true )
  }
}

```

#### /components/layout/template.html

```html
<section class="layout">
  <article data-modux-component="component1"></article>
  <article data-modux-component="component2"></article>
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

  execute() {
    this.databus.emit( 'component1', 'Hello' )
  }
}

```

#### /app.js

```js

/* globals window, document */

'use strict'

import { Module } from '@crispcode/modux'

import { Layout } from './components/layout'
import { Component1 } from './components/component1'
import { Component2 } from './components/component2'

let initialize = () => {

  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', Layout )
    .addDependency( 'component1', Component1 )
    .addDependency( 'component2', Component2 )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )

```